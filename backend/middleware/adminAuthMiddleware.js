// const jwt = require("jsonwebtoken");

// const adminProtect = (req,res,next) => {
//     let token;

//     if(
//         req.headers.authorization && req.headers.authorization.startsWith("Bearer")
//     ) {
//         token = req.headers.authorization.split(" ")
//         [1];

//         try {

//             console.log("TOKEN:",token);
//             console.log("ADMIN_JWT_SECRET:",process.env.ADMIN_JWT_SECRET);
//             const decoded = jwt.verify(token,process.env.ADMIN_JWT_SECRET);

//             req.user = decoded;
//             next();
//         } catch(error) {
//             return res.status(401).json({
//                 message:"Invalid admin token"
//             });
//         }
//     }
//     if(!token){
//         return res.status(401).json({
//             message:"No token provided",
//         });
//     }
// };

// module.exports = adminProtect;




const jwt = require("jsonwebtoken");

const adminProtect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "No admin token provided",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.ADMIN_JWT_SECRET
        );

        // Admin role check
        if (decoded.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin access denied",
            });
        }

        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired admin token",
        });
    }
};

module.exports = adminProtect;