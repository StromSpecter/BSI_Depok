const express = require("express");
const kemitraanController = require("../controllers/kemitraanController");
const upload = require("../middlewares/uploadMiddleware");
const deleteKemitraanMiddleware = require("../middlewares/deleteKemitraanMiddleware");
const updateKemitraanMiddleware = require("../middlewares/updateKemitraanMiddleware");

const router = express.Router();

// Route untuk mendapatkan semua kemitraan
router.get("/", kemitraanController.getKemitraan);

// Route untuk mendapatkan kemitraan berdasarkan ID
router.get("/:id", kemitraanController.getKemitraanById);

// Route untuk membuat kemitraan baru
router.post(
  "/",
  upload.fields([{ name: "icon", maxCount: 1 }]),
  kemitraanController.createKemitraan
);

// Route untuk mengupdate kemitraan berdasarkan ID
router.put(
  "/:id",
  upload.fields([{ name: "icon", maxCount: 1 }]),
  updateKemitraanMiddleware,
  kemitraanController.updateKemitraan
);

// Route untuk menghapus kemitraan berdasarkan ID
router.delete(
  "/:id",
  deleteKemitraanMiddleware,
  kemitraanController.deleteKemitraan
);

module.exports = router;
