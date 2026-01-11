import { getTrips } from '@/lib/data-service';
import HomeFeed from '@/components/home/HomeFeed';

export default async function HomePage() {
  const trips = await getTrips();
  return (
    <main>
        <HomeFeed initialTrips={trips} />
    </main>
  );
}