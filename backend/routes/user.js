const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const adminProtect = require("../middleware/adminAuthMiddleware");

console.log("User routes loaded");

router.get("/profile",authMiddleware,
    async(req, res) => {
        const user = await User.findById(req.user.id);

        res.json(user);
    }
);

router.post("/add-address", authMiddleware, async(req, res) => {

    try {

        console.log("req.user =",req.user);
        
        const user = await User.findById(req.user.id);

        user.addresses.push(req.body);

        await user.save();

        res.json({
            message:"Address added"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }

    
});

router.get("/address/:id",authMiddleware, async(req,res) => {
    try {
        const user = await User.findById(req.user.id);

        const address = user.addresses.id(req.params.id);

        if(!address) {
            return 
            res.status(404).json({
                message:"Address not found"
            });
        }
        res.json(address);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
});

router.put("/update-address/:id",authMiddleware, async(req,res) => {
    try {
        const user = await User.findById(req.user.id);

        const address = user.addresses.id(req.params.id);

        if(!address) {
            return
            res.status(404).json({
                message:"Address not found"
            });
        }

        address.fullName = req.body.fullName;
        address.phone = req.body.phone;
        address.house = req.body.house;
        address.city = req.body.city;
        address.state = req.body.state;
        address.pincode = req.body.pincode;

        await user.save();

        res.json({
            message:"Address updated"
        });
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
});

router.get("/wallet",
    authMiddleware, async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select(
                "wallet walletHistory"
            );

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }
);

// Get Total Users Count - Admin Only
router.get("/admin/total-users", adminProtect, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();

        res.status(200).json({
            totalUsers
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;