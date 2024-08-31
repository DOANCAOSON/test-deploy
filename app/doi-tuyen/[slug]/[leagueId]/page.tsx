import Teams from "@/components/bong-da/Teams";
import NationalTeam from "@/components/home/NationalTeam";
import TipsHot from "@/components/home/TipsHot";

export default function page() {
  return (
    <main className="min-h-[calc(100vh-344px)] md:min-h-[calc(100vh-411px)]">
    <div className="flex gap-4 py-2 sm:container justify-center">
      <NationalTeam />
      <Teams />
      <TipsHot />
    </div>
  </main>
  );
}
