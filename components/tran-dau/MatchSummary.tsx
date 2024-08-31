"use client";

import { getSportEvents, getSportStats } from "@/services/sport";
import React, { useEffect, useState } from "react";
import Empty from "../home/Skeleton/Empty";
import MatchEvents from "./MatchEvents";
import MatchOdds from "./MatchOdds";
import MatchH2h from "./MatchH2h";
import MatchStandings from "./MatchStandings";

const tabs = [
  { id: "match", label: "TRẬN ĐẤU" },
  { id: "odds", label: "TỈ LỆ KÈO" },
  { id: "h2h", label: "ĐỐI ĐẦU" },
  { id: "standings", label: "BXH" },
];

function MatchSummary({
  matchId,
  europeOdds,
  leagueId,
  subLeagueId,
}: {
  matchId: string;
  europeOdds: EuropeOdds;
  leagueId: string;
  subLeagueId: string;
}) {
  const [activeTab, setActiveTab] = useState("match");
  const [activeMatchDetailTab, setActiveMatchDetailTab] = useState("summary");

  return (
    <div className="w-full mt-4">
      <div className="bg-card text-card-foreground">
        <div className="w-full p-0">
          <div className="relative overflow-hidden">
            <div
              className="h-full w-full rounded-[inherit]"
              style={{ overflow: "scroll" }}
            >
              <div style={{ minWidth: "100%", display: "table" }}>
                <TabList
                  tabs={tabs}
                  activeTab={activeTab}
                  onTabClick={setActiveTab}
                  className="h-9 p-1 text-muted-foreground bg-transparent w-full flex items-center justify-start gap-12 border-y rounded-none px-8"
                />
              </div>
            </div>
          </div>
          {activeTab === "match" && (
            <MatchDetails
              activeTab={activeMatchDetailTab}
              onTabClick={setActiveMatchDetailTab}
              matchId={matchId}
              europeOdds={europeOdds}
            />
          )}
          {activeTab === "odds" && <MatchOdds matchId={matchId} />}
          {activeTab === "h2h" && <MatchH2h matchId={matchId} />}
          {activeTab === "standings" && (
            <MatchStandings
              leagueId={leagueId}
              subLeagueId={subLeagueId}
              total="0.5"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function TabList({ tabs, activeTab, onTabClick, className }: any) {
  return (
    <div className={`${className}`}>
      {tabs.map((tab: any) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`radix-:r9:-content-${tab.id}`}
          data-state={activeTab === tab.id ? "active" : "inactive"}
          id={`radix-:r9:-trigger-${tab.id}`}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow py-1.5 ${
            activeTab === tab.id
              ? "data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-4 data-[state=active]:border-primary bg-white "
              : ""
          }`}
          tabIndex={activeTab === tab.id ? 0 : -1}
          onClick={() => onTabClick(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

const matchDetailsTabs = [
  { id: "summary", label: "TÓM TẮT" },
  { id: "stats", label: "SỐ LIỆU" },
  { id: "lineups", label: "ĐỘI HÌNH" },
];

function MatchDetails({ activeTab, onTabClick, matchId, europeOdds }: any) {
  return (
    <div className="w-full">
      <div className="relative overflow-hidden">
        <div
          className="h-full w-full rounded-[inherit]"
          style={{ overflow: "scroll" }}
        >
          <div style={{ minWidth: "100%", display: "table" }}>
            <TabList
              tabs={matchDetailsTabs}
              activeTab={activeTab}
              onTabClick={onTabClick}
              className="p-1 mt-3 bg-primary text-white rounded-none w-full flex items-center justify-start h-10"
            />
          </div>
        </div>
      </div>
      <div
        data-state="active"
        role="tabpanel"
        aria-labelledby={`radix-:re:-trigger-${activeTab}`}
        id={`radix-:re:-content-${activeTab}`}
        tabIndex={0}
        className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 p-0 w-full"
        style={{ animationDuration: "0s" }}
      >
        {activeTab === "summary" ? (
          <SummaryContent matchId={matchId} />
        ) : activeTab === "stats" ? (
          <StatsContent matchId={matchId} />
        ) : (
          <LineupsContent />
        )}
        <PreMatchRate europeOdds={europeOdds} />
      </div>
    </div>
  );
}

function SummaryContent({ matchId }: { matchId: string }) {
  const [data, setData] = useState<MatchEvents | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data && loading) {
      getSportEvents(matchId)
        .then(({ data }: any) => setData(data))
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <div className="mb-4 text-sm">
      <div className="flex flex-col gap-2 items-center justify-center text-muted-foreground">
        {data?.events.length ? (
          <MatchEvents events={data?.events} />
        ) : (
          <Empty loading={loading} />
        )}
      </div>
    </div>
  );
}

const PreMatchRate = ({ europeOdds }: { europeOdds: EuropeOdds[] }) => {
  return (
    <div className="w-full text-xs md:text-[13px]">
      <div className="w-full bg-muted md:rounded rounded-none px-3 py-1.5 flex items-center justify-between">
        <p className="text-[11px]">TỈ LỆ TRƯỚC TRẬN</p>
      </div>
      <div className="flex items-center justify-end w-full gap-2 mt-2 pr-[10px] pb-2">
        <div className="w-fit flex items-center justify-center rounded border bg-card text-card-foreground p-1 gap-2 md:p-1 md:px-2 md:rounded-md">
          <span>1</span>
          <span> - </span>
          {/* <span>{europeOdds[0].initialHome}</span> */}
        </div>
        <div className="w-fit flex items-center justify-center rounded border bg-card text-card-foreground p-1 gap-2 md:p-1 md:px-2 md:rounded-md">
          <span>X</span>
          <span> - </span>
          {/* <span>{europeOdds[0].initialDraw}</span> */}
        </div>
        <div className="w-fit flex items-center justify-center rounded border bg-card text-card-foreground p-1 gap-2 md:p-1 md:px-2 md:rounded-md">
          <span>2</span>
          <span> - </span>
          {/* <span>{europeOdds[0].initialAway}</span> */}
        </div>
      </div>
    </div>
  );
};

const statsData = [
  { label: "Phạt góc", firstHalf: 0, secondHalf: 0, progress: [0, 0] },
  {
    label: "Phạt góc (Hiệp đầu)",
    firstHalf: 0,
    secondHalf: 0,
    progress: [0, 0],
  },
  { label: "Thẻ vàng", firstHalf: 0, secondHalf: 0, progress: [0, 0] },
  { label: "Sút bóng", firstHalf: 0, secondHalf: 0, progress: [0, 0] },
  { label: "Sút trúng đích", firstHalf: 0, secondHalf: 0, progress: [0, 0] },
  {
    label: "Sút không trúng đích",
    firstHalf: 0,
    secondHalf: 0,
    progress: [0, 0],
  },
  { label: "Tỷ lệ kiểm soát%", firstHalf: 0, secondHalf: 0, progress: [0, 0] },
  {
    label: "Tỷ lệ kiểm soát (Hiệp đầu)",
    firstHalf: 0,
    secondHalf: 0,
    progress: [0, 0],
  },
  { label: "Vi phạm", firstHalf: 0, secondHalf: 0, progress: [0, 0] },
  { label: "Việt vị", firstHalf: 0, secondHalf: 0, progress: [0, 0] },
  { label: "Cứu thua", firstHalf: 0, secondHalf: 0, progress: [0, 0] },
  { label: "Tấn công", firstHalf: 0, secondHalf: 0, progress: [0, 0] },
  {
    label: "Tấn công nguy hiểm",
    firstHalf: 0,
    secondHalf: 0,
    progress: [0, 0],
  },
];

interface Stats {
  matchId: string;
  stats: {
    type: number;
    home: string;
    away: string;
  }[];
}
function StatsContent({ matchId }: { matchId: string }) {
  const [data, setData] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data && loading) {
      getSportStats(matchId)
        .then(({ data }: any) => setData(data))
        .finally(() => setLoading(false));
    }
  }, []);

  if (!data || loading) return <Empty loading={loading} />;

  data.stats.forEach((stat) => {
    switch (stat.type) {
      case 6:
        statsData[0].firstHalf = parseInt(stat.home);
        statsData[0].secondHalf = parseInt(stat.away);
        statsData[0].progress = [
          -(
            (parseInt(stat.home) /
              (parseInt(stat.home) + parseInt(stat.away))) *
            100
          ),
          -(
            (parseInt(stat.away) /
              (parseInt(stat.home) + parseInt(stat.away))) *
            100
          ),
        ];
        break;
      case 45:
        statsData[1].firstHalf = parseInt(stat.home);
        statsData[1].secondHalf = parseInt(stat.away);
        statsData[1].progress = [
          -(
            (parseInt(stat.home) /
              (parseInt(stat.home) + parseInt(stat.away))) *
            100
          ),
          -(
            (parseInt(stat.away) /
              (parseInt(stat.home) + parseInt(stat.away))) *
            100
          ),
        ];
        break;
      case 11:
        statsData[2].firstHalf = parseInt(stat.home);
        statsData[2].secondHalf = parseInt(stat.away);
        statsData[2].progress = [
          -(
            (parseInt(stat.home) /
              (parseInt(stat.home) + parseInt(stat.away))) *
            100
          ),
          -(
            (parseInt(stat.away) /
              (parseInt(stat.home) + parseInt(stat.away))) *
            100
          ),
        ];
        break;
      case 3:
        statsData[3].firstHalf = parseInt(stat.home);
        statsData[3].secondHalf = parseInt(stat.away);
        statsData[3].progress = [
          -(
            (parseInt(stat.home) /
              (parseInt(stat.home) + parseInt(stat.away))) *
            100
          ),
          -(
            (parseInt(stat.away) /
              (parseInt(stat.home) + parseInt(stat.away))) *
            100
          ),
        ];
        break;
      case 4:
        statsData[4].firstHalf = parseInt(stat.home);
        statsData[4].secondHalf = parseInt(stat.away);
        statsData[4].progress = [
          -(
            (parseInt(stat.home) /
              (parseInt(stat.home) + parseInt(stat.away))) *
            100
          ),
          -(
            (parseInt(stat.away) /
              (parseInt(stat.home) + parseInt(stat.away))) *
            100
          ),
        ];
        break;
      case 34:
        statsData[5].firstHalf = parseInt(stat.home);
        statsData[5].secondHalf = parseInt(stat.away);
        statsData[5].progress = [
          -(
            (parseInt(stat.home) /
              (parseInt(stat.home) + parseInt(stat.away))) *
            100
          ),
          -(
            (parseInt(stat.away) /
              (parseInt(stat.home) + parseInt(stat.away))) *
            100
          ),
        ];
        break;
      case 14:
        statsData[6].firstHalf = parseInt(stat.home);
        statsData[6].secondHalf = parseInt(stat.away);
        statsData[6].progress = [-parseInt(stat.home), -parseInt(stat.away)];
        break;
      case 46:
        statsData[7].firstHalf = parseInt(stat.home);
        statsData[7].secondHalf = parseInt(stat.away);
        statsData[7].progress = [-parseInt(stat.home), -parseInt(stat.away)];
        break;
      case 5:
        statsData[8].firstHalf = parseInt(stat.home);
        statsData[8].secondHalf = parseInt(stat.away);
        statsData[8].progress = [
          -(
            (parseInt(stat.home) /
              (parseInt(stat.home) + parseInt(stat.away))) *
            100
          ),
          -(
            (parseInt(stat.away) /
              (parseInt(stat.home) + parseInt(stat.away))) *
            100
          ),
        ];
        break;
      case 9:
        statsData[9].firstHalf = parseInt(stat.home);
        statsData[9].secondHalf = parseInt(stat.away);
        statsData[9].progress = [
          -(
            (parseInt(stat.home) /
              (parseInt(stat.home) + parseInt(stat.away))) *
            100
          ),
          -(
            (parseInt(stat.away) /
              (parseInt(stat.home) + parseInt(stat.away))) *
            100
          ),
        ];
        break;
      case 16:
        statsData[10].firstHalf = parseInt(stat.home);
        statsData[10].secondHalf = parseInt(stat.away);
        statsData[10].progress = [
          -(
            (parseInt(stat.home) /
              (parseInt(stat.home) + parseInt(stat.away))) *
            100
          ),
          -(
            (parseInt(stat.away) /
              (parseInt(stat.home) + parseInt(stat.away))) *
            100
          ),
        ];
        break;
      case 43:
        statsData[11].firstHalf = parseInt(stat.home);
        statsData[11].secondHalf = parseInt(stat.away);
        statsData[11].progress = [
          -(
            (parseInt(stat.home) /
              (parseInt(stat.home) + parseInt(stat.away))) *
            100
          ),
          -(
            (parseInt(stat.away) /
              (parseInt(stat.home) + parseInt(stat.away))) *
            100
          ),
        ];
        break;
      case 44:
        statsData[12].firstHalf = parseInt(stat.home);
        statsData[12].secondHalf = parseInt(stat.away);
        statsData[12].progress = [
          -(
            (parseInt(stat.home) /
              (parseInt(stat.home) + parseInt(stat.away))) *
            100
          ),
          -(
            (parseInt(stat.away) /
              (parseInt(stat.home) + parseInt(stat.away))) *
            100
          ),
        ];
        break;
      default:
        break;
    }
  });

  return (
    <div className="w-full flex flex-col gap-4 px-3 mb-6">
      <div className="w-full flex flex-col mt-4 gap-2">
        {statsData.map((stat, index) => (
          <div key={index} className="w-full text-[13px]">
            <div className="w-full flex items-center justify-between">
              <span className="w-2/12">
                {index === 1 ? stat.firstHalf : stat.secondHalf}
              </span>
              <span className="w-10/12 text-center">{stat.label}</span>
              <span className="w-2/12 text-right">
                {index === 1 ? stat.secondHalf : stat.firstHalf}
              </span>
            </div>
            <div className="w-full flex gap-1 mt-2">
              <div className="w-1/2 rotate-180">
                <div
                  aria-valuemax={100}
                  aria-valuemin={0}
                  role="progressbar"
                  data-state="indeterminate"
                  data-max={100}
                  className="relative h-2 w-full overflow-hidden rounded-full bg-primary/20"
                >
                  <div
                    data-state="indeterminate"
                    data-max={100}
                    className="h-full w-full flex-1 transition-all bg-primary"
                    style={{ transform: `translateX(${stat.progress[1]}%)` }}
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div
                  aria-valuemax={100}
                  aria-valuemin={0}
                  role="progressbar"
                  data-state="indeterminate"
                  data-max={100}
                  className="relative h-2 w-full overflow-hidden rounded-full bg-primary/20"
                >
                  <div
                    data-state="indeterminate"
                    data-max={100}
                    className="h-full w-full flex-1 transition-all bg-primary"
                    style={{ transform: `translateX(${stat.progress[0]}%)` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LineupsContent() {
  return <Empty />;
}

MatchSummary.propTypes = {};

export default MatchSummary;
