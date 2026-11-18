const Cart = require("../models/Cart");


const Product = require("../models/Product");


exports.addToCart = async (req, res ) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        // product find

        const product = await Product.findById(productId);

        if(!product){
            return
            res.status(404).json({
                message: "Product not found",
            });
        }

        let cart = await Cart.findOne({user: userId});

        if(!cart) {
            cart = await Cart.create({
                user: userId,
                items: [
                    {
                        product: productId,
                        quantity: quantity ||
                        1,
                    },
                ],
            });
        } else {
            const existingItem = 
            cart.items.find(
                (item) => 
                    item.product.toString() === productId
            );

            // if(existingItem) {
            //     existingItem.quantity += quantity || 1;
            // } else {
            //     cart.items.push({
            //         product: productId,
            //         quantity: quantity ||
            //         1,
            //     });
            // }

            if(existingItem) {
                if(existingItem.quantity >= product.stock) {
                    return res.status(400).json({
                        message: `Only ${product.stock} items available`,
                    });
                }

                existingItem.quantity += quantity || 1;
            } else {
                cart.items.push({
                    product: productId,
                    quantity: quantity || 1,
                });
            }

            await cart.save();
        }

        res.status(200).json({
            message: "Product added to cart",
            cart,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get Cart 

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user.id
        }).populate("items.product");

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    } 
};

// Update Cart Quantity

exports.updateCartQuantity = async (req, res) => {
    try {
        const {productId, quantity} = req.body;

        const cart = await Cart.findOne({
            user: req.user.id
        });

        if(!cart) {
            return 
            res.status(404).json({
                message: "Cart not found",
            });
        }

        const item = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if(!item) {
            return 
            res.status(404).json({
                message: "Product not found in cart",
            });
        }

        item.quantity = quantity;

        await cart.save();

        res.json({
            message: "Quantity updated",
            cart,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

//Remove Product From Cart

exports.removeFromCart = async (req, res) => {
    try {
        const {productId} = req.body;

        const cart = await Cart.findOne({
            user: req.user.id
        });

        if(!cart) {
            return 
            res.status(404).json({
                message: "Cart not found",
            });
        }

        cart.items = cart.items.filter(
            (item) => 
                item.product.toString() !== productId
        );

        await cart.save();

        res.json({
            message: "Product removed from cart",
            cart,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Sync Local Cart After Login

exports.syncCart = async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.user.id;

        if (!items || !Array.isArray(items)) {
            return res.status(400).json({
                message: "Invalid cart data",
            });
        }

        let cart = await Cart.findOne({
            user: userId,
        });

        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: [],
            });
        }

        for (const item of items) {
            const productId =
                item.productId || item.product?._id;

            const product = await Product.findById(productId);

            if (!product) continue;

            const existingItem = cart.items.find(
                (cartItem) =>
                    cartItem.product.toString() === productId
            );

            const quantity = item.quantity || 1;

            if (existingItem) {
                const newQuantity =
                    existingItem.quantity + quantity;

                existingItem.quantity =
                    Math.min(newQuantity, product.stock);
            } else {
                cart.items.push({
                    product: productId,
                    quantity: Math.min(
                        quantity,
                        product.stock
                    ),
                });
            }
        }

        await cart.save();

        res.status(200).json({
            message: "Cart synced successfully",
            cart,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};