const Banner = require("../models/Banner.js");

// Add Banner
exports.addBanner = async (req, res) => {
  try {
    const { title, description, link, isActive } = req.body;

    if (!title || !req.file) {
      return res.status(400).json({
        message: "Title and banner image are required",
      });
    }

    const banner = await Banner.create({
      title,
      description,
      image: req.file.filename,
      link,
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json({
      message: "Banner added successfully",
      banner,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Banners
exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Banner
exports.updateBanner = async (req, res) => {
  try {
    const { title, description, link, isActive } = req.body;

    const updateData = {
      title,
      description,
      link,
      isActive,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.json({
      message: "Banner updated successfully",
      banner,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Banner
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.json({ message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};