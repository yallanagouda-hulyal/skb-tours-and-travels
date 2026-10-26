const Gallery = require('../models/Gallery');

exports.getGalleryImages = async (req, res) => {
  try {
    const { category, activeOnly } = req.query;
    const query = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    if (activeOnly === 'true') {
      query.isActive = true;
    }

    const images = await Gallery.find(query).sort({ displayOrder: 1, createdAt: -1 });
    return res.status(200).json({ success: true, images });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.createGalleryImage = async (req, res) => {
  try {
    const image = await Gallery.create(req.body);
    return res.status(201).json({ success: true, image });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateGalleryImage = async (req, res) => {
  try {
    const image = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found.' });
    }
    return res.status(200).json({ success: true, image });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteGalleryImage = async (req, res) => {
  try {
    const image = await Gallery.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found.' });
    }
    return res.status(200).json({ success: true, message: 'Image deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPublicGallery = async (req, res) => {
  try {
    const images = await Gallery.find({ isActive: true }).sort({ displayOrder: 1 });
    return res.status(200).json({ success: true, images });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
