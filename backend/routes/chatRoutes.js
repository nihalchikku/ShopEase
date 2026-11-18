const express = require("express");
const router = express.Router();

const { chatWithAI } = require("../controllers/chatController");

const protect = require("../middleware/authMiddleware");

router.get("/test", (req,res) => {
    res.json({
        message: "Chat route working!"
    });
});

router.post("/", protect, chatWithAI);


module.exports = router;