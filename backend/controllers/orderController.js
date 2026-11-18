const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Coupon = require("../models/Coupon");
const User = require("../models/User");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
    key_id:
    process.env.RAZORPAY_KEY_ID,
    key_secret:
    process.env.RAZORPAY_KEY_SECRET,
});


// exports.placeOrder = async (req, res) => {
//     try {
//         console.log(req.user);
//         console.log(req.body);

//         const {addressId,
//             paymentMethod, discount = 0
//         } = req.body;
//         const userId = req.user.id || req.user._id;

//         // User
//         const user = await User.findById(userId);

//         // Cart
//         const cart = await Cart.findOne({
//             user: userId
//         }).populate("items.product");

//         if(!cart || cart.items.length === 0) {
//             return res.status(400).json({
//                 message: "Cart is empty",
//             });
//         }

//         // Address
//         const address = user.addresses.id(addressId);

//         if(!address) {
//             return res.status(404).json({
//                 message: "Address not found",
//             });
//         }

//         // Calculate Total
//         let totalAmount = 0;

//         const orderItems = cart.items.map((item) => {
//             totalAmount += item.product.price * item.quantity;

//             return {
//                 product: item.product._id,
//                 quantity: item.quantity,
//                 price: item.product.price,
//             };
//         });

//         const finalAmount = totalAmount - discount;

//         // Update Product Stock
//         for (const item of cart.items) {
//             const product = await Product.findById(item.product._id);

//             if(product.stock < item.quantity) {
//                 return res.status(400).json({
//                     message: `${product.name} is out of stock`,
//                 });
//             }

//             product.stock -= item.quantity;

//             await product.save();
//         }

//         const order = await Order.create({
//             user: userId,

//             items: orderItems,

//             address: {
//                 fullName: address.fullName,
//                 phone: address.phone,
//                 house: address.house,
//                 city: address.city,
//                 state: address.state,
//                 pincode: address.pincode,
//             },

//             totalAmount,
//             discount,
//             finalAmount,

//             paymentMethod,
//             paymentStatus:
//             paymentMethod === "COD" ? "Pending" : "Paid",
//         });

//         cart.items = [];
//         await cart.save();

//         res.status(201).json({
//             message: "Order placed successfully",
//             order,
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//         });
//     }
// };

exports.placeOrder = async (req, res) => {
    try {
        console.log(req.user);
        console.log(req.body);

        // const {
        //     addressId,
        //     paymentMethod,
        //     discount = 0
        // } = req.body;

        // const {
        //     addressId,
        //     paymentMethod,
        //     couponCode
        // } = req.body;

        const {
            addressId,
            paymentMethod,
            couponCode,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature
        } = req.body;

        const userId = req.user.id || req.user._id;

        // User

        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Cart

        const cart = await Cart.findOne({
            user: userId
        }).populate("items.product");

        if(!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty",
            });
        }

        // Address

        const address = user.addresses.id(addressId);

        if(!address) {
            return res.status(404).json({
                message: "Address not found",
            });
        }

        // // Calculate Total

        // let totalAmount = 0;

        // const orderItems = cart.items.map((item) => {
        //     totalAmount += item.product.price * item.quantity;

        //     return {
        //         product: item.product._id,
        //         quantity: item.quantity,
        //         price: item.product.price,
        //     };
        // });

        // const finalAmount = Math.max(
        //     0,
        //     totalAmount - Number(discount)
        // );


        // Calculate Total

let totalAmount = 0;

const orderItems = cart.items.map((item) => {
    totalAmount += item.product.price * item.quantity;

    return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
    };
});

// Validate Coupon and Calculate Discount

let discount = 0;

if (couponCode) {
    const coupon = await Coupon.findOne({
        code: couponCode.trim().toUpperCase(),
    });

    if (!coupon) {
        return res.status(404).json({
            message: "Invalid coupon",
        });
    }

    if (!coupon.isActive) {
        return res.status(400).json({
            message: "Coupon is inactive",
        });
    }

    if (new Date(coupon.expiryDate) < new Date()) {
        return res.status(400).json({
            message: "Coupon has expired",
        });
    }

    if (totalAmount < coupon.minAmount) {
        return res.status(400).json({
            message: `Minimum purchase amount is ₹${coupon.minAmount}`,
        });
    }

    discount = (totalAmount * coupon.discount) / 100;
}

