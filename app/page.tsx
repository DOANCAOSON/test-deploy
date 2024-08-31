import MatchesRoot from "@/components/home/MatchesRoot";
import NationalTeam from "@/components/home/NationalTeam";
import TipsHot from "@/components/home/TipsHot";

const tabs = [
  { label: "Tất cả", key: "all" },
  { label: "Live", key: "live" },
  { label: "Tỉ lệ kèo", key: "tips" },
  { label: "Đã kết thúc", key: "end" },
  { label: "Sắp diễn ra", key: "beging" },
];

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-344px)] md:min-h-[calc(100vh-411px)]">
      <div className="flex gap-4 py-2 sm:container justify-center">
        <NationalTeam />
        <MatchesRoot tabs={tabs} visibleTime />
        <TipsHot />
      </div>
    </main>
  );
}
