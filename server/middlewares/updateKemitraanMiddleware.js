const fs = require("fs");
const path = require("path");
const { Kemitraan } = require("../models");

const updateKemitraanMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    const kemitraan = await Kemitraan.findByPk(id);

    if (!kemitraan) {
      return res.status(404).json({ message: "Kemitraan not found" });
    }

    const newIcon = req.files.icon?.[0]?.filename || null;

    const uploadDir = path.join(__dirname, "../uploads");

    // Hapus file lama jika ada file baru yang berbeda
    if (newIcon && newIcon !== kemitraan.icon) {
      if (kemitraan.icon) {
        const oldIconPath = path.join(uploadDir, kemitraan.icon);
        if (fs.existsSync(oldIconPath)) {
          fs.unlinkSync(oldIconPath);
        }
      }
      kemitraan.icon = newIcon; // Update nama file baru
    }

    await kemitraan.save();

    next(); // Lanjutkan ke fungsi berikutnya
  } catch (error) {
    console.error("Error in updateKemitraanMiddleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateKemitraanMiddleware;
