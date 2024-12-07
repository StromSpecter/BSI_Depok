const fs = require("fs");
const path = require("path");
const { News } = require("../models");

const updateNewsMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    const news = await News.findByPk(id);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    const newImage = req.files.image?.[0]?.filename || null;

    const uploadDir = path.join(__dirname, "../uploads");

    // Hapus file lama jika ada file baru yang berbeda
    if (newImage && newImage !== news.image) {
      if (news.image) {
        const oldImagePath = path.join(uploadDir, news.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      news.image = newImage; // Update nama file baru
    }

    await news.save();

    next(); // Lanjutkan ke fungsi berikutnya
  } catch (error) {
    console.error("Error in updateNewsMiddleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateNewsMiddleware;
