const Package = require('../models/Package');

exports.getPackages = async (req, res) => {
  try {
    const { category, activeOnly } = req.query;
    const query = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    if (activeOnly === 'true') {
      query.isActive = true;
    }

    const packages = await Package.find(query).sort({ displayOrder: 1, createdAt: -1 });
    return res.status(200).json({ success: true, packages });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found.' });
    }
    return res.status(200).json({ success: true, package: pkg });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.createPackage = async (req, res) => {
  try {
    const pkg = await Package.create(req.body);
    return res.status(201).json({ success: true, package: pkg });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found.' });
    }
    return res.status(200).json({ success: true, package: pkg });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.togglePackageActive = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found.' });
    }
    pkg.isActive = !pkg.isActive;
    await pkg.save();
    return res.status(200).json({ success: true, package: pkg });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found.' });
    }
    return res.status(200).json({ success: true, message: 'Package deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
