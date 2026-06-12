import { Spot, RideOption, Boatman, Review, WaterLevelMetrics, PackingItem } from './types';

export const HOGENAKKAL_SPOTS: Spot[] = [
  {
    id: 'main-falls',
    name: 'Main Cascades (Hogenakkal Falls)',
    tagline: 'The Niagara of India',
    description: 'The spectacular primary vertical drop where the Kaveri river crashes into the deep canyon, creating a mist resembling smoke. This is where the name Hogenakkal comes from ("Smoky Rocks" in Kannada).',
    safetyLevel: 'Caution',
    activityStatus: 'Open',
    crowdLevel: 'High',
    mustTry: 'Enjoy the misty cool spray from your coracle as you approach the basin.',
    x: 48,
    y: 35
  },
  {
    id: 'cine-falls',
    name: 'Cine Falls Cascade',
    tagline: 'Scenic backdrop for cinematic marvels',
    description: 'A beautiful wide secondary waterfall where dozens of iconic Indian films were shot. The waters glide smoothly over step-shaped carbonite formations.',
    safetyLevel: 'Safe',
    activityStatus: 'Open',
    crowdLevel: 'Moderate',
    mustTry: 'Capture slow-motion water videos right from the coracle bow.',
    x: 62,
    y: 44
  },
  {
    id: 'carbonite-gorge',
    name: 'The Carbonite Gorges',
    tagline: 'Ancient pre-Cambrian rock canyons',
    description: 'A narrow, majestic deep river canyon bordered by high, black carbonatite rocks that are over 2 billion years old. Some of the oldest rock structures on planet earth.',
    safetyLevel: 'Caution',
    activityStatus: 'Open',
    crowdLevel: 'Moderate',
    mustTry: 'Look straight up into the narrow sky sliver as your oarsman spins the coracle.',
    x: 35,
    y: 58
  },
  {
    id: 'hanging-bridge',
    name: 'Hogenakkal Suspension Bridge',
    tagline: 'Panoramas from the canopy',
    description: 'A long pedestrian suspension bridge maintained by the forest department offering a spectacular bird\'s eye view of the entire step-falls canyon structure.',
    safetyLevel: 'Safe',
    activityStatus: 'Open',
    crowdLevel: 'High',
    mustTry: 'Perfect overhead spot to take photographs of incoming coracles.',
    x: 52,
    y: 18
  },
  {
    id: 'oil-massage-pavilion',
    name: 'Traditional Massage Pavilion',
    tagline: 'Ancient therapeutic hand strokes',
    description: 'Traditional male oil massagers (Malis) utilize indigenous forest herb oils and rigorous therapeutic pressure massages on the rocky shelves.',
    safetyLevel: 'Safe',
    activityStatus: 'Open',
    crowdLevel: 'Moderate',
    mustTry: 'Traditional oil massage done on river rocks followed by a natural high-pressure waterfall shower.',
    x: 74,
    y: 55
  },
  {
    id: 'sandy-beach-stalls',
    name: 'Sandy Beach & Fried Fish Bazaar',
    tagline: 'Freshly-caught Kaveri river feast',
    description: 'A wide sandbank flat where the river slows down. Local fisherwomen fry fresh river fish caught in traditional round nets with spicy red masala.',
    safetyLevel: 'Safe',
    activityStatus: 'Open',
    crowdLevel: 'High',
    mustTry: 'Savor spiced Catla or Rohu fish with lemon right after your river bath.',
    x: 25,
    y: 78
  }
];

