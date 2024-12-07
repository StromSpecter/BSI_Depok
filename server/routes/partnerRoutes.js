const express = require("express");
const partnerController = require("../controllers/partnerController");
const upload = require("../middlewares/uploadMiddleware");
const updatePartnerMiddleware = require("../middlewares/updatePartnerMiddleware");
const deletePartnerMiddleware = require("../middlewares/deletePartnerMiddleware");

const router = express.Router();

// Route untuk mendapatkan semua partner
router.get("/", partnerController.getAllPartners);

// Route untuk mendapatkan partner berdasarkan ID
router.get("/:id", partnerController.getPartnerById);

// Route untuk membuat partner baru
router.post(
  "/",
  upload.fields([{ name: "image", maxCount: 1 }]),
  partnerController.createPartner
);

// Route untuk mengupdate partner berdasarkan ID
router.put(
  "/:id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  updatePartnerMiddleware,
  partnerController.updatePartner
);

// Route untuk menghapus partner berdasarkan ID
router.delete(
  "/:id",
  deletePartnerMiddleware,
  partnerController.deletePartner
);

module.exports = router;
