const { Trash } = require("../models");

exports.getAllTrash = async (req, res) => {
  try {
    const trash = await Trash.findAll();
    res.status(200).json(trash);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching trash", error: error.message });
  }
};

exports.getTrashById = async (req, res) => {
  try {
    const { id } = req.params;
    const trash = await Trash.findByPk(id);

    if (!trash) {
      return res.status(404).json({ message: "Trash not found" });
    }

    res.status(200).json(trash);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching trash", error: error.message });
  }
};

exports.createTrash = async (req, res) => {
  try {
    const { title, category, amount } = req.body;

    // Ambil nama file dari req.files
    const image = req.files.image?.[0]?.filename || null;

    const newTrash = await Trash.create({ title, category, image, amount });
    res.status(201).json(newTrash);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating trash", error: error.message });
  }
};

exports.updateTrash = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, image, amount } = req.body;
    const trash = await Trash.findByPk(id);

    if (!trash) {
      return res.status(404).json({ message: "Trash not found" });
    }

    trash.title = title;
    trash.category = category;
    trash.image = image;
    trash.amount = amount;

    await trash.save();

    res.status(200).json(trash);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating trash", error: error.message });
  }
};

exports.deleteTrash = async (req, res) => {
  try {
    const { id } = req.params;
    const trash = await Trash.findByPk(id);

    if (!trash) {
      return res.status(404).json({ message: "Trash not found" });
    }

    await trash.destroy();

    res.status(200).json({ message: "Trash deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting trash", error: error.message });
  }
};