export const CORACLE_RIDES: RideOption[] = [
  {
    id: 'canyon-classic',
    name: 'Carbonite Canyon & Cine Falls Voyage',
    duration: '1.5 Hours',
    pricePerCoracle: 1500, // INR Government regulated base price
    capacity: 4,
    route: ['Main Cascades', 'Cine Falls', 'Hanging Bridge View', 'Sandpit Shore'],
    description: 'The classic iconic Hogenakkal coracle experience. Glides close to the step falls, passes the majestic gorge, and docks temporarily at the sandy shore. Highly recommended for first-timers.',
    features: ['Approaches Main Cascade spray', 'Oarsman spins coracle on request', 'Government regulated lifelests included', 'Stop at oil massage islet allowed']
  },
  {
    id: 'wilderness-expedition',
    name: 'Deep-Gorge River Safari',
    duration: '2.5 Hours',
    pricePerCoracle: 2500,
    capacity: 4,
    route: ['Main Cascades', 'Cine Falls', 'Deep Carbonite Gorge', 'Oil Massage Pavilion', 'Silent Pool Downstream', 'Fishermen Cove'],
    description: 'An extended deep river exploration heading into the narrow rocky channels towards the downstream Kaveri basin. Includes pristine secluded locations untouched by typical day-tripper crowds.',
    features: ['Goes 2km deeper into carbonite gorges', 'Guided history of 2-billion-year rocks', 'Secluded swimming-safe pools stop', 'Excellent bird-watching of river eagles']
  },
  {
    id: 'quick-spray-loop',
    name: 'Express Spray Loop',
    duration: '45 Minutes',
    pricePerCoracle: 950,
    capacity: 4,
    route: ['Main Cascades Basin', 'Hanging Bridge View', 'Boarding Islet'],
    description: 'Perfect for travelers tight on time or families with elderly members. Enters the mist pool near the main falls for a thrilling spray session and returns directly.',
    features: ['Quick adrenaline kick', 'Budget-friendly government rate', '100% time spent on core rapids']
  }
];

export const VERIFIED_BOATMEN: Boatman[] = [
  {
    id: 'boatman-murugan',
    name: 'Murugan "Oar-Master" Swamy',
    experienceYears: 18,
    languages: ['Tamil', 'Kannada', 'Hindi-basic'],
    rating: 4.9,
    reviewsCount: 142,
    village: 'Oottamalai Riverbed',
    badge: 'Local Legend',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    photoPrompt: 'weathered Tamil fisherman smiling warm portrait, background Kaveri river coracle'
  },
  {
    id: 'boatman-madhesh',
    name: 'Madhesh Gounder',
    experienceYears: 24,
    languages: ['Tamil', 'English-conversational', 'Telugu-basic'],
    rating: 5.0,
    reviewsCount: 88,
    badge: 'Heritage Oarsman',
    village: 'Hogenakkal Village',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    photoPrompt: 'senior Indian man oarsman on a riverbank with traditional basket coracle boat'
  },
  {
    id: 'boatman-kumaran',
    name: 'Kumaran Chinnathambi',
    experienceYears: 12,
    languages: ['Tamil', 'Kannada', 'Malayalam'],
    rating: 4.8,
    reviewsCount: 115,
    badge: 'Deep Waters Expert',
    village: 'Pennagaram Shore',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
    photoPrompt: 'energetic young Indian fisherman wearing orange lifejacket smiling'
  },
  {
    id: 'boatman-selvam',
    name: 'Rajendran Selvam',
    experienceYears: 9,
    languages: ['Tamil', 'English-basic', 'Hindi'],
    rating: 4.7,
    reviewsCount: 64,
    badge: 'Gold Sailor',
    village: 'Oottamalai Riverbed',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    photoPrompt: 'friendly south Indian guide standing beside a green forest river'
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    userName: 'Vijay Krishna (Bangalore)',
    rating: 5,
    date: '2026-05-18',
    comment: 'An absolutely magical experience! The coracle boatmen are highly skilled. Madhesh spin our boat in the middle of the canyon spray and it was thrilling. The fresh fish fry on the beach afterwards was spicy and delicious.',
    source: 'Google Maps',
    rideType: 'Carbonite Canyon Voyage'
  },
  {
    id: 'r2',
    userName: 'Ananya S. (Chennai)',
    rating: 4,
    date: '2026-04-29',
    comment: 'We visited in October. Flow rates were high. We paid 3000 total (1500 government ticket rate and 1500 extra to the oarsman for taking us down the narrow gorge path which is optional but totally worth it. The rocks are spectacular!)',
    source: 'Tripadvisor',
    rideType: 'Deep-Gorge River Safari'
  },
  {
    id: 'r3',
    userName: 'David Miller (London)',
    rating: 5,
    date: '2026-05-02',
    comment: 'As a foreign traveler, I was astonished by the geological formations here. The carbonatite rocks are over 2 billion years old! The boat rides are secure, life jackets strictly enforced. Beautiful bird sightings in the gorge.',
    source: 'Tripadvisor',
    rideType: 'Carbonite Canyon Voyage'
  },
  {
    id: 'r4',
    userName: 'Rahul Deshmukh (Pune)',
    rating: 5,
    date: '2026-06-05',
    comment: 'Very professional. The ticketing center is well-run. Make sure to check the water flow rates online first as heavy rain discharge from dams can suspend boating. Fortunately today was safe and standard!',
    source: 'Direct Booking',
    rideType: 'Express Spray Loop'
  }
];

