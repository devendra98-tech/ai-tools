import { HomeHero } from "@/components/home/HomeHero";
import { HomeFeaturesSection } from "@/components/home/HomeFeaturesSection";

export function HomePage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-slate-950 via-slate-500 to-white">
      <HomeHero />
      <HomeFeaturesSection />
    </main>
  );
}
