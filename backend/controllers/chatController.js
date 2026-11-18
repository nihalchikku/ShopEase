// const OpenAI = require("openai");

// const client = new OpenAI({
//     apiKey:
//     process.env.OPENAI_API_KEY,
// });

// exports.chatWithAI = async (req, res) => {
//     try {
//         const { message } = req.body;

//         if(!message || !message.trim()) {
//             return res.status(400).json({
//                 message: "Message is required",
//             });
//         }

//         const response = await client.responses.create({
//             model: "gpt-5-mini",
//             input: message,
//         });

//         res.status(200).json({
//             reply: response.output_text,
//         });
//     } catch (error) {
//         console.log("AI Error:",
//             error
//         );

//         res.status(500).json({
//             message: "AI response failed",
//         });
//     }
// }; 

const Order = require("../models/Order");

exports.chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;

        const userMessage = String(message || "").trim();

        if(!userMessage) {
            return res.status(400).json({
                message: "Message is required"
            });
        }

        const text = userMessage.toLowerCase();

        //--------------------------------------
        // 1. Check Order Status
        //--------------------------------------

        const orderMatch = userMessage.match(/(?:order\s*(?:status)?\s*#?|#)([a-fA-F0-9]{24})/i);

        if(orderMatch) {
            const orderId = orderMatch[1];

            const order = await Order.findOne({
                _id: orderId,
                user: req.user._id ||req.user.id
            });

            if(!order) {
                return res.status(404).json({
                    reply: "Sorry I couldn't find that order."
                });
            }

            // return res.status(200).json({
            //     reply: `📦 Your order #${orderId} is currently ${order.orderStatus}.`
            // });

            return res.status(200).json({
                reply: `📦 Order Details\n\n` + `🆔 Order ID: #${orderId}\n` + `📦 Order Status: ${order.orderStatus}\n` + `💳 Payment Status: ${order.paymentStatus}\n` + `💰 Total Amount: ₹${order.finalAmount}`
            });
        }

        if(
            text.includes("latest order") ||
            text.includes("last order") ||
            text.includes("recent order") ||
            text.includes("my latest order") ||
            text.includes("my last order")
        ) {
            const latestOrder = await Order.findOne({
                user: req.user._id || req.user.id
            }).sort({createdAt: -1});

            if(!latestOrder) {
                return res.status(200).json({
                    reply: "📦 You don't have any orders yet."
                });
            } 
            return res.status(200).json({
                reply: `📦 Your latest order\n\n` + `🆔 Order ID: #${latestOrder._id}\n` +
                `📦 Order Status: ${latestOrder.orderStatus}\n` + `💳 Payment Status: ${latestOrder.paymentStatus}\n` +
                `💰 Total Amount: ₹${latestOrder.finalAmount}`
            });
        }


        if(
            text.includes("payment status") ||
            text.includes("my payment status")
        ) {
            const latestOrder = await Order.findOne({
                user:req.user._id || req.user.id
            }).sort({ createdAt: -1});

            if(!latestOrder) {
                return res.status(200).json({
                    reply: "💳 You don't have any orders yet."
                });
            } 

            return res.status(200).json({
                reply: `💳 Payment Details\n\n` + `🆔 Order ID: #${latestOrder._id}\n` +
                `💳 Payment Status: ${latestOrder.paymentStatus}\n` + `💰 Amount: ₹${latestOrder.finalAmount}`
            });
        }


        //------------------------------------
        // 2. Hello / Hi
        //------------------------------------

        if(
            text === "hi" ||
            text === "hello" ||
            text ===  "hey" ||
            text.includes("good morning") ||
            text.includes("good evening") 
        ) {
            return res.status(200).json({
                reply: "Hello 👋 How can I help you?"
            });
        }


        
        //-------------------------------------
        // 3. Order related
        //-------------------------------------

        if(
            text.includes("order") ||
            text.includes("orders") ||
            text.includes("my orders") ||
            text.includes("show orders") ||
            text.includes("view orders") ||
            text.includes("where are my orders") ||
            text.includes("where can i see my orders")
        ) {
            return res.status(200).json({
                reply: "📦 You can check your orders from the My Orders page.\n\n" + "🔍 To check a specific order, send:\n" + "Check order status #YourOrderID"
            });
        }

        //--------------------------------------
        // 4. Delivery
        //--------------------------------------

        if(
            text.includes("delivery") ||
            text.includes("deliver") ||
            text.includes("shipping")
        ) {
            return res.status(200).json({
                reply: "🚚 Your order will be delivered to the address provided during checkout."
            });
        }

        //-------------------------------------
        // 5. Payment
        //-------------------------------------

        if(
            text.includes("payment") ||
            text.includes("pay") ||
            text.includes("code")
        ) {
            return res.status(200).json({
                reply: "💳 We support Cash on Delivery and online payment."
            });
        }

        //------------------------------------
        // 6. Cancel Order
        //------------------------------------

        if(
            text.includes("cancel") ||
            text.includes("cancellation")
        ) {
            return res.status(200).json({
                reply: "❌ You can cancel an eligible order from the My Orders page."
            });
        }

        //-------------------------------------
        // 7. Product
        //-------------------------------------

        if(
            text.includes("product") ||
            text.includes("products")
        ) {
            return res.status(200).json({
                reply: "🛍️ You can browse all available products from the Home page."
            });
        }

        //-------------------------------------
        // 8. Help
        //-------------------------------------

        if(
            text.includes("help") ||
            text.includes("what can you do")
        ) {
            return res.status(200).json({
                reply: "🤖 I can help you with orders, delivery, payment, products and order status."
            });
        }

        //-------------------------------------
        // 9. Thank you
        //-------------------------------------

        if(
            text.includes("thank") ||
            text.includes("thanks")
        ) {
            return res.status(200).json({
                reply: "You're welcome! 😊"
            });
        }

        //-------------------------------------
        // 10. Default reply
        //-------------------------------------

        return res.status(200).json({
            reply: "Sorry, I didn't understand that. Try asking about your order, delivery, payment or products."
        });
    } catch (error) {
        console.error("Chatbot Error:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};