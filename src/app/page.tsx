import { Hero } from "@/components/Hero";
import { FestivalGrid } from "@/components/FestivalGrid";
import { getFestivalsWithTargetDate } from "@/lib/festivals";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const { upcomingFestivals, allFestivalsWithDates } = getFestivalsWithTargetDate();

  const nextFestival = upcomingFestivals.length > 0 ? upcomingFestivals[0] : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {nextFestival ? (
        <Hero festival={nextFestival} />
      ) : (
        <div className="text-center py-20">
          <h1 className="font-headline text-4xl md:text-6xl text-primary">Festival Countdown Central</h1>
          <p className="mt-4 text-lg text-muted-foreground">No upcoming festivals in our list. Add your own!</p>
        </div>
      )}

      <div className="mt-12 md:mt-20">
         <FestivalGrid initialFestivals={allFestivalsWithDates} />
      </div>
    </div>
  );
}
