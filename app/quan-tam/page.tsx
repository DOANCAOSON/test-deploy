import React from "react";
import NationalTeam from "@/components/home/NationalTeam";
import MatchesRoot from "@/components/home/MatchesRoot";
import TipsHot from "@/components/home/TipsHot";

const tabs = [
  { label: "DÒNG THỜI GIAN", key: "time" },
  { label: "HÔM QUA", key: "yesterday" },
  { label: "TRỰC TIẾP", key: "live-care" },
];

function page() {
  return (
    <main className="min-h-[calc(100vh-344px)] md:min-h-[calc(100vh-411px)]">
      <div className="flex gap-4 py-2 sm:container justify-center">
        <NationalTeam />
        <MatchesRoot tabs={tabs} />
        <TipsHot />
      </div>
    </main>
  );
}

page.propTypes = {};

export default page;
