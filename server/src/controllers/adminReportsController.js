const Booking = require('../models/Booking');
const Enquiry = require('../models/Enquiry');
const Vehicle = require('../models/Vehicle');
const Package = require('../models/Package');

exports.getReportsAnalytics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {};

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const bookings = await Booking.find(query).lean();
    const totalEnquiries = await Enquiry.countDocuments();
    const convertedEnquiries = await Enquiry.countDocuments({ status: 'converted' });

    // Status summary
    const statusSummary = {
      new: bookings.filter((b) => b.status === 'new').length,
      pending: bookings.filter((b) => b.status === 'pending').length,
      confirmed: bookings.filter((b) => b.status === 'confirmed').length,
      completed: bookings.filter((b) => b.status === 'completed').length,
      cancelled: bookings.filter((b) => b.status === 'cancelled').length,
    };

    // Trip type summary
    const tripTypeSummary = {
      airport_transfer: bookings.filter((b) => b.tripType === 'airport_transfer').length,
      local: bookings.filter((b) => b.tripType && b.tripType.startsWith('local')).length,
      outstation: bookings.filter((b) => b.tripType && b.tripType.startsWith('outstation')).length,
      group_travel: bookings.filter((b) => b.tripType === 'group_travel').length,
      other: bookings.filter((b) => !['airport_transfer', 'local', 'outstation', 'group_travel'].some(t => b.tripType?.includes(t))).length,
    };

    // Financial revenue calculation
    let estimatedRevenue = 0;
    let confirmedRevenue = 0;

    bookings.forEach((b) => {
      if (b.estimatedFare) estimatedRevenue += b.estimatedFare;
      if (b.finalFare && (b.status === 'confirmed' || b.status === 'completed')) {
        confirmedRevenue += b.finalFare;
      }
    });

    const conversionRate = totalEnquiries > 0
      ? Math.round((convertedEnquiries / totalEnquiries) * 100)
      : 0;

    // Vehicle usage
    const vehicles = await Vehicle.find({ isActive: true }).select('name category availabilityStatus').lean();

    return res.status(200).json({
      success: true,
      analytics: {
        totalBookings: bookings.length,
        statusSummary,
        tripTypeSummary,
        totalEnquiries,
        convertedEnquiries,
        conversionRate,
        estimatedRevenue,
        confirmedRevenue,
        vehicleFleetSummary: {
          total: vehicles.length,
          available: vehicles.filter((v) => v.availabilityStatus === 'available').length,
          onTrip: vehicles.filter((v) => v.availabilityStatus === 'on_trip').length,
          maintenance: vehicles.filter((v) => v.availabilityStatus === 'maintenance').length,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
