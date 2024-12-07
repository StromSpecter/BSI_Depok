const { Testimoni } = require("../models");

exports.getAllTestimoni = async (req, res) => {
  try {
    const testimoni = await Testimoni.findAll();
    res.status(200).json(testimoni);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching testimoni", error: error.message });
  }
};

exports.getTestimoniById = async (req, res) => {
  try {
    const { id } = req.params;
    const testimoni = await Testimoni.findByPk(id);

    if (!testimoni) {
      return res.status(404).json({ message: "Testimoni not found" });
    }

    res.status(200).json(testimoni);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching testimoni", error: error.message });
  }
};

exports.createTestimoni = async (req, res) => {
  try {
    const { name, instansi, description, star } = req.body;
    const newTestimoni = await Testimoni.create({
      name,
      instansi,
      description,
      star,
    });
    res.status(201).json(newTestimoni);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating testimoni", error: error.message });
  }
};

exports.updateTestimoni = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, instansi, description, star } = req.body;
    const testimoni = await Testimoni.findByPk(id);

    if (!testimoni) {
      return res.status(404).json({ message: "Testimoni not found" });
    }

    testimoni.name = name;
    testimoni.instansi = instansi;
    testimoni.description = description;
    testimoni.star = star;

    await testimoni.save();

    res.status(200).json(testimoni);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating testimoni", error: error.message });
  }
};

exports.deleteTestimoni = async (req, res) => {
  try {
    const { id } = req.params;
    const testimoni = await Testimoni.findByPk(id);

    if (!testimoni) {
      return res.status(404).json({ message: "Testimoni not found" });
    }

    await testimoni.destroy();

    res.status(200).json({ message: "Testimoni deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting testimoni", error: error.message });
  }
};
