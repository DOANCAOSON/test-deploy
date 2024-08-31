import React from "react";
import MatchList from "@/components/tips/MatchList";
import TipCreateBox from "@/components/tips/TipCreateBox";

function page() {
  return (
    <main className="min-h-[calc(100vh-344px)] md:min-h-[calc(100vh-411px)]">
      <div className="flex gap-4 py-2 sm:container justify-center">
        <MatchList />
        <TipCreateBox />
      </div>
    </main>
  );
}

page.propTypes = {};

export default page;
