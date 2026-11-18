const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const authRoutes = require("./routes/authRoutes.js");
const adminRoutes = require("./routes/admin.js");
const userRoutes = require("./routes/user.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const productRoutes = require("./routes/product.js");
const uploadRoutes = require("./routes/upload.js");

const cartRoutes = require("./routes/cartRoutes.js");

const coupoonRoutes = require("./routes/couponRoutes.js");

const reviewRoutes = require("./routes/reviewRoutes.js");

const chatRoutes = require("./routes/chatRoutes.js");

const orderRoutes = require("./routes/orderRoutes.js");
const bannerRoutes = require("./routes/bannerRoutes.js");

const {
    notFound,
    errorHandler,
} = require("./middleware/errorMiddleware");
dotenv.config();



const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));
app.use(express.json());

app.use("/uploads",
    express.static(path.join(__dirname,"uploads"))
);

app.use("/api/auth",authRoutes);

app.use("/api/admin",adminRoutes);

app.use("/api/user", userRoutes);

app.use("/api/category",categoryRoutes);

app.use("/api/product",productRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/coupons", coupoonRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/banner", bannerRoutes);

// app.get("/",(req, res) => {
//     res.send("API Running...");
// });

// const PORT = process.env.PORT || 5000;

// connectDB();

// app.listen(PORT, () => {
//     console.log(`server running on port ${PORT}`);
// });

app.get("/", (req, res) => {
    res.send("API Running...");
});

// Unknown routes
app.use(notFound);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});