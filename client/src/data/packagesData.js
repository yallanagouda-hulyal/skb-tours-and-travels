/**
 * Packages and Indicative Pricing Data for SKB Tour and Travels
 * Rates are subject to written confirmation by Vicky upon itinerary review.
 */

export const PACKAGES_DATA = [
  {
    id: 'local-4h',
    name: 'Local 4-Hour Package',
    category: 'City Travel',
    duration: '4 Hours',
    distance: '40 KM Included',
    indicativePrice: 1200,
    priceDisplay: '₹1,200',
    priceSubtext: 'Indicative base rate for 4 hrs / 40 km',
    isPopular: false,
    tripTypeKey: 'local_4h_40km',
    vehicleSuggestion: 'Executive Sedan 4+1',
    features: [
      '4 Hours of vehicle & driver service',
      '40 Kilometres included travel within city',
      'Additional hour: ₹150 / hr',
      'Additional kilometre: ₹13 / km',
      'Ideal for shopping trips, airport drops, and doctor visits',
    ],
    exclusions: [
      'Tolls & parking fees are separate and paid as actuals',
      'Interstate permits (if exiting state borders)',
    ],
  },
  {
    id: 'local-8h',
    name: 'Local 8-Hour Package',
    category: 'Full Day City',
    duration: '8 Hours',
    distance: '80 KM Included',
    indicativePrice: 1900,
    priceDisplay: '₹1,900',
    priceSubtext: 'Indicative base rate for 8 hrs / 80 km',
    isPopular: true,
    tripTypeKey: 'local_8h_80km',
    vehicleSuggestion: 'Sedan 4+1 or Innova Crysta',
    features: [
      '8 Full Hours dedicated vehicle & driver',
      '80 Kilometres included city itinerary',
      'Additional hour: ₹150 / hr',
      'Additional kilometre: ₹13 / km',
      'Perfect for corporate meetings, wedding visits & family day outs',
    ],
    exclusions: [
      'Parking fees and highway toll tickets are not included',
      'Night drive charges beyond package hours',
    ],
  },
  {
    id: 'outstation',
    name: 'Outstation Highway Journeys',
    category: 'Intercity & PAN India',
    duration: 'Multi-day or One-way',
    distance: 'Min 300 KM / Day',
    indicativePrice: 13,
    priceDisplay: '₹13 / KM',
    priceSubtext: 'Indicative starting rate per kilometre',
    isPopular: true,
    tripTypeKey: 'outstation_round',
    vehicleSuggestion: 'Innova Crysta / Force Traveller',
    features: [
      'Indicative billing rate of ₹13/km',
      'Minimum average billing distance: 300 km per calendar day',
      'Available for one-way drops & round-trip tours',
      'PAN India travel enquiries accepted',
      'Experienced highway drivers with route familiarity',
    ],
    exclusions: [
      'Driver night allowance: ₹400 / night (where applicable, subject to confirmation)',
      'Toll gates, state entry tax & parking charges are separate',
    ],
  },
  {
    id: 'airport-transfer',
    name: 'Airport Pickup & Drop',
    category: 'Airport Special',
    duration: 'Point-to-Point',
    distance: 'Exact Route Distance',
    indicativePrice: 21,
    priceDisplay: '₹21 / KM',
    priceSubtext: 'Indicative route calculation rate',
    isPopular: false,
    tripTypeKey: 'airport_transfer',
    vehicleSuggestion: 'Sedan 4+1 / Innova Crysta',
    features: [
      'Indicative route calculation of ₹21/km',
      'Flight tracking & scheduled arrival pickup',
      'Serving all Kempegowda International Airport (BLR) terminals',
      'Dedicated luggage assistance from airport parking',
      'Final fare confirmed based on exact pickup point, drop location & route',
    ],
    exclusions: [
      'Airport toll road charges & terminal parking fees are separate',
      'Late night or early morning timings subject to route confirmation',
    ],
  },
];

export const PRICING_CONDITIONS = [
  {
    title: 'Tolls & Parking are Separate',
    description: 'All highway toll booth charges, airport toll plaza fees, and parking charges are not included in the indicative rates and must be paid as actuals.',
  },
  {
    title: 'Written Fare Confirmation',
    description: 'Rates shown on the website are indicative guidelines. The exact binding fare will be confirmed directly by Vicky via WhatsApp or phone before your journey commences.',
  },
  {
    title: 'Outstation Daily Minimum Calculation',
    description: 'For outstation round trips, a minimum average billing of 300 kilometres per calendar day applies. Driver night allowance is ₹400 where applicable.',
  },
  {
    title: 'Transparent Pricing Guarantee',
    description: 'We do not hide extra charges in small print. Route conditions, vehicle class, luggage space, and timing details are clarified upfront before departure.',
  },
];
