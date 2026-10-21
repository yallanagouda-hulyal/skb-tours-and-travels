/**
 * Fleet Data for SKB Tour and Travels
 * Prioritizes actual supplied photographs from Vicky
 */

export const FLEET_DATA = [
  {
    id: 'innova-crysta',
    name: 'Toyota Innova Crysta',
    category: 'Premium Multi-Utility Vehicle',
    image: '/assets/images/hero-vehicle.jpeg',
    badge: 'Flagship Comfort',
    verifiedCapacity: '6+1 or 7+1 (Confirmed on request)',
    hasConfirmedCapacity: true,
    suitableFor: [
      'Airport Pickup & Drop',
      'Outstation Family Vacations',
      'Corporate Delegation',
      'Hill Station Trips',
    ],
    features: [
      'Dual AC with rear climate controls',
      'Plush captain seats or bench seating',
      'Substantial boot space for luggage',
      'Smooth suspension for long highway rides',
    ],
    description:
      'The indisputable choice for comfort on Indian highways. The Innova Crysta delivers unmatched ride stability, generous legroom, and effortless luggage handling for up to 7 passengers.',
  },
  {
    id: 'sedan-4-plus-1',
    name: 'Executive Sedan (Swift Dzire / Etios)',
    category: 'Comfort Sedan (4+1)',
    image: '/assets/images/sedan-fleet.jpeg',
    badge: 'City & Airport Specialist',
    verifiedCapacity: '4 Passengers + 1 Driver',
    hasConfirmedCapacity: true,
    suitableFor: [
      'Kempegowda Airport Transfers',
      'Local City Chores (4H / 8H)',
      'One-Way Outstation Drops',
      'Individual & Couple Commutes',
    ],
    features: [
      'Chilled air conditioning',
      'Spacious boot for 2-3 standard suitcases',
      'Excellent fuel economy for budget travel',
      'Compact size for smooth city navigation',
    ],
    description:
      'Ideal for executive city commutes and punctual airport transfers. Clean, quiet, and comfortable seating for up to four passengers with dedicated boot space.',
  },
  {
    id: 'force-traveller',
    name: 'Force Traveller Mini Coach',
    category: 'Spacious Group Coach',
    image: '/assets/images/fleet-banner.jpeg',
    badge: 'Group Touring',
    verifiedCapacity: 'Confirm availability',
    hasConfirmedCapacity: false,
    suitableFor: [
      'Large Family Vacations',
      'Pilgrimage & Temple Tours',
      'Corporate Team Outings',
      'Wedding Guest Logistics',
    ],
    features: [
      'High ceiling with stand-up aisle clearance',
      'Individual AC vents and reading lights',
      'Deep separate luggage compartment',
      'Comfortable pushback seats for long drives',
    ],
    description:
      'The ultimate solution when travelling together as a larger group. Spacious cabin layout ensures every passenger travels without feeling cramped during multi-day highway itineraries.',
  },
  {
    id: 'tempo-traveller-tt',
    name: 'Tempo Traveller (TT)',
    category: 'Group Utility Van',
    image: '/assets/images/fleet-banner.jpeg',
    badge: 'Extended Tours',
    verifiedCapacity: 'Confirm availability',
    hasConfirmedCapacity: false,
    suitableFor: [
      'Interstate Sightseeing',
      'PAN India Tourist Circuits',
      'Corporate Shuttles',
      'Heritage Circuit Trips',
    ],
    features: [
      'Robust suspension built for varied terrains',
      'Audio entertainment setup',
      'Window curtains & tinted glass',
      'Configurable seating arrangements',
    ],
    description:
      'Dependable group transportation suited for exploring Karnataka and cross-border tourist locations. Seating configuration confirmed at the time of your reservation.',
  },
  {
    id: 'urbania',
    name: 'Force Luxury Urbania',
    category: 'Next-Gen Luxury Van',
    image: '/assets/images/urbania-fleet.jpeg',
    badge: 'VIP Executive Van',
    verifiedCapacity: 'Confirm availability',
    hasConfirmedCapacity: false,
    suitableFor: [
      'VIP Airport Escorts',
      'Luxury Tourism Packages',
      'High-Profile Corporate Meetings',
      'Elite Event Logistics',
    ],
    features: [
      'Ultra-refined aerodynamic van design',
      'World-class cabin noise insulation',
      'Panoramic side view windows',
      'Premium ergonomic reclining chairs',
    ],
    description:
      'Combining contemporary European styling with state-of-the-art passenger comforts. The Urbania delivers the most sophisticated group transit experience available on Indian roads today.',
  },
  {
    id: 'custom-fleet',
    name: 'Custom Fleet & Special Requirements',
    category: 'On-Demand Arrangement',
    image: '/assets/images/hero-vehicle.jpeg',
    badge: 'Custom Logistics',
    verifiedCapacity: 'Confirm availability',
    hasConfirmedCapacity: false,
    suitableFor: [
      'Multi-Vehicle Convoys',
      'PAN India Expeditions',
      'Long-term Corporate Contracts',
    ],
    features: [
      'Custom vehicle requests',
      'Dedicated point of contact with Vicky',
      'Tailored route planning & scheduling',
      'Direct WhatsApp status coordination',
    ],
    description:
      'Need an exact vehicle model or several vehicles travelling together? Contact Vicky directly to arrange verified vehicles with upfront fare confirmation.',
  },
];
