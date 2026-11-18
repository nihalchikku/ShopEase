const Review = require("../models/Review");
const Order = require("../models/Order");

// Add Review
exports.addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;

        const userId = req.user.id || req.user._id;

        if(!productId || !rating || !comment) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Check whether user already reviewed this product

        const existingReview = await Review.findOne({
            user: userId,
            product: productId,
        });

        if(existingReview) {
            return res.status(400).json({
                message: "You have already reviewed this product",
            });
        }

        // Check whether user purchased this product
        const order = await Order.findOne({
            user: userId,
            orderStatus: "Delivered",
            "items.product":
            productId,
        });

        if(!order) {
            return res.status(403).json({
                message: "You can review only purchased products",
            });
        }

        const review = await Review.create({
            user: userId,
            product: productId,
            rating,
            comment,
        });

        res.status(201).json({
            message: "Review added successfully",
            review,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get Product Reviews
exports.getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await Review.find({
            product: productId,
        })
        .populate("user","name")
        .sort({ createdAt: -1});

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};