const Booking = require('../models/Booking');
const Customer = require('../models/Customer');

exports.getBookings = async (req, res) => {
  try {
    const {
      search,
      tripType,
      status,
      startDate,
      endDate,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc',
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { bookingReference: { $regex: search, $options: 'i' } },
        { fullName: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
        { pickupLocation: { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } },
      ];
    }

    if (tripType && tripType !== 'all') {
      query.tripType = tripType;
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    if (startDate || endDate) {
      query.travelDate = {};
      if (startDate) query.travelDate.$gte = new Date(startDate);
      if (endDate) query.travelDate.$lte = new Date(endDate);
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;
    const sortOptions = { [sortBy]: order === 'asc' ? 1 : -1 };

    const total = await Booking.countDocuments(query);
    const bookings = await Booking.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum)
      .lean();

    return res.status(200).json({
      success: true,
      bookings,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        limit: limitNum,
      },
    });
  } catch (error) {
    console.error('getBookings error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('assignedVehicle')
      .populate('assignedDriver')
      .populate('packageId');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    return res.status(200).json({ success: true, booking });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    const booking = await Booking.create(bookingData);

    // Auto-upsert customer record
    if (booking.phoneNumber && booking.fullName) {
      await Customer.findOneAndUpdate(
        { phoneNumber: booking.phoneNumber.trim() },
        {
          $set: {
            name: booking.fullName.trim(),
            email: booking.email || '',
            lastTripDate: booking.travelDate || new Date(),
          },
          $inc: { totalBookings: 1 },
        },
        { upsert: true, new: true }
      );
    }

    return res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error('createBooking error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const booking = await Booking.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    return res.status(200).json({ success: true, booking });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }
    return res.status(200).json({ success: true, message: 'Booking deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.exportBookingsCsv = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).lean();

    const header = 'Booking ID,Customer,Phone,Trip Type,Pickup,Destination,Travel Date,Vehicle,Status,Estimated Fare,Final Fare,Created At\n';
    const rows = bookings.map((b) => {
      const travelDateStr = b.travelDate ? new Date(b.travelDate).toISOString().split('T')[0] : '';
      const createdAtStr = b.createdAt ? new Date(b.createdAt).toISOString().split('T')[0] : '';
      return `"${b.bookingReference || ''}","${(b.fullName || '').replace(/"/g, '""')}","${b.phoneNumber || ''}","${b.tripType || ''}","${(b.pickupLocation || '').replace(/"/g, '""')}","${(b.destination || '').replace(/"/g, '""')}","${travelDateStr}","${b.preferredVehicle || ''}","${b.status || ''}","${b.estimatedFare || 0}","${b.finalFare || 0}","${createdAtStr}"`;
    }).join('\n');

    res.header('Content-Type', 'text/csv');
    res.attachment('skb_bookings_export.csv');
    return res.send(header + rows);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
