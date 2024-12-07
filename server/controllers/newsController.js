const { News } = require("../models");

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.findAll();
    res.status(200).json(news);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching news", error: error.message });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByPk(id);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).json(news);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching news", error: error.message });
  }
};

exports.createNews = async (req, res) => {
  try {
    const { title, description, path, category } = req.body;

    // Ambil nama file dari req.files
    const image = req.files.image?.[0]?.filename || null;

    const newNews = await News.create({ title, description, path, image, category });
    res.status(201).json(newNews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating news", error: error.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, path, category, image } = req.body;
    const news = await News.findByPk(id);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    news.title = title;
    news.description = description;
    news.path = path;
    news.image = image;
    news.category = category;

    await news.save();

    res.status(200).json(news);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating news", error: error.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByPk(id);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    await news.destroy();

    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting news", error: error.message });
  }
};
