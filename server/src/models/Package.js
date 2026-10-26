const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Package name is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['local', 'outstation', 'airport', 'custom'],
      default: 'local',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    duration: {
      type: String,
      default: '4 Hours',
    },
    includedDistance: {
      type: Number,
      default: 40,
    },
    basePrice: {
      type: Number,
      required: true,
      default: 1200,
    },
    additionalHourRate: {
      type: Number,
      default: 150,
    },
    additionalKmRate: {
      type: Number,
      default: 13,
    },
    minDailyKm: {
      type: Number,
      default: 300,
    },
    driverAllowance: {
      type: Number,
      default: 400,
    },
    applicableConditions: [
      {
        type: String,
      },
    ],
    isFeatured: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: '/assets/images/pkg-local-4h.jpg',
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

module.exports = mongoose.model('Package', packageSchema);
