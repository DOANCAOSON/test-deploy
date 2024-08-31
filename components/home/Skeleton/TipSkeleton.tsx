import React from "react";

function TipSkeleton() {
  return (
    <aside className="hidden xl:flex xl:w-3/12">
      <div className="w-full h-fit rounded-lg border p-2 text-sm transition-all bg-card">
        <div className="w-full sm:rounded-md  sm:text-card-foreground  px-3">
          <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-full h-8 rounded" />
          <div className="mt-4">
            <div className="mt-4 flex flex-col gap-2" />
          </div>
          <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-full h-24 mb-4 rounded" />
          <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-full h-24 mb-4 rounded" />
          <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-full h-24 mb-4 rounded" />
          <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-full h-24 mb-4 rounded" />
          <div className="mt-4">
            <div className="mt-4 flex flex-col gap-2" />
          </div>
          <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-full h-16 mb-4 rounded" />
          <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-full h-16 mb-4 rounded" />
        </div>
      </div>
    </aside>
  );
}

TipSkeleton.propTypes = {};

export default TipSkeleton;
