const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Driver name is required'],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    alternateNumber: {
      type: String,
      default: '',
    },
    licenceNumber: {
      type: String,
      required: [true, 'Licence number is required'],
      trim: true,
      uppercase: true,
    },
    licenceExpiryDate: {
      type: Date,
      required: [true, 'Licence expiry date is required'],
    },
    assignedVehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      default: null,
    },
    assignedVehicleName: {
      type: String,
      default: '',
    },
    availabilityStatus: {
      type: String,
      enum: ['available', 'on_duty', 'off_duty', 'on_leave'],
      default: 'available',
    },
    experienceYears: {
      type: Number,
      default: 5,
    },
    address: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Driver', driverSchema);
