const { Kemitraan } = require("../models");

exports.getKemitraan = async (req, res) => {
  try {
    const kemitraan = await Kemitraan.findAll();
    res.status(200).json(kemitraan);
  } catch (error) {
    res
      .status(500)
      .json({ massage: "Error fetching kemitraan", error: error.message });
  }
};

exports.getKemitraanById = async (req, res) => {
  try {
    const { id } = req.params;
    const kemitraan = await Kemitraan.findByPk(id);

    if (!kemitraan) {
      return res.status(404).json({ message: "Kemitraan not found" });
    }

    res.status(200).json(kemitraan);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching kemitraan", error: error.message });
  }
};

exports.createKemitraan = async (req, res) => {
  try {
    const { title, jumlah } = req.body;

    // Ambil nama file dari req.files
    const icon = req.files.icon?.[0]?.filename || null;

    const newKemitraan = await Kemitraan.create({ title, icon, jumlah });
    res.status(201).json(newKemitraan);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating kemitraan", error: error.message });
  }
};

exports.updateKemitraan = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, icon, jumlah } = req.body;

    const kemitraan = await Kemitraan.findByPk(id);

    if (!kemitraan) {
      return res.status(404).json({ message: "Kemitraan not found" });
    }

    kemitraan.title = title;
    kemitraan.icon = icon;
    kemitraan.jumlah = jumlah;

    await kemitraan.save();

    res.status(200).json(kemitraan);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating kemitraan", error: error.message });
  }
};

exports.deleteKemitraan = async (req, res) => {
  try {
    const { id } = req.params;
    const kemitraan = await Kemitraan.findByPk(id);

    if (!kemitraan) {
      return res.status(404).json({ message: "Kemitraan not found" });
    }

    await kemitraan.destroy();

    res.status(200).json({ message: "Kemitraan deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting kemitraan", error: error.message });
  }
};
