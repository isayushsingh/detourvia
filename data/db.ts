// data/db.ts
import { Creator, Trip } from '@/types/schema';

// --- CREATORS TABLE ---
export const CREATORS: Creator[] = [
  {
    id: 'c1',
    name: "Neville",
    handle: "@neville_travels",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=200&h=200",
    bio: "Solo traveler and photographer documenting the unseen corners of India. My philosophy: travel slow, eat local, and always talk to the taxi drivers.",
    socials: [
      { platform: 'instagram', url: '#' },
      { platform: 'website', url: '#' }
    ]
  },
  {
    id: 'c2',
    name: "Anya",
    handle: "@anya_explores",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=200&h=200",
    bio: "Mountain goat. Hiker. Photographer.",
    socials: [{ platform: 'instagram', url: '#' }]
  },
  {
    id: 'c3',
    name: "Jacopo",
    handle: "@anya_explores",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=200&h=200",
    bio: "Paralympian Training",
    socials: [{ platform: 'instagram', url: '#' }]
  },
  {
    id: 'c4',
    name: "Milli",
    handle: "@anya_explores",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=200&h=200",
    bio: "Mountain goat. Hiker. Photographer.",
    socials: [{ platform: 'instagram', url: '#' }]
  },
  {
    id: 'c5',
    name: "Amos",
    handle: "@anya_explores",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?fit=crop&w=200&h=200",
    bio: "Mountain goat. Hiker. Photographer.",
    socials: [{ platform: 'instagram', url: '#' }]
  },
  {
    id: 'c6',
    name: "Neville",
    handle: "@anya_explores",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=crop&w=200&h=200",
    bio: "Mountain goat. Hiker. Photographer.",
    socials: [{ platform: 'instagram', url: '#' }]
  }
];

