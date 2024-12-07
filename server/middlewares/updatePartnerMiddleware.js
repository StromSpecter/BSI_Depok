const fs = require("fs");
const path = require("path");
const { Partner } = require("../models");

const updatePartnerMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    const partner = await Partner.findByPk(id);

    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    const newImage = req.files.image?.[0]?.filename || null;

    const uploadDir = path.join(__dirname, "../uploads");

    // Hapus file lama jika ada file baru yang berbeda
    if (newImage && newImage !== partner.image) {
      if (partner.image) {
        const oldImagePath = path.join(uploadDir, partner.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      partner.image = newImage; // Update nama file baru
    }

    await partner.save();

    next(); // Lanjutkan ke fungsi berikutnya
  } catch (error) {
    console.error("Error in updatePartnerMiddleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updatePartnerMiddleware;
