const fs = require("fs");
const path = require("path");
const { Trash } = require("../models");

const updateTrashMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    const trash = await Trash.findByPk(id);

    if (!trash) {
      return res.status(404).json({ message: "Trash not found" });
    }

    const newImage = req.files.image?.[0]?.filename || null;

    const uploadDir = path.join(__dirname, "../uploads");

    // Hapus file lama jika ada file baru yang berbeda
    if (newImage && newImage !== trash.image) {
      if (trash.image) {
        const oldImagePath = path.join(uploadDir, trash.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      trash.image = newImage; // Update nama file baru
    }

    await trash.save();

    next(); // Lanjutkan ke fungsi berikutnya
  } catch (error) {
    console.error("Error in updateTrashMiddleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateTrashMiddleware;
