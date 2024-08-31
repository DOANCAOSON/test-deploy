import React from "react";
import MatchesHeader from "./MatchesHeader";
import MatchesList from "./MatchesList";
import MyComponent from "./WSconnected";

function MatchesRoot({ tabs, visibleTime }: { tabs: { label: string; key: string }[], visibleTime?: boolean }) {
  return (
    <main className="w-full md:w-9/12 xl:w-7/12">
      <div className="w-full sm:rounded-md sm:border sm:bg-card sm:text-card-foreground sm:py-4 sm:px-2">
        <MatchesHeader tabs={tabs} visibleTime={visibleTime}/>
        <MatchesList />
        <MyComponent />
      </div>
    </main>
  );
}

export default MatchesRoot;
