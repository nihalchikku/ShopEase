const User = require( "../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/mail.js");

const registerUser = async(req, res) => {
    try {
        const {name,email,password,confirmPassword} = 
        req.body;

        if(password !== confirmPassword){
            return res.status(400).json({
                message:"Password don not match",
            });
        }

        const userExists = await
        User.findOne({email});

        if(userExists) {
            return res.status(400).json({
                message:"User already exists",
            });
        }

        const hashedPassword = await 
        bcrypt.hash(password, 10);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            isVerified:false,
            otp,
            otpType: "register",
            otpExpiry: Date.now() + 5 * 60 * 1000,
        });

        // user.otp = otp;
        // user.otpExpiry = Date.now() + 5 * 60 * 1000;
        await user.save();
        
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Accout verification OTP",
            html: `<h2>Welcome to E-commerce App</h2>
            <p>Your OTP for account verification is: </p>
            <h1>${otp}</h1>
            <p>This OTP will expire in 5 minutes.</p>
             `
        });

        res.json({
            success: true,
            message: "OTP sent to your email",
            // otp,
        })
    } catch (error) {
        res.status(500).json({message:
            error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const {email,password} = 
        req.body;

        const user = await
        User.findOne({email});

        if(!user){
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        const isMatch = await 
        bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch){
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        if(!user.isVerified) {
            return res.status(400).json({
                message: "please verify your email first"
            });
        }

        // console.log("JWT_SECRET LOGIN =",process.env.JWT_SECRET);
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            token,
            user,
        });
    } catch (error){
        res.status(500).json({message:
            error.message
        });
    }
};

const forgotPassword = async (req,res) => {
    try {
        const {email} = req.body;

        const user = await 
        User.findOne({email});

        if(!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const resetOtp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        user.resetOtp = resetOtp;
        user.resetOtpExpiry = Date.now() + 5 * 60 * 1000;
        user.otpType = "forgot-password";

        await user.save();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset OTP",
            html:`
            <h2>Password Reset</h2>
            <p>Your OTP is:</p>
            <h1>${resetOtp}</h1>
            <p>This OTP expires in 5 minutes.</p>
            `,
        });

        res.json({
            message: "OTP sent to your email",
        });
    } catch (error){
        res.status(500).json({
            message:error.message,
        });
    }
};

const resetPassword = async (req,res) => {
    console.log(req.body);
    try {
        const {email,newPassword} = req.body;

        const user = await
        User.findOne({email});

        if(!user) {
            return res.status(404).json({
                message:"User not found",
            });
        }

        const hashedPassword = await
        bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = undefined;
        user.resetOtpExpiry = undefined;

        await user.save();

        res.json({
            message:"Password reset successful",
        });
    } catch (error){
        res.status(500).json({
            message:error.message,
        });
    }
};

const verifyOtp = async (req, res) => {
    try {
        console.log("BODY:",req.body);
        const {email, otp} = req.body;

        const user = await
        User.findOne({email});

        console.log("USER:",user);
        console.log("OTP TYPE:",user?.otpType);
        console.log("DB OTP:",user?.otp);
        console.log("RESET OTP:",user?.resetOtp);
        console.log("ENTERED OTP:",otp);

        if(!user){
            return res.status(404).json({
                message:"User not found",
            });
        }

        if(user.otpType === "register"){
            if(user.otp !== otp){
                return res.status(400).json({
                    message: "Invalid OTP",
                });
            }
            
            if(user.otpExpiry < Date.now()){
                return res.status(400).json({
                    messaage: "OTP expired",
                });
            }
        }

        if(user.otpType === "forgot-password"){
            if(user.resetOtp !== otp){
                return res.status(400).json({
                    messaage: "Invalid OTP",
                });
            }
            
            if(user.resetOtpExpiry < Date.now()){
                return res.status(400).json({
                    message: "OTP expired",
                });
            }
        }

        if(user.otpType === "register"){
            user.isVerified = true;
            user.otp = null;
            user.otpExpiry = null;
            user.otpType = null;

            await user.save();

            console.log("isVerified:",user.isVerified);

            return res.status(200).json({
                message: "Account verified successfully"
            });
        }

        if(user.otpType === "forgot-password"){
            user.otpType = null;

            await user.save();
            return res.status(200).json({
                message: "OTP verified",
                allowReset: true
            });
        }

        res.status(200).json({
            message:"OTP verified",
        });
    } catch (error) {
        // console.log("ERROR:", error.response?.data);

        // alert(error.response?.messaage);
        res.status(500).json({
            message:error.message,
        });
    }
};

const resendOtp = async (req,res) => {
    try {
        const {email, type} = req.body;

        const user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        if(type === "register") {
            user.otp = otp;
            user.otpType = "register";
            user.otpExpiry = Date.now() + 5 * 60 * 1000;
        }
        if(type === "forgot-password"){
            user.resetOtp = otp;
            user.otpType = "forgot-password";
            user.resetOtpExpiry = Date.now() + 5 * 60 * 1000;
        }

        await user.save();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "OTP Verification",
            html: `<h1>${otp}</h1>`
        });

        return res.json({
            message: "OTP sent successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message:error.messaage
        });
    }
};

const changePassword = async (req,res) => {
    try {
        const {currentPassword, newPassword} = req.body;

        const user = await User.findById(req.user.id);

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if(!isMatch) {
            return
            res.status(400).json({
                message: "Current password is incorrect",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        res.json({
            message: "Password changed successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.messaage,
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    verifyOtp,
    forgotPassword,
    resetPassword,
    verifyOtp,
    resendOtp,
    changePassword,
};