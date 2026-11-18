const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type:
            mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        items: [
            {
                product: {
                    type:
                    mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                quantity: Number,
                price: Number,
                cancelled: {
                    type: Boolean,
                    default: false
                }
            },
        ],

        address: {
            fullName: String,
            phone: String,
            house: String,
            city: String,
            state: String,
            pincode: String,
        },

        totalAmount: {
            type: Number,
            required: true,
        },

        discount: {
            type: Number,
            default: 0,
        },

        finalAmount: {
            type: Number,
            required: true,
        },

        paymentMethod: {
            type: String,
            enum: ["COD", "RAZORPAY","WALLET"],
            default: "COD",
        },

        razorpayPaymentId: {
            type: String,
            unique: true,
            sparse: true,
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Refunded"],
            default: "Pending",
        },

        orderStatus: {
            type: String,
            enum: [
                "Pending",
                "Confirmed",
                "Shipped",
                "Delivered",
                "Cancelled",
            ],
            default: "Pending",
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Order", orderSchema);