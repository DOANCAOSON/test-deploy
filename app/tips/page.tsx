import React from "react";
import TipList from "@/components/tips/TipList";
import BXHMember from "@/components/tips/BXHMember";

function page() {
  return (
    <main className="min-h-[calc(100vh-344px)] md:min-h-[calc(100vh-411px)]">
      <div className="flex gap-4 py-2 sm:container justify-center">
        <TipList />
        <BXHMember />
      </div>
    </main>
  );
}

page.propTypes = {};

export default page;
