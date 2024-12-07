const express = require("express");
const newsController = require("../controllers/newsController");
const upload = require("../middlewares/uploadMiddleware");
const updateNewsMiddleware = require("../middlewares/updateNewsMiddleware");
const deleteNewsMiddleware = require("../middlewares/deleteNewsMiddleware");

const router = express.Router();

// Route untuk mendapatkan semua news
router.get("/", newsController.getAllNews);

// Route untuk mendapatkan news berdasarkan ID
router.get("/:id", newsController.getNewsById);

// Route untuk membuat news baru
router.post(
  "/",
  upload.fields([{ name: "image", maxCount: 1 }]),
  newsController.createNews
);

// Route untuk mengupdate news berdasarkan ID
router.put(
  "/:id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateNewsMiddleware,
  newsController.updateNews
);

// Route untuk menghapus news berdasarkan ID
router.delete("/:id", deleteNewsMiddleware, newsController.deleteNews);

module.exports = router;
