import BannerAds from "@/components/ho-so-ca-nhan/BannerAds";
import Profile from "@/components/ho-so-ca-nhan/Profile";
import React from "react";

function page() {
  return (
    <main className="min-h-[calc(100vh-344px)] md:min-h-[calc(100vh-411px)]">
      <div className="flex gap-4 py-2 sm:container justify-center">
        <main className="w-full container p-0 md:p-[1rem]">
          <div className="w-full flex gap-3">
            <Profile />
            <BannerAds />
          </div>
        </main>
      </div>
    </main>
  );
}

export default page;