const finalAmount = Math.max(0, totalAmount - discount);

        // Check Product Stock BEFORE changing anything
        for (const item of cart.items) {
            const product = await Product.findById(
                item.product._id
            );

            if(!product) {
                return res.status(404).json({
                    message: "Product not found",
                });
            }

            if(product.stock < item.quantity) {
                return res.status(400).json({
                    message: `${product.name} is out of stock`,
                });
            }
        }

        // //===============
        // // WALLET PAYMENT
        // //===============

        // if(paymentMethod === "WALLET") {
        //     if(user.wallet < finalAmount) {
        //         return res.status(400).json({
        //             message: `Insufficient wallet balance.
        //             Available balance: ₹${user.wallet}`,
        //         });
        //     }

        //     // Deduct wallet balance

        //     user.wallet -= finalAmount;

        //     // Add wallet history

        //     user.walletHistory.push({
        //         amount: finalAmount,
        //         type: "Debit",
        //         description: "Payment for Order",
        //         date: new Date(),
        //     });

        //     await user.save();
        // }



        
let razorpayVerified = false;

if (paymentMethod === "RAZORPAY") {

    if (
        !razorpayPaymentId ||
        !razorpayOrderId ||
        !razorpaySignature
    ) {
        return res.status(400).json({
            message: "Payment details missing",
        });
    }

    // Generate expected signature
    const expectedSignature = crypto
        .createHmac(
            "sha256",
            process.env.RAZORPAY_KEY_SECRET
        )
        .update(
            `${razorpayOrderId}|${razorpayPaymentId}`
        )
        .digest("hex");

    // Compare signatures safely
    const expectedBuffer = Buffer.from(expectedSignature);
    const receivedBuffer = Buffer.from(razorpaySignature);

    const signatureValid =
        expectedBuffer.length === receivedBuffer.length &&
        crypto.timingSafeEqual(
            expectedBuffer,
            receivedBuffer
        );

    if (!signatureValid) {
        return res.status(400).json({
            message: "Invalid payment signature",
        });
    }

    const existingOrder = await Order.findOne({
        razorpayPaymentId: razorpayPaymentId,
    });

    if (existingOrder) {
        return res.status(400).json({
            message: "Payment already used",
        });
    }
    

        // Fetch payment directly from Razorpay
        const payment = await razorpay.payments.fetch(
            razorpayPaymentId
        );


        // Verify Razorpay Order Ownership

        const razorpayOrder = await razorpay.orders.fetch(
            razorpayOrderId
        );

        if (
            razorpayOrder.notes.userId !== userId.toString() ||
            razorpayOrder.amount !== Math.round(finalAmount * 100) ||
            razorpayOrder.currency !== "INR"
        ) {
            return res.status(400).json({
                message: "Invalid Razorpay order",
            });
        }

    // Verify payment details
    if (
        payment.order_id !== razorpayOrderId ||
        payment.amount !== Math.round(finalAmount * 100) ||
        payment.currency !== "INR" ||
        payment.status !== "captured"
    ) {
        return res.status(400).json({
            message: "Payment verification failed",
        });
    }

    razorpayVerified = true;
}



