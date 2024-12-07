const express = require("express");
const testimoniController = require("../controllers/testimoniController");

const router = express.Router();

// Route untuk mendapatkan semua testimoni
router.get("/", testimoniController.getAllTestimoni);

// Route untuk mendapatkan testimoni berdasarkan ID
router.get("/:id", testimoniController.getTestimoniById);

// Route untuk membuat testimoni baru
router.post("/", testimoniController.createTestimoni);

// Route untuk mengupdate testimoni berdasarkan ID
router.put("/:id", testimoniController.updateTestimoni);

// Route untuk menghapus testimoni berdasarkan ID
router.delete("/:id", testimoniController.deleteTestimoni);

module.exports = router;