import React from "react";

function BannerAds() {
  return (
    <div className="md:block hidden w-2/12">
      <div className="h-96 bg-primary/10 text-muted-foreground text-sm rounded flex items-center justify-center">
        Banner ads
      </div>
    </div>
  );
}

BannerAds.propTypes = {};

export default BannerAds;
