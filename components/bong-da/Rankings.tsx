'use client'
import MatchStandings from "../tran-dau/MatchStandings";

const Rankings = ({ leagueId, subLeagueId, total }: any) => {
  
  return (
    <div className="w-full mt-4 sm:rounded-md sm:border sm:bg-card sm:text-card-foreground sm:py-0 sm:px-2">
      <div className="w-full mt-4">
        <div className=" bg-card text-card-foreground">
          <div className="flex justify-center text-[13px]">bảng xếp hạng</div>
          <MatchStandings leagueId={leagueId} subLeagueId={subLeagueId} total={total} />
        </div>
      </div>
    </div>
  );
};

export default Rankings;
