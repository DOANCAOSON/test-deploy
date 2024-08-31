import TipDetail from "@/components/tips/TipDetail";
import TipSidebar from "@/components/tips/TipSidebar";
import React from "react";

function page() {
  return (
    <main className="min-h-[calc(100vh-344px)] md:min-h-[calc(100vh-411px)]">
      <div className="flex gap-4 py-2 sm:container justify-center">
        <TipDetail />
      </div>
    </main>
  );
}

page.propTypes = {};

export default page;
