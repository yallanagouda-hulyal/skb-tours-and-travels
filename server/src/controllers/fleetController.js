const initialFleetData = [
  {
    name: 'Toyota Innova Crysta',
    slug: 'innova-crysta',
    category: 'Premium Multi-Utility Vehicle',
    verifiedCapacity: '6+1 or 7+1 (Confirmed on request)',
    hasConfirmedCapacity: true,
    suitableTravelTypes: [
      'Airport Transfers',
      'Outstation Long Drives',
      'Family Vacations',
      'Corporate Travel',
    ],
    description:
      'The benchmark for executive comfort and long-distance durability. Ample luggage room, premium air-conditioned comfort, and spacious seating for family and business trips.',
    image: '/assets/images/hero-vehicle.jpeg',
    isFeatured: true,
    order: 1,
  },
  {
    name: 'Executive Sedan (Dzire / Etios)',
    slug: 'sedan-4-plus-1',
    category: 'Comfort Sedan (4+1)',
    verifiedCapacity: '4 Passengers + 1 Driver',
    hasConfirmedCapacity: true,
    suitableTravelTypes: [
      'Airport Pickup & Drop',
      'Local City Travel (4H/8H)',
      'One-Way Outstation Drops',
      'Couples & Solo Travel',
    ],
    description:
      'Smooth, fuel-efficient, and comfortable rides for swift city commutes, punctual airport transfers, and one-way outstation trips.',
    image: '/assets/images/fleet-vehicle-1.jpeg',
    isFeatured: true,
    order: 2,
  },
  {
    name: 'Force Traveller',
    slug: 'force-traveller',
    category: 'Large Group Mini Coach',
    verifiedCapacity: 'Confirm availability',
    hasConfirmedCapacity: false,
    suitableTravelTypes: [
      'Large Group Outstation',
      'Family Pilgrimages & Tours',
      'Corporate Team Outings',
      'Event Transfers',
    ],
    description:
      'High-roof spacious van designed for group convenience, ample aisle room, separate boot space for luggage, and comfortable long journeys across PAN India.',
    image: '/assets/images/fleet-banner.jpeg',
    isFeatured: true,
    order: 3,
  },
  {
    name: 'Tempo Traveller (TT)',
    slug: 'tempo-traveller-tt',
    category: 'Group Travel Utility',
    verifiedCapacity: 'Confirm availability',
    hasConfirmedCapacity: false,
    suitableTravelTypes: [
      'Tourist Circuit Tours',
      'Group Escapes',
      'Airport Delegations',
      'PAN India Expeditions',
    ],
    description:
      'Reliable group transporter ideal for exploring Karnataka and interstate tourist corridors. Capacity and interior seating confirmed at time of enquiry.',
    image: '/assets/images/fleet-banner.jpeg',
    isFeatured: true,
    order: 4,
  },
  {
    name: 'Luxury Urbania',
    slug: 'luxury-urbania',
    category: 'Next-Gen Luxury Van',
    verifiedCapacity: 'Confirm availability',
    hasConfirmedCapacity: false,
    suitableTravelTypes: [
      'VIP Airport Transfers',
      'Luxury Tourism Packages',
      'Executive Delegations',
      'Celebrity & Wedding Travel',
    ],
    description:
      'Aerodynamic, ultra-modern luxury van offering whisper-quiet cabin acoustics, individual reclining seating, panoramic glass windows, and uncompromised ride quality.',
    image: '/assets/images/fleet-vehicle-2.jpeg',
    isFeatured: true,
    order: 5,
  },
  {
    name: 'Custom Fleet & Special Vehicles',
    slug: 'custom-fleet',
    category: 'Special Arrangement',
    verifiedCapacity: 'Confirm availability',
    hasConfirmedCapacity: false,
    suitableTravelTypes: [
      'Custom Itineraries',
      'Multi-Day PAN India Caravans',
      'Special Occasion Travel',
    ],
    description:
      'Need a specific vehicle model or a multi-car convoy? Vicky and the SKB Tour and Travels team arrange verified vehicles on demand with transparent fare confirmation.',
    image: '/assets/images/hero-vehicle.jpeg',
    isFeatured: false,
    order: 6,
  },
];

exports.getFleet = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      fleet: initialFleetData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve fleet list.',
    });
  }
};
