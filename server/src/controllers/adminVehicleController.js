const Vehicle = require('../models/Vehicle');

exports.getVehicles = async (req, res) => {
  try {
    const { category, availability, activeOnly } = req.query;
    const query = {};

    if (category && category !== 'all') {
      query.category = category;
    }
    if (availability && availability !== 'all') {
      query.availabilityStatus = availability;
    }
    if (activeOnly === 'true') {
      query.isActive = true;
    }

    const vehicles = await Vehicle.find(query).populate('assignedDriver').sort({ createdAt: -1 });
    return res.status(200).json({ success: true, vehicles });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate('assignedDriver');
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found.' });
    }
    return res.status(200).json({ success: true, vehicle });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    return res.status(201).json({ success: true, vehicle });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found.' });
    }
    return res.status(200).json({ success: true, vehicle });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateVehicleStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { availabilityStatus: status },
      { new: true }
    );
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found.' });
    }
    return res.status(200).json({ success: true, vehicle });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found.' });
    }
    return res.status(200).json({ success: true, message: 'Vehicle deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
