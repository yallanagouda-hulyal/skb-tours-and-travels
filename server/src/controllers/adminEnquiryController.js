const Enquiry = require('../models/Enquiry');
const Booking = require('../models/Booking');
const Customer = require('../models/Customer');

exports.getEnquiries = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
        { enquiryReference: { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } },
      ];
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Enquiry.countDocuments(query);
    const enquiries = await Enquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    return res.status(200).json({
      success: true,
      enquiries,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        limit: limitNum,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id).populate('convertedBookingId');
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }
    return res.status(200).json({ success: true, enquiry });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.createEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);

    if (enquiry.phoneNumber && enquiry.customerName) {
      await Customer.findOneAndUpdate(
        { phoneNumber: enquiry.phoneNumber.trim() },
        {
          $set: {
            name: enquiry.customerName.trim(),
            email: enquiry.email || '',
          },
        },
        { upsert: true, new: true }
      );
    }

    return res.status(201).json({ success: true, enquiry });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }
    return res.status(200).json({ success: true, enquiry });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.convertEnquiryToBooking = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }

    // Create a new Booking from enquiry data
    const booking = await Booking.create({
      fullName: enquiry.customerName,
      phoneNumber: enquiry.phoneNumber,
      email: enquiry.email || '',
      tripType: enquiry.tripType || 'airport_transfer',
      pickupLocation: enquiry.pickupLocation || 'Bengaluru',
      destination: enquiry.destination || 'Airport',
      travelDate: enquiry.preferredDate || new Date(),
      preferredVehicle: enquiry.preferredVehicle || 'Toyota Innova Crysta',
      additionalInstructions: enquiry.message || '',
      status: 'confirmed',
      internalNotes: `Converted from enquiry ${enquiry.enquiryReference}`,
    });

    // Mark enquiry as converted and link to booking
    enquiry.status = 'converted';
    enquiry.convertedBookingId = booking._id;
    await enquiry.save();

    return res.status(200).json({
      success: true,
      message: 'Enquiry successfully converted to booking.',
      booking,
      enquiry,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }
    return res.status(200).json({ success: true, message: 'Enquiry deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
