const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Vehicle name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Toyota Innova Crysta', 'Sedan 4+1', 'Force Traveller', 'TT', 'Urbania', 'Other'],
      default: 'Toyota Innova Crysta',
    },
    registrationNumber: {
      type: String,
      required: [true, 'Registration number is required'],
      trim: true,
      uppercase: true,
    },
    passengerCapacity: {
      type: String,
      default: '6+1 Seater',
    },
    hasAc: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '/assets/images/card-innova.png',
    },
    availabilityStatus: {
      type: String,
      enum: ['available', 'on_trip', 'maintenance', 'inactive'],
      default: 'available',
    },
    indicativePrice: {
      type: String,
      default: 'Indicative fare upon request',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    assignedDriver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);