// Validate Payment Method

        let paymentStatus = "Pending";

        if (paymentMethod === "COD") {
            paymentStatus = "Pending";
        } else if (paymentMethod === "WALLET") {
            paymentStatus = "Paid";
        // } else if (paymentMethod === "RAZORPAY") {
        //     // Razorpay verification will be added next
        //     paymentStatus = "Pending";

        } else if (paymentMethod === "RAZORPAY") {

            if (!razorpayVerified) {
                return res.status(400).json({
                    message: "Payment not verified",
                });
            }

            paymentStatus = "Paid";
        } else {
            return res.status(400).json({
                message: "Invalid payment method",
            });
        }


        // Validate Wallet Balance and Deduct

        if (paymentMethod === "WALLET") {

            if (user.wallet < finalAmount) {
                return res.status(400).json({
                    message: `Insufficient wallet balance. Available balance: ₹${user.wallet}`,
                });
            }

            user.wallet -= finalAmount;

            user.walletHistory.push({
                amount: finalAmount,
                type: "Debit",
                description: "Payment for Order",
                date: new Date(),
            });

            await user.save();
        }


        //=======================
        // UPDATE PRODUCT STOCK
        //=======================

        for (const item of cart.items) {
            const product = await Product.findById(
                item.product._id
            );

            product.stock -= item.quantity;

            await product.save();
        }


        

        //=====================
        // CREATE ORDER
        //=====================

        const order = await Order.create({
            user: userId,
            items: orderItems,
            address: {
                fullName:
                address.fullName,
                phone:
                address.phone,
                house:
                address.house,
                city:
                address.city,
                state:
                address.state,
                pincode:
                address.pincode,
            },

            totalAmount,
            discount,
            finalAmount,

            paymentMethod,
            paymentStatus,

            razorpayPaymentId:
            paymentMethod === "RAZORPAY"
                ? razorpayPaymentId
                : undefined,

            // paymentStatus:
            // paymentMethod === "COD" ? "Pending" : "Paid",
            
        });

        // Clear Cart
        cart.items = [];
        await cart.save();

        res.status(201).json({
            message: "Order placed successfully",
            order,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message,
        });
    }
};

// exports.createRazorpayOrder = async (req, res) => {
//     try {
//         const { amount } = req.body;

//         const options = {
//             amount: amount * 100, //paisa
//             currency: "INR",
//             receipt: `receipt_${Date.now()}`,
//         };

//         const order = await razorpay.orders.create(options);

//         res.status(200).json(order);
//     } catch (error) {

//         console.log("razorpay error:",error);
//         res.status(500).json({
//             message: error.message,
//         });
//     }
// };



exports.createRazorpayOrder = async (req, res) => {
    try {
        const userId = req.user.id || req.user._id;
        const { couponCode } = req.body;

        // Get User Cart
        const cart = await Cart.findOne({
            user: userId
        }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty",
            });
        }

        // Calculate Total from Database
        let totalAmount = 0;

        for (const item of cart.items) {
            if (!item.product) {
                return res.status(404).json({
                    message: "Product not found",
                });
            }

            totalAmount += item.product.price * item.quantity;
        }

        // Validate Coupon
        let discount = 0;

        if (couponCode) {
            const coupon = await Coupon.findOne({
                code: couponCode.trim().toUpperCase(),
            });

            if (!coupon) {
                return res.status(404).json({
                    message: "Invalid coupon",
                });
            }

            if (!coupon.isActive) {
                return res.status(400).json({
                    message: "Coupon is inactive",
                });
            }

            if (new Date(coupon.expiryDate) < new Date()) {
                return res.status(400).json({
                    message: "Coupon has expired",
                });
            }

            if (totalAmount < coupon.minAmount) {
                return res.status(400).json({
                    message: `Minimum purchase amount is ₹${coupon.minAmount}`,
                });
            }

            discount =
                (totalAmount * coupon.discount) / 100;
        }

        const finalAmount = Math.max(
            0,
            totalAmount - discount
        );

        // Razorpay amount must be in paise
        const amountInPaise = Math.round(
            finalAmount * 100
        );

        if (amountInPaise <= 0) {
            return res.status(400).json({
                message: "Invalid payment amount",
            });
        }

        // Create Razorpay Order
        const options = {
            amount: amountInPaise,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            notes: {
                userId: userId.toString(),
                couponCode: couponCode || "",
            },
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json(order);

    } catch (error) {
        console.log("razorpay error:", error);

        res.status(500).json({
            message: error.message,
        });
    }
};


exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
        .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error){
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getOrderStatus = async (req, res) => {
    try {

        console.log("STATUS API HIT");
        console.log("USER:", req.user);
        console.log("ORDER ID:", req.params.id);
        const { id } = req.params;

        const order = await Order.findOne({
            _id: id,
            user: req.user.id
        });

        if(!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            orderId: order._id,
            orderStatus: order.orderStatus,
            paymentStatus: order.paymentStatus
        });
    } catch (error) {
        console.log("STATUS ERROR:", error);
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getSingleOrder = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user.id,
        }).populate("items.product", "name image price");

        if(!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.cancelOrder = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if(!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        if(order.orderStatus === "Cancelled") {
            return res.status(400).json({
                message: "Order already cancelled",
            });
        } 


        if (order.orderStatus === "Delivered") {
            return res.status(400).json({
                message: "Delivered order cannot be cancelled",
            });
        }

        const user = await User.findById(req.user.id);

        // Restore stock

        // for(const item of order.items) {
        //     const product = await Product.findById(item.product);

        //     if(product) {
        //         product.stock += item.quantity;

        //         await product.save();
        //     }
        // }


        // Restore stock only for active items

        for (const item of order.items) {

            if (item.cancelled) {
                continue;
            }

            const product = await Product.findById(item.product);

            if (product) {
                product.stock += item.quantity;
                await product.save();
            }
        }

        if((order.paymentMethod === "RAZORPAY" || order.paymentMethod === "WALLET") && order.paymentStatus === "Paid") {
            user.wallet += order.finalAmount;

            user.walletHistory.push({
                amount: order.finalAmount,
                type: "Credit",
                description: `Refund for Order #${order._id}`,
            });

            await user.save();

            order.paymentStatus = "Refunded";
        }

        order.orderStatus = "Cancelled";

        await order.save();

        res.status(200).json({
            message: "Order cancelled successfully",
            order,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// exports.cancelOrderItem = async (req, res) => {
//     try {
//         const { orderId, itemId} = req.params;

//         const order = await Order.findOne({
//             _id: orderId,
//             user: req.user.id,
//         });

//         if(!order) {
//             return res.status(404).json({
//                 message: "Order not found",
//             });
//         }

//         // Find item

//         const item = order.items.id(itemId);

//         if(!item) {
//             return res.status(404).json({
//                 message: "Order item not found",
//             });
//         }

//         //Don't allow cancelled after delivery

//         if(
//             order.orderStatus === "Delivered" || order.orderStatus === "Cancelled"
//         ) {
//             return res.status(400).json({
//                 message: "Item cannot be cancelled now",
//             });
//         }

//         // Restore stock

//         const product = await Product.findById(item.product);

//         if(product) {
//             product.stock += item.quantity;
//             await product.save();
//         }

//         // Refund item amount
//         const refundAmount = item.price * item.quantity;

//         //Wallet refund font paid orders

//         if(
//             (order.paymentMethod === "RAZORPAY" || order.paymentMethod === "WALLET") &&
//             order.paymentStatus === "Paid"
//         ) {
//             const user = await User.findById(req.user.id);

//             user.wallet += refundAmount;

//             user.walletHistory.push({
//                 amount: refundAmount,
//                 type: "Credit",
//                 description: `Refund for cancelled item in Order #${order._id}`,
//             });

//             await user.save();
//         }

//         // Mark item cancelled
//         item.cancelled = true;

//         await order.save();

//         res.status(200).json({
//             message: "Item cancelled successfully",
//             refundAmount,
//             order,
//         });
//     } catch (error) {
//         console.log(error);

//         res.status(500).json({
//             message: error.message,
//         });
//     }
// };

exports.cancelOrderItem = async (req, res) => {
    try {
        const { orderId, itemId } = req.params;

        const order = await Order.findOne({
            _id: orderId,
            user: req.user.id,
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        const item = order.items.id(itemId);

        if (!item) {
            return res.status(404).json({
                message: "Order item not found",
            });
        }

        if (item.cancelled) {
            return res.status(400).json({
                message: "Item already cancelled",
            });
        }

        if (
            order.orderStatus === "Delivered" ||
            order.orderStatus === "Cancelled"
        ) {
            return res.status(400).json({
                message: "Item cannot be cancelled now",
            });
        }

        // // Item refund amount
        // const refundAmount = item.price * item.quantity;


        // Calculate refund after proportional discount

        const itemGrossAmount = item.price * item.quantity;

        const activeItemsBeforeCancel = order.items.filter(
            (orderItem) => !orderItem.cancelled
        );

        const activeTotalBeforeCancel = activeItemsBeforeCancel.reduce(
            (total, orderItem) => {
                return total + (orderItem.price * orderItem.quantity);
            },
            0
        );

        const itemDiscount =
            activeTotalBeforeCancel > 0
                ? order.discount * (itemGrossAmount / activeTotalBeforeCancel)
                : 0;

        const refundAmount = Math.max(
            0,
            itemGrossAmount - itemDiscount
        );

        // Restore product stock
        const product = await Product.findById(item.product);

        if (product) {
            product.stock += item.quantity;
            await product.save();
        }

        // Mark item as cancelled
        item.cancelled = true;

        // Get remaining active items
        const activeItems = order.items.filter(
            (orderItem) => !orderItem.cancelled
        );

        // Calculate remaining total
        const newTotalAmount = activeItems.reduce(
            (total, orderItem) => {
                return total + (
                    orderItem.price * orderItem.quantity
                );
            },
            0
        );

        // Calculate discount proportionally
        let newDiscount = 0;

        if (order.totalAmount > 0 && order.discount > 0) {
            newDiscount =
                order.discount *
                (newTotalAmount / order.totalAmount);
        }

        newDiscount = Math.min(
            newDiscount,
            newTotalAmount
        );

        const newFinalAmount =
            newTotalAmount - newDiscount;

        // Refund for paid orders
        if (
            (
                order.paymentMethod === "RAZORPAY" ||
                order.paymentMethod === "WALLET"
            ) &&
            order.paymentStatus === "Paid"
        ) {
            const user = await User.findById(req.user.id);

            if (user) {
                user.wallet += refundAmount;

                user.walletHistory.push({
                    amount: refundAmount,
                    type: "Credit",
                    description:
                        `Refund for cancelled item in Order #${order._id}`,
                });

                await user.save();
            }
        }

        // Update order totals
        order.totalAmount = newTotalAmount;
        order.discount = newDiscount;
        order.finalAmount = newFinalAmount;

        // If every item is cancelled
        if (activeItems.length === 0) {
            order.orderStatus = "Cancelled";
            order.paymentStatus =
                order.paymentMethod === "COD"
                    ? "Pending"
                    : "Refunded";
        }

        await order.save();

        res.status(200).json({
            message: "Item cancelled successfully",
            refundAmount,
            totalAmount: order.totalAmount,
            discount: order.discount,
            finalAmount: order.finalAmount,
            order,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate("user", "name email")
        .populate("items.product", "name image price")
        .sort({ createdAt: -1});

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatus = [
            "Pending",
            "Confirmed",
            "Shipped",
            "Delivered",
            "Cancelled",
        ];

        if(!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status",
            });
        }

        if (status === "Cancelled") {
            return res.status(400).json({
                message: "Use the order cancellation process to cancel an order",
            });
        }

        const order = await Order.findById(id);

        if(!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        // Validate Order Status Transition

        const allowedTransitions = {
            Pending: ["Confirmed"],
            Confirmed: ["Shipped"],
            Shipped: ["Delivered"],
            Delivered: [],
            Cancelled: [],
        };

        if (!allowedTransitions[order.orderStatus].includes(status)) {
            return res.status(400).json({
                message: `Cannot change order status from ${order.orderStatus} to ${status}`,
            });
        }

        order.orderStatus = status;

        if(status === "Delivered") {
            order.paymentStatus = order.paymentMethod === "COD" ? "Paid" : order.paymentStatus;
        }

        await order.save();

        res.status(200).json({
            message: "Order status updated successfully",
            order,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// exports.getSalesReport = async ( req, res) => {
//     try {
//         const { startDate, endDate } = req.query;

//         const match = {
//             orderStatus: "Delivered",
//         };

//         if(startDate && endDate) {
//             match.createdAt = {
//                 $gte: new Date(`${startDate}T00:00:00`),
//                 $lte: new Date(`${endDate}T23:59:59`),
//             };
//         }
//         const orders = await Order.find(match)
//         .populate("items.product", "name")
//         .sort({ createdAt: -1});

//         let totalRevenue = 0;
//         let totalOrders = orders.length;
//         let totalProductSold = 0;

//         const productSales = {};
//         orders.forEach((order) => {
//             totalRevenue += order.finalAmount;

//             order.items.forEach((item) => {
//                 totalProductSold += item.quantity;

//                 const productName = item.product?.name || "Unknown Product";

//                 if(!productSales[productName]) {
//                     productSales[productName] = {
//                         product:
//                         productName,
//                         quantity:
//                         0,
//                         revenue:
//                         0,
//                     };
//                 }

//                 productSales[productName].quantity += item.quantity;

//                 productSales[productName].revenue += item.price * item.quantity;
//             });
//         });

//         res.status(200).json({
//             totalRevenue,
//             totalOrders,
//             totalProductSold,
//             productSales:
//             Object.values(productSales),
//             orders,
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//         });
//     }
// };

exports.getSalesReport = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const match = {
            orderStatus: "Delivered",
        };

        if (startDate && endDate) {
            match.createdAt = {
                $gte: new Date(`${startDate}T00:00:00`),
                $lte: new Date(`${endDate}T23:59:59`),
            };
        }

        const orders = await Order.find(match)
            .populate("items.product", "name")
            .sort({ createdAt: -1 });

        let totalRevenue = 0;
        let totalOrders = orders.length;
        let totalProductSold = 0;

        const productSales = {};

        orders.forEach((order) => {

            // Customer actually paid after discount
            totalRevenue += order.finalAmount;

            // Calculate order gross amount
            let orderGrossAmount = 0;

            order.items.forEach((item) => {
                orderGrossAmount += item.price * item.quantity;
            });

            order.items.forEach((item) => {

                totalProductSold += item.quantity;

                const productName =
                    item.product?.name || "Unknown Product";

                if (!productSales[productName]) {
                    productSales[productName] = {
                        product: productName,
                        quantity: 0,
                        revenue: 0,
                    };
                }

                productSales[productName].quantity += item.quantity;

                const itemGross =
                    item.price * item.quantity;

                // Apply order discount proportionally
                let itemRevenue = itemGross;

                if (orderGrossAmount > 0 && order.discount > 0) {
                    const discountRatio =
                        order.discount / orderGrossAmount;

                    itemRevenue =
                        itemGross -
                        (itemGross * discountRatio);
                }

                productSales[productName].revenue += itemRevenue;
            });
        });

        res.status(200).json({
            totalRevenue: Number(totalRevenue.toFixed(2)),
            totalOrders,
            totalProductSold,

            productSales: Object.values(productSales).map((item) => ({
                ...item,
                revenue: Number(item.revenue.toFixed(2)),
            })),

            orders,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Admin Sales Dashboard
exports.getSalesData = async (req, res) => {
    try {
        // All valid orders
        const orders = await Order.find({
            orderStatus: { $ne: "Cancelled" }
        });

        // Total Orders
        const totalOrders = orders.length;

        // Total Sales
        const totalSales = orders.reduce(
            (total, order) => total + order.finalAmount,
            0
        );

        // Delivered Orders
        const deliveredOrders = orders.filter(
            order => order.orderStatus === "Delivered"
        ).length;

        // Pending Orders
        const pendingOrders = orders.filter(
            order =>
                order.orderStatus === "Pending" ||
                order.orderStatus === "Confirmed" ||
                order.orderStatus === "Shipped"
        ).length;

        // Today's Sales
        const today = new Date();

        const todayStart = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );

        const todayEnd = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1
        );

        const todayOrders = orders.filter(order => {
            return (
                order.createdAt >= todayStart &&
                order.createdAt < todayEnd
            );
        });

        const todaySales = todayOrders.reduce(
            (total, order) => total + order.finalAmount,
            0
        );

        // This Month Sales
        const monthStart = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        const monthOrders = orders.filter(order => {
            return order.createdAt >= monthStart;
        });

        const monthSales = monthOrders.reduce(
            (total, order) => total + order.finalAmount,
            0
        );

        // =============================
// LAST 7 DAYS SALES
// =============================

const salesChart = [];

for (let i = 6; i >= 0; i--) {

    const date = new Date();

    date.setDate(date.getDate() - i);

    const dayStart = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );

    const dayEnd = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
    );

    const dayOrders = orders.filter(order => {
        return (
            order.createdAt >= dayStart &&
            order.createdAt < dayEnd
        );
    });

    const daySales = dayOrders.reduce(
        (total, order) => total + order.finalAmount,
        0
    );

    salesChart.push({
        name: date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short"
        }),
        sales: daySales
    });
}

        res.json({
            totalOrders,
            totalSales,
            deliveredOrders,
            pendingOrders,
            todaySales,
            monthSales,
            salesChart
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to load sales data"
        });
    }
};
