const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Mendapatkan semua pengguna
router.get("/", authMiddleware.verifyToken, userController.getAllUsers);

// Mendapatkan pengguna berdasarkan ID
router.get("/:id", authMiddleware.verifyToken, userController.getUserById);

// Memperbarui pengguna berdasarkan ID
router.put("/:id", authMiddleware.verifyToken, userController.updateUser);

// Menghapus pengguna berdasarkan ID
router.delete("/:id", authMiddleware.verifyToken, userController.deleteUser);

module.exports = router;
