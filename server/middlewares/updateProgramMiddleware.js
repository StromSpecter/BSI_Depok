const fs = require("fs");
const path = require("path");
const { Program } = require("../models");

const updateProgramMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    const program = await Program.findByPk(id);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    // Path baru dari file yang di-upload
    const newImage1 = req.files.image1?.[0]?.filename || null;
    const newImage2 = req.files.image2?.[0]?.filename || null;
    const newIcon = req.files.icon?.[0]?.filename || null;

    const uploadDir = path.join(__dirname, "../uploads");

    // Hapus file lama jika ada file baru yang berbeda
    if (newImage1 && newImage1 !== program.image1) {
      if (program.image1) {
        const oldImage1Path = path.join(uploadDir, program.image1);
        if (fs.existsSync(oldImage1Path)) {
          fs.unlinkSync(oldImage1Path);
        }
      }
      program.image1 = newImage1; // Update nama file baru
    }

    if (newImage2 && newImage2 !== program.image2) {
      if (program.image2) {
        const oldImage2Path = path.join(uploadDir, program.image2);
        if (fs.existsSync(oldImage2Path)) {
          fs.unlinkSync(oldImage2Path);
        }
      }
      program.image2 = newImage2; // Update nama file baru
    }

    if (newIcon && newIcon !== program.icon) {
      if (program.icon) {
        const oldIconPath = path.join(uploadDir, program.icon);
        if (fs.existsSync(oldIconPath)) {
          fs.unlinkSync(oldIconPath);
        }
      }
      program.icon = newIcon; // Update nama file baru
    }

    await program.save(); // Simpan perubahan ke database

    next(); // Lanjutkan ke fungsi berikutnya
  } catch (error) {
    console.error("Error in updateProgramMiddleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateProgramMiddleware;