export const INITIAL_PACKING_ITEMS: PackingItem[] = [
  { id: 'p1', task: 'Valid Government Government ID (Required for ticketing registration)', category: 'Documents', completed: false, mandatory: true },
  { id: 'p2', task: 'Spare clothing set (You WILL get wet from the waterfall mist & spray!)', category: 'Clothing', completed: false, mandatory: true },
  { id: 'p3', task: 'Waterproof bag/cover for phones, cameras, & metallic keys', category: 'Electronics', completed: false, mandatory: true },
  { id: 'p4', task: 'Non-slip water shoes or floaters (Wet rocks near sandbox are slippery)', category: 'Clothing', completed: false, mandatory: false },
  { id: 'p5', task: 'Quick-dry towel and hair comb', category: 'Clothing', completed: false, mandatory: false },
  { id: 'p6', task: 'Cash in INR (Many fish-fry stalls and massage Malis do not accept cards)', category: 'Documents', completed: false, mandatory: true },
  { id: 'p7', task: 'Refillable eco-water bottles (Help keep the Kaveri river plastic-free)', category: 'Safety', completed: false, mandatory: false }
];

export const FAQS = [
  {
    question: 'How do I know if boating is active and allowed today?',
    answer: 'Hogenakkal boating safety depends directly on the water discharge from the Mettur and Kabini dams upstream. If discharge exceeds 12,000 cusecs, the District Administration temporary suspends boating for tourist safety. Always check our Water Safety status and flow level alerts on this portal before scheduling your commute!'
  },
  {
    question: 'How much does a coracle ride cost officially?',
    answer: 'The official ticket price set by the Tamil Nadu government is ₹1,500 per coracle (fits up to 4 guests). This includes lifejackets. It is customary to pay a tip to the oarsman if you request extra duration or deep-gorge extensions.'
  },
  {
    question: 'Are there age limits or safety restrictions?',
    answer: 'Children under 5 years and elderly individuals over 75 are cautioned during high-water discharge periods. Safe life jackets are absolutely mandatory for all passengers during the entire duration of the boat ride, without exceptions.'
  },
  {
    question: 'What is the best season to visit Hogenakkal?',
    answer: 'The best time is right after the monsoon, from September to February. The waterfalls are in full cascade, the heat is moderate, and river flow rates stabilized around a safe 4,000–8,000 cusecs.'
  },
  {
    question: 'How do traditional oil massages work there?',
    answer: 'Hogenakkal is legendary for its traditional oil massage practitioners (Malis). They use specialized herbal mixes, dynamic hand-hammering strokes, and bone-cracking techniques on rocky river berths. Standard massage takes 30-40 minutes and usually costs ₹200-₹400, followed by a warm bath under water sprays.'
  }
];

export const TRAVEL_ROUTES = [
  {
    from: 'Bangalore (Bengaluru)',
    distance: '130 km',
    duration: '3.5 Hours',
    route: 'Bangalore ➔ Hosur ➔ Rayakottai ➔ Palacode ➔ Pennagaram ➔ Hogenakkal',
    mode: 'Best by private car/SUV or KSRTC/SETC buses. Beautiful canopy drives post-Pennagaram.'
  },
  {
    from: 'Salem',
    distance: '85 km',
    duration: '2.0 Hours',
    route: 'Salem ➔ Mecheri ➔ Dharmapuri ➔ Pennagaram ➔ Hogenakkal',
    mode: 'Excellent roads. Convenient direct rural link buses leave from Salem Central Bus Stand every hour.'
  },
  {
    from: 'Chennai',
    distance: '340 km',
    duration: '7.0 Hours',
    route: 'Chennai ➔ Kanchipuram ➔ Vellore ➔ Krishnagiri ➔ Dharmapuri ➔ Pennagaram ➔ Hogenakkal',
    mode: 'Take the national highway (NH48). Overnight trains are available from Central to Dharmapuri station.'
  }
];

export const INITIAL_WEATHER_INFO: WaterLevelMetrics = {
  dischargeCusecs: 6420,
  trend: 'Steady',
  status: 'Safe',
  boatingPermitted: true,
  bathingPermitted: true,
  lastUpdated: 'Updated 15 mins ago (Source: Mettur Dam Control Room)'
};
