// const mongoose = require("mongoose");

// const adminSchema = new
// mongoose.Schema({
//     name: String,
//     email: String,
//     password:{
//         type:String,
//         required:true
//     } ,
//     role: {
//         type: String,
//         default: "admin"
//     },
//     resetOtp: String,
//     resetOtpExpiry: Date,
// });

// module.exports = mongoose.model("Admin",
//     adminSchema
// );




const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: String,

    email: String,

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "admin"
    },

    resetOtp: String,

    resetOtpExpiry: Date,

    resetOtpVerified: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Admin", adminSchema);