const express = require("express");
const router = express.Router();

const {
    addReview,
    getProductReviews,
} = require("../controllers/reviewController");

const protect = require("../middleware/authMiddleware");

// Add review - login required
router.post("/", protect, addReview);

// Get product reviews - public
router.get("/:productId",
    getProductReviews
);

module.exports = router;