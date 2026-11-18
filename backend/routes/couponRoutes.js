const express = require("express");
const router = express.Router();

const { createCoupon, getCoupons, deleteCoupon, updateCoupon, applyCoupon, getAvailableCoupons } = require("../controllers/couponController");

router.post("/", createCoupon);

router.post("/apply", applyCoupon);

router.get("/", getCoupons);

router.delete("/:id", deleteCoupon);

router.put("/:id", updateCoupon);

router.get(
    "/available", getAvailableCoupons);

module.exports = router;