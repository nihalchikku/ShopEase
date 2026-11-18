const express = require("express");
const router = express.Router();

const {
    addCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

const adminProtect = require("../middleware/adminAuthMiddleware");

router.post(
    "/add",
    adminProtect,
    addCategory
);

router.get(
    "/",
    getCategories
);

router.get(
    "/:id",
    getCategoryById
);

router.put(
    "/:id",
    adminProtect,
    updateCategory
);

router.delete(
    "/:id",
    adminProtect,
    deleteCategory
);

module.exports = router;

