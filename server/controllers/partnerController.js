const { Partner } = require("../models");

exports.getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.findAll();
    res.status(200).json(partners);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching partners", error: error.message });
  }
};

exports.getPartnerById = async (req, res) => {
  try {
    const { id } = req.params;
    const partner = await Partner.findByPk(id);

    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    res.status(200).json(partner);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching partner", error: error.message });
  }
};

exports.createPartner = async (req, res) => {
  try {
    const { name } = req.body;

    // Ambil nama file dari req.files
    const image = req.files.image?.[0]?.filename || null;

    const newPartner = await Partner.create({ name, image });
    res.status(201).json(newPartner);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating partner", error: error.message });
  }
};

exports.updatePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    const partner = await Partner.findByPk(id);

    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    partner.name = name;
    partner.image = image;

    await partner.save();

    res.status(200).json(partner);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating partner", error: error.message });
  }
};

exports.deletePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const partner = await Partner.findByPk(id);

    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    await partner.destroy();

    res.status(200).json({ message: "Partner deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting partner", error: error.message });
  }
};
