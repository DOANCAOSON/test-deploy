import League from "@/components/bong-da/League";
import NationalTeam from "@/components/home/NationalTeam";
import TipsHot from "@/components/home/TipsHot";
import React from "react";

function page() {
  return (
    <main className="min-h-[calc(100vh-344px)] md:min-h-[calc(100vh-411px)]">
      <div className="flex gap-4 py-2 sm:container justify-center">
        <NationalTeam />
        <League />
        <TipsHot />
      </div>
    </main>
  );
}
page.propTypes = {};

export default page;
