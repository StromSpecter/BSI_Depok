const { Program } = require("../models");

// Mengambil semua program
exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.findAll();

    // Tambahkan URL untuk file
    const programsWithUrls = programs.map((program) => ({
      ...program.toJSON(),
      image1Url: program.image1
        ? `${req.protocol}://${req.get("host")}/uploads/${program.image1}`
        : null,
    }));

    res.status(200).json(programsWithUrls);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching programs",
      error: error.message,
    });
  }
};

// Mengambil program berdasarkan ID
exports.getProgramById = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await Program.findByPk(id);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    // Tambahkan URL untuk file
    res.status(200).json({
      ...program.toJSON(),
      image1Url: program.image1
        ? `${req.protocol}://${req.get("host")}/uploads/${program.image1}`
        : null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching program",
      error: error.message,
    });
  }
};

// Membuat program baru
exports.createProgram = async (req, res) => {
  try {
    const { title, path, author, date, description } = req.body;

    // Ambil nama file dari req.files
    const image1 = req.files.image1?.[0]?.filename || null;
    const image2 = req.files.image2?.[0]?.filename || null;
    const icon = req.files.icon?.[0]?.filename || null;

    const newProgram = await Program.create({
      title,
      path,
      author,
      date,
      description,
      image1,
      image2,
      icon,
    });

    res.status(201).json(newProgram);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating program", error: error.message });
  }
};

// Mengupdate program berdasarkan ID
exports.updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, path, author, date, description, image1, image2, icon } =
      req.body;

    const program = await Program.findByPk(id);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    program.title = title;
    program.path = path;
    program.author = author;
    program.date = date;
    program.description = description;
    program.image1 = image1;
    program.image2 = image2;
    program.icon = icon;

    await program.save();

    res.status(200).json(program);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating program", error: error.message });
  }
};

// Menghapus program berdasarkan ID
exports.deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await Program.findByPk(id);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    await program.destroy();

    res.status(200).json({ message: "Program deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting program", error: error.message });
  }
};
