import MatchChat from "@/components/tran-dau/MatchChat";
import MatchDetail from "@/components/tran-dau/MatchDetail";
import React from "react";

function page() {
  return (
    <main className="min-h-[calc(100vh-344px)] md:min-h-[calc(100vh-411px)]">
      <div className="flex gap-4 py-2 sm:container justify-center">
        <main className="w-full container p-0 md:p-[1rem]">
          <div className="w-full py-2">
            <div className="flex gap-4 ">
              <MatchDetail />
              <MatchChat />
            </div>
          </div>
        </main>
      </div>
    </main>
  );
}

page.propTypes = {};

export default page;
