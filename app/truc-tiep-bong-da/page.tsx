import MatchLive from "@/components/truc-tiep-bong-da/MatchLive";
import React from "react";

const Page: React.FC = () => {
  return (
    <main className="min-h-[calc(100vh-344px)] md:min-h-[calc(100vh-411px)]">
      <div className="flex gap-4 py-2 sm:container justify-center">
        <div className="w-full p-2">
          <MatchLive />
        </div>
      </div>
    </main>
  );
};

export default Page;
