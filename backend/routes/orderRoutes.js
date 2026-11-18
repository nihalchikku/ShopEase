const express = require("express");
const router = express.Router();

const { placeOrder, createRazorpayOrder, getMyOrders, getSingleOrder, getOrderStatus, cancelOrder, cancelOrderItem, getAllOrders, updateOrderStatus, getSalesReport, getSalesData,  } = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");
const adminProtect = require("../middleware/adminAuthMiddleware");

router.post("/", protect, placeOrder);

router.post("/create-razorpay-order", protect, createRazorpayOrder);

router.get("/my-orders", protect, getMyOrders);


router.get("/:id", protect, getSingleOrder);

router.get("/status/:id", protect, getOrderStatus);


router.put("/cancel/:id", protect, cancelOrder);


router.put("/:orderId/item/:itemId/cancel",
    protect,
    cancelOrderItem
);

router.get(
    "/admin/all",
    adminProtect,
    getAllOrders
);

router.put(
    "/admin/status/:id",
    adminProtect,
    updateOrderStatus
);

router.get(
    "/admin/sales-report",
    adminProtect,
    getSalesReport
);

router.get(
    "/admin/sales",
    adminProtect,
    getSalesData
);



module.exports = router;