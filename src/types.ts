export interface Spot {
  id: string;
  name: string;
  tagline: string;
  description: string;
  safetyLevel: 'Safe' | 'Caution' | 'Danger';
  activityStatus: 'Open' | 'Restricted' | 'Closed';
  crowdLevel: 'Low' | 'Moderate' | 'High';
  mustTry: string;
  x: number; // Percent coordinates for SVG map positioning
  y: number;
}

export interface RideOption {
  id: string;
  name: string;
  duration: string; // e.g. "1.5 Hours"
  pricePerCoracle: number; // in INR
  capacity: number; // Max persons per coracle (usually 4 or 5 by Govt regulations)
  route: string[];
  description: string;
  features: string[];
}

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  bookingDate: string;
  timeSlot: string;
  rideOptionId: string;
  numCoracles: number;
  numGuests: number;
  addOnMassage: boolean;
  addOnFishFry: boolean;
  addOnLocalGuide: boolean;
  assignedBoatmanId: string;
  totalPrice: number;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
}

export interface Boatman {
  id: string;
  name: string;
  experienceYears: number;
  languages: string[];
  rating: number;
  reviewsCount: number;
  village: string;
  badge: 'Gold Sailor' | 'Deep Waters Expert' | 'Heritage Oarsman' | 'Local Legend';
  avatarUrl: string;
  photoPrompt?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  source: string; // e.g. 'Tripadvisor', 'Google Maps', 'Direct Booking'
  rideType?: string;
}

export interface WaterLevelMetrics {
  dischargeCusecs: number; // Live flow rate from Mettur/Kababini dams
  trend: 'Rising' | 'Steady' | 'Falling';
  status: 'Safe' | 'Moderate Flooding' | 'High Flow - Boating Suspended';
  boatingPermitted: boolean;
  bathingPermitted: boolean;
  lastUpdated: string;
}

export interface PackingItem {
  id: string;
  task: string;
  category: 'Safety' | 'Clothing' | 'Electronics' | 'Documents';
  completed: boolean;
  mandatory: boolean;
}
