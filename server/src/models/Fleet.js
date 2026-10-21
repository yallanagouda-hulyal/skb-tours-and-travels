const mongoose = require('mongoose');

const fleetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    verifiedCapacity: {
      type: String,
      default: 'Confirm availability',
    },
    hasConfirmedCapacity: {
      type: Boolean,
      default: false,
    },
    suitableTravelTypes: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Fleet', fleetSchema);
