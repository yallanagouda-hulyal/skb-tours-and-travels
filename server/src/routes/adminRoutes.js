const express = require('express');
const router = express.Router();
const { protectAdmin, authorizeRoles } = require('../middleware/authMiddleware');

// Controllers
const authController = require('../controllers/adminAuthController');
const dashboardController = require('../controllers/adminDashboardController');
const bookingController = require('../controllers/adminBookingController');
const enquiryController = require('../controllers/adminEnquiryController');
const packageController = require('../controllers/adminPackageController');
const vehicleController = require('../controllers/adminVehicleController');
const driverController = require('../controllers/adminDriverController');
const customerController = require('../controllers/adminCustomerController');
const reviewController = require('../controllers/adminReviewController');
const galleryController = require('../controllers/adminGalleryController');
const offerController = require('../controllers/adminOfferController');
const reportsController = require('../controllers/adminReportsController');
const settingsController = require('../controllers/adminSettingsController');
const seedController = require('../controllers/seedController');

// 1. Auth & Seeding (Unprotected / Setup)
router.post('/auth/login', authController.loginAdmin);
router.post('/auth/register', authController.registerAdmin);
router.post('/auth/seed', seedController.seedDatabase);
router.get('/seed', seedController.seedDatabase); // convenient GET for quick bootstrap

// Protected Routes below this line
router.use(protectAdmin);

// Auth Me
router.get('/auth/me', authController.getMe);

// Admin Users (Super Admin only)
router.get('/users', authorizeRoles('super_admin'), authController.getUsers);
router.post('/users', authorizeRoles('super_admin'), authController.createUser);
router.put('/users/:id', authorizeRoles('super_admin'), authController.updateUser);
router.delete('/users/:id', authorizeRoles('super_admin'), authController.deleteUser);

// Dashboard
router.get('/dashboard/stats', dashboardController.getDashboardStats);
router.get('/dashboard/overview', dashboardController.getDashboardOverview);

// Bookings
router.get('/bookings', bookingController.getBookings);
router.get('/bookings/export/csv', bookingController.exportBookingsCsv);
router.get('/bookings/:id', bookingController.getBookingById);
router.post('/bookings', bookingController.createBooking);
router.put('/bookings/:id', bookingController.updateBooking);
router.delete('/bookings/:id', authorizeRoles('super_admin', 'booking_manager'), bookingController.deleteBooking);

// Enquiries
router.get('/enquiries', enquiryController.getEnquiries);
router.get('/enquiries/:id', enquiryController.getEnquiryById);
router.post('/enquiries', enquiryController.createEnquiry);
router.put('/enquiries/:id', enquiryController.updateEnquiry);
router.post('/enquiries/:id/convert', enquiryController.convertEnquiryToBooking);
router.delete('/enquiries/:id', enquiryController.deleteEnquiry);

// Packages
router.get('/packages', packageController.getPackages);
router.get('/packages/:id', packageController.getPackageById);
router.post('/packages', packageController.createPackage);
router.put('/packages/:id', packageController.updatePackage);
router.patch('/packages/:id/toggle', packageController.togglePackageActive);
router.delete('/packages/:id', packageController.deletePackage);

// Vehicles
router.get('/vehicles', vehicleController.getVehicles);
router.get('/vehicles/:id', vehicleController.getVehicleById);
router.post('/vehicles', vehicleController.createVehicle);
router.put('/vehicles/:id', vehicleController.updateVehicle);
router.patch('/vehicles/:id/status', vehicleController.updateVehicleStatus);
router.delete('/vehicles/:id', vehicleController.deleteVehicle);

// Drivers
router.get('/drivers', driverController.getDrivers);
router.get('/drivers/:id', driverController.getDriverById);
router.post('/drivers', driverController.createDriver);
router.put('/drivers/:id', driverController.updateDriver);
router.delete('/drivers/:id', driverController.deleteDriver);

// Customers
router.get('/customers', customerController.getCustomers);
router.get('/customers/export/csv', customerController.exportCustomersCsv);
router.get('/customers/:id', customerController.getCustomerDetails);
router.put('/customers/:id', customerController.updateCustomer);

// Reviews & Testimonials
router.get('/reviews', reviewController.getReviews);
router.post('/reviews', reviewController.createReview);
router.put('/reviews/:id', reviewController.updateReview);
router.delete('/reviews/:id', reviewController.deleteReview);

// Gallery
router.get('/gallery', galleryController.getGalleryImages);
router.post('/gallery', galleryController.createGalleryImage);
router.put('/gallery/:id', galleryController.updateGalleryImage);
router.delete('/gallery/:id', galleryController.deleteGalleryImage);

// Offers & Banners
router.get('/offers', offerController.getOffers);
router.post('/offers', offerController.createOffer);
router.put('/offers/:id', offerController.updateOffer);
router.delete('/offers/:id', offerController.deleteOffer);

// Reports
router.get('/reports/analytics', reportsController.getReportsAnalytics);

// Settings
router.get('/settings', settingsController.getSettings);
router.put('/settings', settingsController.updateSettings);

module.exports = router;