// --- TRIPS TABLE ---
export const TRIPS: Trip[] = [
  {
    id: 't1',
    creatorId: 'c1', // Neville's Trip
    title: "Andaman: The 6-Day Blueprint",
    subtitle: "Coral reefs, dense treks, and the logistics of island hopping.",
    locationName: "Andaman Islands",
    coverImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200",
    duration: "5 Nights",
    totalCost: "₹1,18,150",
    startDate: "Oct 12, 2025",
    tags: ["island", "scuba", "beach", "luxury", "chidia tapu", "havelock"],
    
    // Details
    description: "A comprehensive guide to the islands, skipping the tourist traps.",
    itinerary: [
      {
        day: 1,
        date: "Oct 12",
        summaryTitle: "Touchdown Port Blair",
        images: ["https://images.unsplash.com/photo-1589901556066-5e0b57530630"],
        schedule: [
            { title: "Land in IXZ", timeRange: "10:00 - 11:00", type: "travel", notes: ["Take window seat (left side)"] },
            { title: "Check-in at Taj Exotica", timeRange: "12:00 - 13:00", type: "lodging", location: "Radhanagar Beach", cost: "₹25,000" },
            { title: "Sunset at Chidia Tapu", timeRange: "16:30 - 18:30", type: "chill", location: "Chidia Tapu", notes: ["Best sunset spot", "Bring bug spray"] }
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
      // ... Add other days ...
    ],
    budgetBreakdown: [
        { item: "Round Trip Flights (Del-IXZ)", cost: "₹28,000" },
        { item: "Luxury Hotels (5 Nights)", cost: "₹45,000" },
        { item: "Private Inter-Island Ferry (Makruzz)", cost: "₹5,650" },
        { item: "Scuba & Activities", cost: "₹12,500" },
        { item: "Private Cab (Firoz)", cost: "₹15,000" },
        { item: "Food & Drinks", cost: "₹12,000" },
    ],
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
    }]
  },
  {
    id: 't2',
    creatorId: 'c1', // Neville's Trip
    title: "Kyoto Kam",
    locationName: "Kyoto Kalm",
    coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600",
    duration: "5 Nights",
    totalCost: "₹1,18,150",
    startDate: "Oct 12, 2025",
    tags: ["island", "scuba", "beach", "luxury", "chidia tapu", "havelock"],
    
    // Details
    description: "A comprehensive guide to the islands, skipping the tourist traps.",
    itinerary: [
      {
        day: 1,
        date: "Oct 12",
        summaryTitle: "Touchdown Port Blair",
        images: ["https://images.unsplash.com/photo-1589901556066-5e0b57530630"],
        schedule: [
            { title: "Land in IXZ", timeRange: "10:00 - 11:00", type: "travel", notes: ["Take window seat (left side)"] },
            { title: "Check-in at Taj Exotica", timeRange: "12:00 - 13:00", type: "lodging", location: "Radhanagar Beach", cost: "₹25,000" },
            { title: "Sunset at Chidia Tapu", timeRange: "16:30 - 18:30", type: "chill", location: "Chidia Tapu", notes: ["Best sunset spot", "Bring bug spray"] }
        ]
      },
      // ... Add other days ...
    ],
    budgetBreakdown: [
      { item: "Flights", cost: "₹28,000" },
      { item: "Accommodation", cost: "₹45,000" },
      { item: "Scuba", cost: "₹12,000" }
    ],
    essentials: {
        packing: ["Sunscreen", "GoPro", "Dry Bag"],
        logistics: [{ label: "Network", value: "Airtel Only" }]
    },
    contacts: [
        { name: "Firoz", role: "Driver", phone: "+91 9434293873", note: "Best guy for Havelock" }
    ]
  },
  {
    id: 't3',
    creatorId: 'c2', // Anya's Trip
    title: "Moroccan Sahara",
    locationName: "Morocco",
    coverImage: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=1200",
    duration: "7 Days",
    totalCost: "$1200",
    startDate: "Nov 01, 2025",
    tags: ["desert", "culture", "food", "adventure"],
    itinerary: [], // Populate if needed
    budgetBreakdown: [],
    essentials: { packing: [], logistics: [] },
    contacts: []
  },
    {
    id: 't4',
    creatorId: 'c2', // Anya ALSO went to Andaman (to test location grouping)
    title: "Backpacking Andaman",
    locationName: "Andaman Islands", // Same location name as Neville
    coverImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200",
    duration: "10 Days",
    totalCost: "₹35,000",
    startDate: "Jan 10, 2026",
    tags: ["budget", "hostels", "ferry"],
    itinerary: [],
    budgetBreakdown: [],
    essentials: { packing: [], logistics: [] },
    contacts: []
  },
  {
    id: 't5',
    creatorId: 'c3',
    title: "Paris",
    locationName: "Paris", // Same location name as Neville
    coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600",
    duration: "10 Days",
    totalCost: "₹35,000",
    startDate: "Jan 10, 2026",
    tags: ["budget", "hostels", "ferry"],
    itinerary: [],
    budgetBreakdown: [],
    essentials: { packing: [], logistics: [] },
    contacts: []
  },
  {
    id: 't6',
    creatorId: 'c4',
    title: "Iceland",
    locationName: "Iceland", // Same location name as Neville
    coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600",
    duration: "10 Days",
    totalCost: "₹35,000",
    startDate: "Jan 10, 2026",
    tags: ["budget", "hostels", "ferry"],
    itinerary: [],
    budgetBreakdown: [],
    essentials: { packing: [], logistics: [] },
    contacts: []
  },
  {
    id: 't7',
    creatorId: 'c4',
    title: "Paris",
    locationName: "Paris", // Same location name as Neville
    coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600",
    duration: "10 Days",
    totalCost: "₹35,000",
    startDate: "Jan 10, 2026",
    tags: ["budget", "hostels", "ferry"],
    itinerary: [],
    budgetBreakdown: [],
    essentials: { packing: [], logistics: [] },
    contacts: []
  },
];