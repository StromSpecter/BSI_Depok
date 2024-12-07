const fs = require("fs");
const path = require("path");
const { Partner } = require("../models");

const deletePartnerMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    const partner = await Partner.findByPk(id);

    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    const filesToDelete = [partner.image];
    filesToDelete.forEach((file) => {
      if (file) {
        const filePath = path.join(__dirname, "../uploads", file);
        console.log("Attempting to delete file:", filePath);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log("File deleted:", filePath);
        } else {
          console.log("File does not exist:", filePath);
        }
      }
    });

    next(); // Lanjutkan ke fungsi berikutnya
  } catch (error) {
    console.error("Error in deletePartnerMiddleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = deletePartnerMiddleware;