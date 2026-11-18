const mongoose = require("mongoose");

const userSchema = new
mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },

        addresses: [
            {
                fullName: String,
                phone: String,
                house: String,
                city: String,
                state: String,
                pincode: String
            }
        ],
        wallet: {
            type: Number,
            default: 0,
        },

        walletHistory: [
            {
                amount: Number,
                type: {
                    type: String,
                    enum: ["Credit", "Debit"],
                },
                description: String,
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        
        isVerified: {
            type: Boolean,
            default: false,
        },
        otp: {
            type: String,
        },
        otpType: {
            type: String,
        },
        
        otpExpiry: {
            type: Date,
        },
        resetOtp: {
            type: String,
        },
        resetOtpExpiry: {
            type: Date,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User",userSchema);

module.exports = User;