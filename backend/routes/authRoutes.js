// const express = require("express");

// const {
//     registerUser,
//     loginUser,
//     verifyOtp,
//     forgotPassword,
//     resetPassword,
//     resendOtp,
//     changePassword,
// } = require("../controllers/authController.js");

// const router = express.Router();

// const protect = require("../middleware/authMiddleware");


// router.get("/profile", protect, (req, res) => {
//     res.json({
//         message: "Protected Route Accessed",
//         user: req.user,
//     });
// });

// router.post("/register",
//     registerUser);
// router.post("/login",loginUser);

// router.post("/verify-otp", verifyOtp);

// router.post("/forgot-password", forgotPassword);

// router.post("/reset-password", resetPassword);

// router.post("/resend-otp", resendOtp);


// router.put("/change-password", protect,changePassword);

// module.exports = router;



const express = require("express");
const { body } = require("express-validator");
const { rateLimit } = require("express-rate-limit");

const {
    registerUser,
    loginUser,
    verifyOtp,
    forgotPassword,
    resetPassword,
    resendOtp,
    changePassword,
} = require("../controllers/authController.js");

const protect = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");

const router = express.Router();

// Login rate limiter
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 10,
    message: {
        success: false,
        message: "Too many login attempts. Please try again after 15 minutes.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// REGISTER VALIDATION
const registerValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ max: 50 })
        .withMessage("Name must not exceed 50 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),

    body("password")
        .isString()
        .withMessage("Password must be a string")
        .isLength({ min: 8, max: 128 })
        .withMessage("Password must be between 8 and 128 characters"),

    body("confirmPassword")
        .isString()
        .withMessage("Confirm password is required")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),
];

// LOGIN VALIDATION
const loginValidation = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),

    body("password")
        .isString()
        .withMessage("Password is required")
        .notEmpty()
        .withMessage("Password cannot be empty")
];

// Protected profile route
router.get("/profile", protect, (req, res) => {
    res.json({
        message: "Protected Route Accessed",
        user: req.user,
    });
});

// Register
router.post(
    "/register",
    registerValidation,
    validateRequest,
    registerUser
);

// Login
router.post(
    "/login",
    loginLimiter,
    loginValidation,
    validateRequest,
    loginUser
);

// Existing routes
router.post("/verify-otp", verifyOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/resend-otp", resendOtp);
router.put("/change-password", protect, changePassword);

module.exports = router;