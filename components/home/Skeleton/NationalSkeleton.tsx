import React from "react";

function NationalSkeleton() {
  return (
    <div className="w-full sm:rounded-md  sm:text-card-foreground px-3">
      {Array(16)
        .fill(1)
        .map(() => (
          <div
            key={Math.random()}
            className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-full h-5 mb-2 rounded"
          />
        ))}
    </div>
  );
}

NationalSkeleton.propTypes = {};

export default NationalSkeleton;
