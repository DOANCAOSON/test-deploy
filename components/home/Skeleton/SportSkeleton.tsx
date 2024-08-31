import React from "react";

function SportSkeleton() {
  return (
    <div className="w-full py-2 sm:rounded-md bg-border/25 sm:text-card-foreground">
      <div className="w-full px-0 md:px-2">
        <div className="animate-pulse bg-primary/10 w-full h-12 md:h-8 rounded-none md:rounded-lg" />
      </div>
      <div className="px-2">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <div key={index}>
            <div className="flex justify-between items-center w-full py-2">
              <div className="flex">
                <div className="flex gap-5 items-center">
                  <div className="animate-pulse relative overflow-hidden bg-primary/10 w-3.5 h-3.5 rounded after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:transform after:translate-x-[-100%] after:animate-skeleton after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)]" />
                  <div className="animate-pulse relative overflow-hidden bg-primary/10 hidden md:block w-12 h-3.5 rounded after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:transform after:translate-x-[-100%] after:animate-skeleton after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)]" />
                </div>
                <div className="grid gap-1.5 ml-2 md:ml-10 items-center justify-center">
                  <div className="animate-pulse relative overflow-hidden bg-primary/10 w-28 h-3.5 rounded after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:transform after:translate-x-[-100%] after:animate-skeleton after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)]" />
                  <div className="animate-pulse relative overflow-hidden bg-primary/10 w-24 h-3.5 rounded after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:transform after:translate-x-[-100%] after:animate-skeleton after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)]" />
                </div>
              </div>
              <div>
                <div className="animate-pulse relative overflow-hidden bg-primary/10 w-14 h-3.5 rounded after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:transform after:translate-x-[-100%] after:animate-skeleton after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)]" />
              </div>
            </div>
            <div
              data-orientation="horizontal"
              role="none"
              className="shrink-0 h-[1px] w-full bg-border/35"
            />
          </div>
        ))}
      </div>
      <div className="w-full mt-2 px-0 md:px-2">
        <div className="animate-pulse bg-primary/10 w-full h-12 md:h-8 rounded-none md:rounded-lg" />
      </div>
    </div>
  );
}

SportSkeleton.propTypes = {};

export default SportSkeleton;
