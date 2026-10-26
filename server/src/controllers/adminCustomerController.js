const Customer = require('../models/Customer');
const Booking = require('../models/Booking');
const Enquiry = require('../models/Enquiry');

exports.getCustomers = async (req, res) => {
  try {
    const { search, page = 1, limit = 15 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Customer.countDocuments(query);
    const customers = await Customer.find(query)
      .sort({ updatedAt: -1, totalBookings: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    return res.status(200).json({
      success: true,
      customers,
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

exports.getCustomerDetails = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found.' });
    }

    const bookings = await Booking.find({ phoneNumber: customer.phoneNumber }).sort({ createdAt: -1 });
    const enquiries = await Enquiry.find({ phoneNumber: customer.phoneNumber }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      customer,
      bookings,
      enquiries,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found.' });
    }
    return res.status(200).json({ success: true, customer });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.exportCustomersCsv = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ totalBookings: -1 }).lean();

    const header = 'Name,Phone,Email,Total Bookings,Last Trip Date,VIP,Notes\n';
    const rows = customers.map((c) => {
      const lastTrip = c.lastTripDate ? new Date(c.lastTripDate).toISOString().split('T')[0] : '';
      return `"${(c.name || '').replace(/"/g, '""')}","${c.phoneNumber || ''}","${c.email || ''}","${c.totalBookings || 0}","${lastTrip}","${c.isVip ? 'Yes' : 'No'}","${(c.notes || '').replace(/"/g, '""')}"`;
    }).join('\n');

    res.header('Content-Type', 'text/csv');
    res.attachment('skb_customers_export.csv');
    return res.send(header + rows);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
