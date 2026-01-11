// types/schema.ts

export type SocialPlatform = 'instagram' | 'twitter' | 'website' | 'youtube';

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

// --- 1. USER (The Client) ---
export interface User {
  id: string;
  name: string;
  email: string;
  savedTrips: string[];    // Array of Trip IDs
  savedCreators: string[]; // Array of Creator IDs
}

// --- 2. CREATOR (The Author) ---
export interface Creator {
  id: string;
  name: string;
  handle: string; // e.g., @neville
  avatar: string; // URL
  bio: string;
  socials: SocialLink[];
  // Backend would query: SELECT * FROM Trips WHERE creator_id = this.id
}

// --- 3. TRIP (The Core Data) ---
export type ActivityType = 'travel' | 'activity' | 'food' | 'lodging' | 'chill';

export interface TripEvent {
  title: string;
  timeRange: string; // "10:00 - 12:00"
  type: ActivityType;
  location?: string;
  cost?: string;     // "₹500" - formatted string for display
  notes?: string[];
}

export interface DaySchedule {
  day: number;
  date: string;       // "Oct 12, 2025"
  summaryTitle: string; // "Arrival & Sunset"
  schedule: TripEvent[];
  images: string[];   // Gallery for this specific day
}

export interface Budget {
  item: string;
  cost: string;
}

export interface Contact {
  name: string;
  role: string;
  phone: string;
  note?: string;
}

export interface EssentialData {
  packing: string[];
  logistics: { label: string; value: string }[];
}

export interface Trip {
  id: string;
  creatorId: string; // Foreign Key linking to Creator
  
  // Metadata (Card View)
  title: string;
  subtitle?: string;
  coverImage: string;
  locationName: string; // e.g., "Andaman & Nicobar"
  duration: string;     // "5 Nights"
  totalCost: string;
  startDate: string;
  tags: string[];       // ["beach", "scuba", "budget"] - Critical for Search
  
  // Details (Journal View)
  description?: string; // Short intro for the hero section
  itinerary: DaySchedule[];
  budgetBreakdown: Budget[];
  contacts: Contact[];
  essentials: EssentialData;
}

// --- 4. LOCATION (Derived View) ---
// We don't store this in DB necessarily, we derive it.
export interface LocationGroup {
  name: string;       // "Andaman"
  coverImage: string; // Taken from the most popular trip
  tripCount: number;
  creators: Creator[]; // List of creators who have been here
  trips: Trip[];       // The actual trips
}