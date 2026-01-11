import { TRIPS as MOCK_TRIPS, CREATORS as MOCK_CREATORS } from '@/data/db';
import { Trip, Creator } from '@/types/schema';
// We will import prisma later when you are ready, for now we simulate
// import prisma from '@/lib/prisma'; 

export async function getTrips(): Promise<(Trip & { creator: Creator })[]> {
  // Check the environment variable
  const source = process.env.DATA_SOURCE || 'mock'; // Default to mock

  if (source === 'mock') {
    console.log("📍 DATA SOURCE: Using Local File (data/db.ts)");
    
    // Simulate a delay so it feels like a real fetch
    await new Promise(resolve => setTimeout(resolve, 50));

    // Manual Join: Attach Creator to Trip
    return MOCK_TRIPS.map(trip => ({
        ...trip,
        creator: MOCK_CREATORS.find(c => c.id === trip.creatorId)!
    }));
  }

  // --- REAL DATABASE LOGIC (Put this back when Prisma is fixed) ---
  // console.log("📍 DATA SOURCE: Real Database");
  // const dbTrips = await prisma.trip.findMany({
  //   include: { creator: true },
  //   orderBy: { createdAt: 'desc' }
  // });
  // return dbTrips;
  
  return []; // Fallback if DB fails
}