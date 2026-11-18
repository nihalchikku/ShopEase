const express = require("express");
const router = express.Router();

const { addToCart, getCart, updateCartQuantity, removeFromCart, syncCart, } = require("../controllers/cartController");
const  protect  = require("../middleware/authMiddleware");

router.get("/", protect, getCart);

router.post("/add", protect, addToCart);

router.post("/sync", protect, syncCart);

router.put("/update", protect, updateCartQuantity);

router.delete("/remove", protect, removeFromCart);

module.exports = router;