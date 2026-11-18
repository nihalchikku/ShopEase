// const express = require("express");
// const router = express.Router();

// const upload = require("../middleware/uploadMiddleware");

// const {
//     addBanner,
//     getBanners,
//     updateBanner,
//     deleteBanner
// } = require("../controllers/bannerController");

// // Add Banner
// router.post(
//     "/add",
//     upload.single("image"),
//     addBanner
// );

// // Get All Banners
// router.get("/", getBanners);

// // Update Banner
// router.put(
//     "/:id",
//     upload.single("image"),
//     updateBanner
// );

// // Delete Banner
// router.delete("/:id", deleteBanner);

// module.exports = router;



const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const adminProtect = require("../middleware/adminAuthMiddleware");

const {
    addBanner,
    getBanners,
    updateBanner,
    deleteBanner
} = require("../controllers/bannerController");

// Add Banner - Admin Only
router.post(
    "/add",
    adminProtect,
    upload.single("image"),
    addBanner
);

// Get All Banners - Public
router.get("/", getBanners);

// Update Banner - Admin Only
router.put(
    "/:id",
    adminProtect,
    upload.single("image"),
    updateBanner
);

// Delete Banner - Admin Only
router.delete(
    "/:id",
    adminProtect,
    deleteBanner
);

module.exports = router;
