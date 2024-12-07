const express = require("express");
const trashController = require("../controllers/trashConstroller");
const upload = require("../middlewares/uploadMiddleware");
const updateTrashMiddleware = require("../middlewares/updateTrashMiddleware");
const deleteTrashMiddleware = require("../middlewares/deleteTrashMiddleware");

const router = express.Router();

// Route untuk mendapatkan semua trash
router.get("/", trashController.getAllTrash);

// Route untuk mendapatkan trash berdasarkan ID
router.get("/:id", trashController.getTrashById);

// Route untuk membuat trash baru
router.post(
  "/",
  upload.fields([{ name: "image", maxCount: 1 }]),
  trashController.createTrash
);

// Route untuk mengupdate trash berdasarkan ID
router.put(
  "/:id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateTrashMiddleware,
  trashController.updateTrash
);

// Route untuk menghapus trash berdasarkan ID
router.delete(
  "/:id",
  deleteTrashMiddleware,
  trashController.deleteTrash
);

module.exports = router;
