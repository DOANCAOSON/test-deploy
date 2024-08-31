"use client";

import Empty from "./Skeleton/Empty";
import { useEffect } from "react";
import SportSkeleton from "./Skeleton/SportSkeleton";
import MatchesItem from "./MatchesItem";
import useHomeStore from "./store";
import MatchesTips from "./MatchesTips";

function MatchesList() {
  const {
    activeTab,
    data,
    loading,
    fetchMatches,
    fetchMatchesLive,
    fetchMatchesList,
    getMatchesYesterday,
    getMatchesLive
  } = useHomeStore();

  useEffect(() => {
    switch (activeTab) {
      case "all":
        fetchMatches();
        break;
      case "live":
        fetchMatchesLive();
        break;
      case "time":
        fetchMatchesList();
        break;
      case "yesterday":
        getMatchesYesterday();
        break;
      case "live-care":
        getMatchesLive();
        break;
      default:
        break;
    }
  }, [activeTab]);

  if (loading) return <SportSkeleton />;

  const renderMatches = () => {
    if (!data?.length) return <Empty loading={loading} />;
    return data.map((tournament, idx) => (
      <MatchesItem key={idx} tournament={tournament} />
    ));
  };

  return (
    <div className="mt-2 w-full md:mt-4">
      <div className="infinite-scroll-component__outerdiv">
        {["all", "live", "time", "yesterday", "live-care"].includes(
          activeTab
        ) && (
          <div className="infinite-scroll-component h-auto overflow-auto">
            {renderMatches()}
          </div>
        )}
        {activeTab === "tips" && <MatchesTips />}
      </div>
    </div>
  );
}

export default MatchesList;
