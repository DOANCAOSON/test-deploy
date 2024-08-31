import React from "react";

function ArticleSkeleton() {
  return (
    <div className="w-full bg-card p-2 sm:rounded-md sm:border sm:p-4">
      <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-16 h-4 rounded md:h-6" />
      <div className="grid mt-2 grid-cols-3 gap-2 md:gap-6">
        <div className="group gap-2 col-span-3 flex flex-col  md:gap-4 md:flex-row">
          <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-full h-40 md:w-96 md:h-52 rounded" />
          <div className="grid h-1/3 md:h-1/2">
            <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-24 h-4 rounded md:h-6" />
            <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-72 h-4 rounded md:h-6" />
          </div>
        </div>
        <div className="col-span-3 hidden flex-row md:flex md:col-span-3 gap-4">
          <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-24 h-14 md:w-full md:h-40 rounded" />
          <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-24 h-14 md:w-full md:h-40 rounded" />
          <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-24 h-14 md:w-full md:h-40 rounded" />
        </div>
      </div>
    </div>
  );
}

ArticleSkeleton.propTypes = {};

export default ArticleSkeleton;
