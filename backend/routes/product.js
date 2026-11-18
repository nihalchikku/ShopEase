const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Category =require("../models/Category");
const adminProtect = require("../middleware/adminAuthMiddleware");

router.post("/add", adminProtect,
    async (req,res) => {
        try {
            const product = await Product.create(req.body);

            res.status(201).json({
                message: "Product added successfully",
                product,
            });
        } catch(error){
            console.log(error);

            res.status(500).json({
                message: error.message,
            });
        }
    }
);

// router.get("/", async (req,res) => {
//     try {
//         const products = await
//         Product.find().populate("category")
//         .sort({createdAt: -1});

//         res.json(products);
//     } catch (error) {
//         console.log(error);

//         res.status(500).json({
//             message: error.message,
//         });
//     }
// });


router.get("/", async (req, res) => {
    try {
        const {
            search,
            category,
            minPrice,
            maxPrice,
            rating
        } = req.query;

        let filter = {};

        if (search && search.trim()) {
        const categories = await Category.find({
            name: { $regex: search.trim(), $options: "i" }
        }).select("_id");

        const categoryIds = categories.map((cat) => cat._id);

        filter.$or = [
            { name: { $regex: search.trim(), $options: "i" } },
            { description: { $regex: search.trim(), $options: "i" } },
            { category: { $in: categoryIds } }
        ];
        }

        // // Keyword search
        // if (search) {
        //     filter.$or = [
        //         { name: { $regex: search, $options: "i" } },
        //         { description: { $regex: search, $options: "i" } }
        //     ];
        // }

        // Category filter
        if (category) {
            filter.category = category;
        }

        // Price filter
        if (minPrice || maxPrice) {
            filter.price = {};

            if (minPrice) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        // Rating filter
        if (rating) {
            filter.rating = { $gte: Number(rating) };
        }

        const products = await Product.find(filter)
            .populate("category")
            .sort({ createdAt: -1 });

        res.json(products);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
});


router.get("/:id", async (req,res) => {
    try {
        const product = await Product.findById(req.params.id)
        .populate("category");

        if(!product){
            return res.status(404).json({
                message:"Product not found"
            });
        }
        res.json(product);
    } catch (error){
        res.status(500).json({
            message:error.message
        });
    }
});

router.put("/:id", adminProtect, async (req,res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if(!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message:"Product updated successfully",
            product
        });
    } catch (error){
        console.log(error);

        res.status(500).json({
            message:error.message
        });
    }
});

router.delete("/:id", adminProtect, async (req,res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if(!product){
            return res.status(404).json({
                message:"Product not found"
            });
        }
        res.json({
            message:"Product deleted successfully"
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;