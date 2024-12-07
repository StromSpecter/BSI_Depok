const express = require("express");
const upload = require("../middlewares/uploadMiddleware");
const programController = require("../controllers/programController");
const deleteProgramMiddleware = require("../middlewares/deleteProgramMiddleware");
const updateProgramMiddleware = require("../middlewares/updateProgramMiddleware");

const router = express.Router();

// Route untuk mendapatkan semua program
router.get("/", programController.getAllPrograms);

// Route untuk mendapatkan program berdasarkan ID
router.get("/:id", programController.getProgramById);

// Route untuk membuat program baru dengan upload file
router.post(
  "/",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ]),
  programController.createProgram
);

// Route untuk mengupdate program dengan upload file
router.put(
  "/:id",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ]),
  updateProgramMiddleware,
  programController.updateProgram
);

// Route untuk menghapus program dengan middleware deleteImages
router.delete(
  "/:id",
  deleteProgramMiddleware, // Middleware untuk menghapus file
  programController.deleteProgram // Controller untuk menghapus data program
);

module.exports = router;
