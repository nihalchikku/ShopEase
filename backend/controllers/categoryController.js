const Category = require("../models/Category");

//add category

// exports.addCategory = async(req,res) => {
//     try {
//         const existingCategory = await
//         Category.findOne({
//             name:req.body.name.trim().toLowerCase(),
//             description: req.body.description.trim(),
//         });

//         if(existingCategory) {
//             return res.status(400).json({
//                 message: "Category already exists",
//             });
//         }
            

//         const category = await 
//         Category.create({
//             name: req.body.name.trim().toLowerCase(),
//         });

//         res.json({
//             message:"Category added",
//             category
//         });
//     } catch(error){
//         res.status(500).json({
//             messsage:error.message
//         });
//     }
// };

exports.addCategory = async(req,res) => {
    try {

        const existingCategory = await Category.findOne({
            name: req.body.name.trim().toLowerCase(),
        });

        if(existingCategory) {
            return res.status(400).json({
                message: "Category already exists",
            });
        }

        const category = await Category.create({
            name: req.body.name.trim().toLowerCase(),
            description: req.body.description.trim(),
        });

        res.json({
            message: "Category added",
            category
        });

    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }
};

//Get All Categories

exports.getCategories = async(req,res) => {
    try {
        const categories = await 
        Category.find()
        .sort({createdAt:-1});

        res.json(categories);

    } catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

// Get Single Category

exports.getCategoryById = async (req, res) => {
    try {

        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.json(category);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

//Update Category

exports.updateCategory = async(req,res) => {
    // try {
    //     const category = await
    //     Category.findByIdAndUpdate(
    //         req.params.id,
    //         req.body,
    //         {new:true}
    //     );

    //     res.json({
    //         message:"Category updated",
    //         category
    //     });
    // } catch(error){
    //     res.status(500).json({
    //         message:error.message
    //     });
    // }

    try {
        const existingCategory = await Category.findOne({
            name:req.body.name.trim().toLowerCase(),
            _id:{$ne: req.params.id}
        });

        if(existingCategory){
            return 
            res.status(400).json({
                message:"Category already exists"
            });
        }

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                name:
                req.body.name.trim().toLowerCase(),
                description: req.body.description.trim()
            },
            {new:true}
        );

        res.json({
            message:"Category updated",
            category
        });
    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }
};

//Delete Category

exports.deleteCategory = async(req,res) => {
    try {
        await 
        Category.findByIdAndDelete(req.params.id);

        res.json({
            message:"Category deleted"
        });
    } catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};