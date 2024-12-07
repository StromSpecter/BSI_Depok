const fs = require("fs");
const path = require("path");
const { Kemitraan } = require("../models");

const deleteKemitraanMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    const kemitraan = await Kemitraan.findByPk(id);

    if (!kemitraan) {
      return res.status(404).json({ message: "Kemitraan not found" });
    }

    const filesToDelete = [kemitraan.icon];
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
    console.error("Error in deleteKemitraanMiddleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = deleteKemitraanMiddleware;
