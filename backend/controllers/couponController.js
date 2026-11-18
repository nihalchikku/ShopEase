const Coupon = require("../models/Coupon");

exports.createCoupon = async (req,res) => {
    try {
        const {code, discount, minAmount, expiryDate } = req.body;

        const existingCoupon = await Coupon.findOne({
            code:
            code.trim().toUpperCase(),
        });

        if(existingCoupon) {
            return res.status(400).json({
                message: "Coupon already exists",
            });
        }

        const coupon = await
        Coupon.create({
            code:
            code.trim().toUpperCase(),
            discount,
            minAmount,
            expiryDate,
        });

        res.status(201).json({
            message:"Coupon created successfully",
            coupon,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getCoupons = async (req, res) => {
    try{
        const coupons = await
        Coupon.find().sort({
            createdAt: -1
        });

        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;

        const coupon = await 
        Coupon.findById(id);

        if(!coupon) {
            return res.status(404).json({
                message: "Coupon not found",
            });
        }

        await 
        Coupon.findByIdAndDelete(id);

        res.status(200).json({
            message: "Coupon deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.updateCoupon = async (req,res) => {
    try {
        const { id } = req.params;
        const { code, discount, minAmount, expiryDate, isActive } = req.body;

        const coupon = await Coupon.findById(id);

        if(!coupon) {
            return res.status(404).json({
                message: "Coupon not found",
            });
        }

        coupon.code = code ? code.toUpperCase() : coupon.code;
        coupon.discount = discount ?? coupon.discount;
        coupon.minAmount = minAmount ?? coupon.minAmount;
        coupon.expiryDate = expiryDate ?? coupon.expiryDate;
        coupon.isActive = isActive ?? coupon.isActive;

        await coupon.save();

        res.status(200).json({
            message: "Coupon updated successfully",
            coupon,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.applyCoupon = async (req, res) => {
    try {
        const { code, totalAmount } = req.body;

        const coupon = await Coupon.findOne({
            code: code.trim().toUpperCase(),
        });

        if(!coupon) {
            return res.status(404).json({
                message: "Invalid coupon",
            });
        }

        if(!coupon.isActive) {
            return res.status(400).json({
                message: "Coupon is inactive",
            });
        }

        if(new Date(coupon.expiryDate) < new Date()) {
            return res.status(400).json({
                message: "Coupon has expired",
            });
        }

        if(totalAmount < coupon.minAmount) {
            return res.status(400).json({
                message: `Minimum purchase amount is ₹${coupon.minAmount}`,
            });
        }

        const discountAmount = (totalAmount * coupon.discount) / 100;

        const finalAmount = totalAmount - discountAmount;

        res.status(200).json({
            message: "Coupon applied successfully",
            discountAmount,
            finalAmount,
            coupon,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getAvailableCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find({
            isActive: true,
            expiryDate: { $gte: new Date() },
        }).sort({
            createdAt: -1,
        });

        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};