// data/trip.ts

export type ActivityType = 'travel' | 'activity' | 'food' | 'lodging' | 'chill';

export interface ScheduleEvent {
  timeRange: string;
  title: string;
  type: ActivityType;
  location?: string;
  cost?: string; // Optional: "₹14,000"
  notes?: string[]; // Array of strings for "Things to Remember"
}

export interface DayEntry {
  day: number;
  date: string; // e.g., "Jan 12"
  summaryTitle: string; // e.g., "Arrival & Port Blair"
  images: string[];
  schedule: ScheduleEvent[];
}

export interface Contact {
  name: string;
  role: string;
  phone: string;
  note: string;
}

export interface Budget {
    item: string;
    cost: string;
}

export interface Logistics {
    label: string;
    value: string;
}

export interface Essentials {
    packing: string[];
    logistics: Logistics[]
}

export interface TripData {
  title: string;
  subtitle: string;
  creator: {
    name: string;
    avatar: string;
    bio: string; // Added for the footer
  };
  contacts: Contact[];
  days: DayEntry[];
  budget: Budget[];
  totalCost: string;
  essentials: Essentials;
}

export const tripData: TripData = {
  title: "Andaman: The 6-Day Blueprint",
  subtitle: "Coral reefs, dense treks, and the logistics of island hopping.",
  creator: {
    name: "Gemini User",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop",
    bio: "Solo traveler and photographer documenting the unseen corners of India. My philosophy: travel slow, eat local, and always talk to the taxi drivers."
  },
  budget: [
    { item: "Round Trip Flights (Del-IXZ)", cost: "₹28,000" },
    { item: "Luxury Hotels (5 Nights)", cost: "₹45,000" },
    { item: "Private Inter-Island Ferry (Makruzz)", cost: "₹5,650" },
    { item: "Scuba & Activities", cost: "₹12,500" },
    { item: "Private Cab (Firoz)", cost: "₹15,000" },
    { item: "Food & Drinks", cost: "₹12,000" },
  ],
  totalCost: "₹1,18,150",
  // Inside tripData object...
  essentials: {
    packing: [
      "Reef-safe Sunscreen (SPF 50+)",
      "Waterproof Dry Bag (10L)",
      "Decathlon Snorkel Mask",
      "Activated Charcoal (for tummy)",
      "GoPro or Waterproof Phone Case",
      "Slip-on Sandals (Easy on/off)"
    ],
    logistics: [
      { label: "Network", value: "Airtel & BSNL only. Jio is dead." },
      { label: "Cash", value: "ATMs dry up often. Carry ₹10k cash." },
      { label: "Permits", value: "No special permit needed for Indians." },
      { label: "Best Time", value: "Oct to May (Avoid Monsoon)." }
    ]
  },
  contacts: [
    { 
      name: "Firoz", 
      role: "Private Taxi (All Islands)", 
      phone: "+91 9434293873", 
      note: "The most reliable guy. I booked him for the entire trip (Airport to Jetty to Hotels)." 
    },
    { 
      name: "Ocean Tribe", 
      role: "Scuba Center", 
      phone: "+91 9933204008", 
      note: "Highly recommended for beginners. Ask for a slot around 6:30 AM for calm water." 
    },
    { 
      name: "Taposh", 
      role: "Stargazing Guide", 
      phone: "+91 95319 59877", 
      note: "He knows the night sky like the back of his hand. Takes you to a pitch dark spot." 
    },
    { 
      name: "Full Moon Cafe", 
      role: "Lunch Spot", 
      phone: "+91 99332 54220", 
      note: "Great seafood. Call ahead to reserve a table." 
    }
  ],
  days: [
    {
      day: 1,
      date: "Jan 12",
      summaryTitle: "Touchdown Port Blair & Treks",
      images: [
         "https://images.unsplash.com/photo-1596568460662-8e704e6e8e8e?w=800",
         "https://images.unsplash.com/photo-1615535226793-2350ccf5cb00?w=800"
      ],
      schedule: [
        {
          timeRange: "6:35 AM - 9:10 AM",
          title: "Flight to Port Blair",
          type: "travel",
          cost: "₹14,000",
          notes: ["Book right side seats (D,E,F) for better approach views (North Sentinel visible)."],
        },
        {
          timeRange: "10:30 AM - 11:30 AM",
          title: "Taxi to Hotel Symphony Samudra",
          location: "1 hour, 30kms",
          type: "travel",
          cost: "₹15,300 (pkg)",
          notes: ["Entire Cab Booking for all islands through Firoz."],
        },
        {
          timeRange: "2:00 PM - 4:15 PM",
          title: "Mundar Pahar Trek",
          location: "Chidia Tapu",
          type: "activity",
          cost: "₹0",
          notes: ["Trek tentatively reopens Jan 2026.", "Last Entry 3:30PM, Exit by 5:00PM."],
        },
         {
          timeRange: "4:30 PM - 5:30 PM",
          title: "Sunset at Chidia Tapu Beach",
          type: "chill",
        },
      ]
    },
    {
      day: 2,
      date: "Jan 13",
      summaryTitle: "Ferry to Havelock & Sunsets",
       images: [
         "https://images.unsplash.com/photo-1589704787595-b04514304892?w=800",
         "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800"
      ],
      schedule: [
         {
          timeRange: "8:00 AM - 9:30 AM",
          title: "Makruzz Ferry to Havelock",
          type: "travel",
          cost: "₹2050",
          notes: ["Checkin closes 30 min prior.", "Select left side seats for best views."],
        },
        {
          timeRange: "12:00 PM - 1:00 PM",
          title: "Lunch at Full Moon Cafe",
          location: "Govind Nagar Beach",
          type: "food",
        },
         {
          timeRange: "2:00 PM - 6:00 PM",
          title: "Radhanagar Beach",
          type: "activity",
          notes: ["Reach early to enjoy swimming, not just the crowded sunset."],
        },
        {
          timeRange: "6:30 PM - 8:30 PM",
          title: "Dinner at Anju Coco",
          type: "food",
        }
      ]
    },
    {
      day: 3,
      date: "Jan 14",
      summaryTitle: "Scuba & Kayaking",
      images: [
        "https://images.unsplash.com/photo-1544551763-46a42a457136?w=800",
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800"
      ],
      schedule: [
        {
          timeRange: "5:30 AM - 8:00 AM",
          title: "Scuba Diving at 'Tribe Gate'",
          type: "activity",
          cost: "₹5500",
          notes: ["Try booking 6:30-7:30 AM slot; water is undisturbed.", "Vendor: Ocean Tribe."],
        },
        {
          timeRange: "11:30 AM - 12:00 PM",
          title: "Elephant Beach Trek",
          type: "activity",
          cost: "₹500",
          notes: ["Guide required.", "Prefer flipflops, trail is muddy."],
        },
        {
          timeRange: "3:30 PM - 5:15 PM",
          title: "Sunset Kayaking",
          type: "activity",
          cost: "₹1500",
          notes: ["Vendor: Off Track Kayaking"],
        }
      ]
    },
    {
      day: 4,
      date: "Jan 15",
      summaryTitle: "Neil Island Transfer",
      images: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
        "https://images.unsplash.com/photo-1619962269666-3d75373a0279?w=800"
      ],
      schedule: [
        {
          timeRange: "4:45 AM - 6:00 AM",
          title: "Sunrise at Kala Pathar",
          type: "chill",
          notes: ["Less crowded than Govind Nagar beach."],
        },
        {
          timeRange: "9:25 AM - 10:10 AM",
          title: "Nautika Ferry to Neil Island",
          type: "travel",
          cost: "₹1750",
          notes: ["Checkin closes 45min prior."],
        },
        {
          timeRange: "2:00 PM - 4:00 PM",
          title: "Lakshampur Beach 2 & Natural Bridge",
          type: "activity",
          cost: "₹1500",
          notes: ["Guide recommended if first visit.", "Only accessible during low tide."],
        },
        {
          timeRange: "8:30 PM - 9:15 PM",
          title: "Stargazing",
          type: "activity",
          cost: "₹1500",
          notes: ["Vendor: Taposh."],
        }
      ]
    },
    {
      day: 5,
      date: "Jan 16",
      summaryTitle: "Sunrise & Return to Port Blair",
      images: [
        "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800",
        "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800"
      ],
      schedule: [
        {
          timeRange: "4:30 AM - 6:00 AM",
          title: "Sunrise at Sitapur Beach",
          type: "activity",
          notes: ["Check low tide for Shipwreck/Cave view."],
        },
        {
          timeRange: "4:15 PM - 6:30 PM",
          title: "Nautika Ferry to Port Blair",
          type: "travel",
          cost: "₹1850",
        },
        {
          timeRange: "8:00 PM",
          title: "Check-in Sea Shell Coral Cove",
          type: "lodging",
        }
      ]
    }
  ]
};