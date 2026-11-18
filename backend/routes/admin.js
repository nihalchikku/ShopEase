const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.js");
const transporter = require("../config/mail.js");

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        const admin = await Admin.findOne({email});
        if(!admin) {
            return res.status(400).json({message: "Admin not found"});
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch) {
            return res.status(400).json({message:
                "Invalid password"
            });
        }

        const token = jwt.sign(
            {id:admin._id, role:
                admin.role
            },
            process.env.ADMIN_JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.json({
            message: "Login success",
            token,
            admin
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

router.post("/forgot-password", async (req,res) => {
    try {
        const {email} = req.body;

        const admin = await Admin.findOne({email});

        if(!admin){
            return res.status(404).json({
                message: "Admin not found",
            });
        }

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        admin.resetOtp = otp;
        admin.resetOtpExpiry = Date.now() + 5 * 60 * 1000;
        admin.resetOtpVerified = false;

        await admin.save();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: admin.email,
            subject: "Admin Password Reset OTP",
            html: `<h1>${otp}</h1>`
        });
        res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});

// router.post("/reset-password", async(req,res) => {
//     try {
//         const {email, newPassword} = req.body;
//         console.log(email);
//         console.log(newPassword);
        
        
//         const admin = await Admin.findOne({email});

//         if(!admin) {
//             return res.status(404).json({
//                 message: "Admin not found"
//             });
//         }

//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         admin.password = hashedPassword;
//         await admin.save();

//         res.status(200).json({
//             message: "Password reset successfully"
//         });
//     } catch (error) {
//         console.log("RESET ERROR:",error);
//         res.status(500).json({
//             message: error.message
//         });
//     }
// });


router.post("/reset-password", async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({
                message: "Email and new password are required",
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters",
            });
        }

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({
                message: "Admin not found",
            });
        }

        if (!admin.resetOtpVerified) {
            return res.status(403).json({
                message: "Please verify OTP first",
            });
        }

        if (
            !admin.resetOtpExpiry ||
            admin.resetOtpExpiry.getTime() < Date.now()
        ) {
            return res.status(400).json({
                message: "OTP verification expired. Please request a new OTP.",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        admin.password = hashedPassword;

        // Reset process complete - clear everything
        admin.resetOtp = undefined;
        admin.resetOtpExpiry = undefined;
        admin.resetOtpVerified = false;

        await admin.save();

        return res.status(200).json({
            message: "Password reset successfully",
        });

    } catch (error) {
        console.log("RESET ERROR:", error);

        return res.status(500).json({
            message: error.message,
        });
    }
});

// router.post("/verify-otp", async (req,res) => {
//     try {
//         const {email,otp} = req.body;

//         const admin = await Admin.findOne({email});

//         if(!admin) {
//             return res.status(404).json({
//                 message: "Admin not found",
//             });
//         }

//         if(admin.resetOtp !== otp) {
//             return res.status(400).json({
//                 message: "Invalid OTP",
//             });
//         }

//         if(admin.resetOtpExpiry < Date.now()){
//             return res.status(400).json({
//                 message: "OTP expired",
//             });
//         }

//         return res.status(200).json({
//             message: "OTP verified",
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: error.message,
//         });
//     }
// });



router.post("/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({
                message: "Admin not found",
            });
        }

        if (!admin.resetOtp || admin.resetOtp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP",
            });
        }

        if (
            !admin.resetOtpExpiry ||
            admin.resetOtpExpiry.getTime() < Date.now()
        ) {
            return res.status(400).json({
                message: "OTP expired",
            });
        }

        admin.resetOtpVerified = true;

        await admin.save();

        return res.status(200).json({
            message: "OTP verified",
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});

// router.post("/reset-otp", async (req,res) => {
//     try {
//         const {email, password} = req.body;

//         const admin = await Admin.findOne({email});

//         if(!admin){
//             return res.status(404).json({
//                 message: "Admin not found",
//             });
//         }

//         const hashedPassword = 
//         await bcrypt.hash(password, 10);

//         admin.password = hashedPassword;
//         admin.resetOtp = null;
//         admin.resetOtpExpiry = null;

//         await admin.save();

//         return res.status(200).json({
//             message: "Password reset successful",
//         });

        

//     } catch (error) {
//         return res.status(500).json({
//             message: error.message,
//         });
//     }
// });


router.post("/resend-otp", async (req, res) => {
    try {
        const { email } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({
                message: "Admin not found",
            });
        }

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        admin.resetOtp = otp;
        admin.resetOtpExpiry = Date.now() + 5 * 60 * 1000;
        admin.resetOtpVerified = false;

        await admin.save();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: admin.email,
            subject: "Admin Password Reset OTP",
            html: `<h1>${otp}</h1>`,
        });

        return res.status(200).json({
            message: "New OTP sent successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});

module.exports = router;