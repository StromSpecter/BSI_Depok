const fs = require("fs");
const path = require("path");
const { Program } = require("../models");

const deleteProgramMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    const program = await Program.findByPk(id);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    const filesToDelete = [program.image1, program.image2, program.icon];
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
    console.error("Error in deleteProgramMiddleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = deleteProgramMiddleware;
