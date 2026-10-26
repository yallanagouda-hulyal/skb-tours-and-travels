const Driver = require('../models/Driver');

exports.getDrivers = async (req, res) => {
  try {
    const { search, availability } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
        { licenceNumber: { $regex: search, $options: 'i' } },
      ];
    }

    if (availability && availability !== 'all') {
      query.availabilityStatus = availability;
    }

    const drivers = await Driver.find(query).populate('assignedVehicle').sort({ createdAt: -1 });
    return res.status(200).json({ success: true, drivers });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).populate('assignedVehicle');
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found.' });
    }
    return res.status(200).json({ success: true, driver });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.createDriver = async (req, res) => {
  try {
    const driver = await Driver.create(req.body);
    return res.status(201).json({ success: true, driver });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found.' });
    }
    return res.status(200).json({ success: true, driver });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found.' });
    }
    return res.status(200).json({ success: true, message: 'Driver deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
