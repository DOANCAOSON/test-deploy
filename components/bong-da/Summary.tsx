import React from "react";
import MatchResults from "./MatchResults";
import MatchSchedule from "./MatchSchedule";
import Rankings from "./Rankings";
const Summary = ({ leagueId, subLeagueId, total }: any) => {
  return (
    <div>
      <div className="w-full mt-4 sm:rounded-md sm:border sm:bg-card sm:text-card-foreground sm:py-0 sm:px-2">
        <div className="w-full p-3 text-lg font-medium">Tỷ số mới nhất</div>
        <MatchResults />
      </div>

      <div className="w-full mt-4 sm:rounded-md sm:border sm:bg-card sm:text-card-foreground sm:py-0 sm:px-2">
        <div data-state="open" className="mt-2 w-full">
          <div className="w-full p-3 text-lg font-medium">Sắp diễn ra</div>
          <MatchSchedule />
        </div>
      </div>

      <Rankings leagueId={leagueId} subLeagueId={subLeagueId} total={total}/>
    </div>
  );
};

export default Summary;
