'use client'

import { getSportH2h } from "@/services/sport";
import React, { useEffect, useState } from "react";
import Empty from "../home/Skeleton/Empty";
import Image from "next/image";
import Link from "next/link";

const tabs = [
  { id: "all", label: "TẤT CẢ", key: "headToHead" },
  { id: "home", label: "CHỦ NHÀ", key: "homeLastMatches" },
  { id: "away", label: "ĐỘI KHÁCH", key: "awayLastMatches" },
];

interface MatchData {
  matchId: string;
  league: string;
  leagueId: string;
  leagueLogo: string;
  matchTime: string;
  home: string;
  homeTeamId: string;
  homeLogo: string;
  away: string;
  awayTeamId: string;
  awayLogo: string;
  scoreHome: number;
  scoreAway: number;
  homeHalfScore: number;
  awayHalfScore: number;
  homeRed: number;
  awayRed: number;
  homeCorner: number;
  awayCorner: number;
  initialHandicapHome: string;
  initialHandicap: string;
  initialHandicapAway: string;
  instantHandicapHome: string;
  instantHandicap: string;
  instantHandicapAway: string;
  initialHome: string;
  initialDraw: string;
  initialAway: string;
  instantHome: string;
  instantDraw: string;
  instantAway: string;
  initialOver: string;
  initialTotal: string;
  initialUnder: string;
  instantOver: string;
  instantTotal: string;
  instantUnder: string;
}

interface Data {
  headToHead: MatchData[];
  homeLastMatches: MatchData[];
  awayLastMatches: MatchData[];
}
function MatchH2h({ matchId }: { matchId: string }) {
  const [activeTab, setActiveTab] = useState("all");
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data && loading) {
      getSportH2h(matchId)
        .then(({ data }: any) => setData(data))
        .finally(() => setLoading(false));
    }
  }, []);
  
  if (!data || loading) return <Empty loading={loading} />;

  return (
    <div className="ring-offset-background mt-0">
      <div
        data-state="active"
        data-orientation="horizontal"
        role="tabpanel"
        aria-labelledby="radix-:r11:-trigger-h2h"
        id="radix-:r11:-content-h2h"
        tabIndex={0}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div className="w-full">
          <div className="relative overflow-hidden">
            <div
              className="h-full w-full rounded-[inherit]"
              style={{ overflow: "scroll" }}
            >
              <div style={{ minWidth: "100%", display: "table" }}>
                <div
                  role="tablist"
                  aria-orientation="horizontal"
                  className="bg-muted p-1 text-muted-foreground rounded-none mt-3 md:rounded w-full flex items-center justify-start h-10"
                  tabIndex={0}
                  data-orientation="horizontal"
                  style={{ outline: "none" }}
                >
                  {tabs.map((tab, index) => (
                    <button
                      key={index}
                      type="button"
                      role="tab"
                      aria-selected={tab.id === activeTab ? "true" : "false"}
                      aria-controls={`radix-:r2a:-content-${tab.label}`}
                      data-state={tab.id === activeTab ? "active" : "inactive"}
                      id={`radix-:r2a:-trigger-${tab.label}`}
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow py-1.5 ${
                        tab.id === activeTab ? "" : "ml-2"
                      }`}
                      tabIndex={-1}
                      data-orientation="horizontal"
                      data-radix-collection-item
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {tabs.map((tab, index) => (
          <div
            key={index}
            data-state={index === 0 ? "active" : "inactive"}
            data-orientation="horizontal"
            role="tabpanel"
            aria-labelledby={`radix-:r2a:-trigger-${tab.label}`}
            id={`radix-:r2a:-content-${tab.label}`}
            tabIndex={0}
            className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            style={{}}
          >
            {tab.id === activeTab ? (
              <MatchRow matches={(data as any)[tab.key] as any} loading={loading}/>
            ) : (
              null
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const getStatusText = (scoreHome: number, scoreAway: number) => {
  if (!isNaN(scoreHome) && !isNaN(scoreAway)) {
    if (scoreHome > scoreAway) {
      return "T";
    } else if (scoreHome < scoreAway) {
      return "B";
    } else {
      return "H";
    }
  }
  return ''
};

const getStatusColor = (statusText: string) => {
  const statusColorMap = {
    "B": "bg-red-600",
    "T": "bg-green-600",
    "H": "bg-yellow-600",
    "Unknown": "gray"
  } as any;

  if (statusText in statusColorMap) {
    return statusColorMap[statusText];
  } else {
    return "black";
  }
};

const MatchRow = ({matches, loading}: {matches: MatchData[], loading: boolean}) => {
  if(!matches.length) return <Empty loading={loading} />
  return (
    <div
      data-state="active"
      data-orientation="horizontal"
      role="tabpanel"
      aria-labelledby="radix-:r2o:-trigger-away"
      id="radix-:r2o:-content-away"
      tabIndex={0}
      className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {matches.map(match => (
        <Link key={match.matchId} href={`/tran-dau/${match.matchId}`}>
          <div className="py-1 px-3 text-xs md:text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/5 grid grid-cols-20 items-center">
            <div className=" items-center justify-start col-span-4 flex">
              <p className=" text-center">{match.matchTime}</p>
            </div>
            <div className=" col-span-4 ml-2 gap-2 justify-start items-center flex">
              <Image
                alt=""
                loading="lazy"
                width={20}
                height={20}
                decoding="async"
                data-nimg={1}
                className="rounded w-4 h-4 md:w-5 md:h-5 object-contain bg-white"
                src={match.leagueLogo}
                style={{ color: "transparent" }}
              />
              <p className="font-light w-full overflow-hidden whitespace-nowrap text-ellipsis">
                {match.league}
              </p>
            </div>
            <div className="flex justify-start flex-col gap-1 px-2 col-span-9 md:col-span-7">
              <div className="flex items-center gap-2">
                <Image
                  alt=""
                  loading="lazy"
                  width={20}
                  height={20}
                  decoding="async"
                  data-nimg={1}
                  className="rounded w-4 h-4 md:w-5 md:h-5 object-contain bg-white"
                  src={match.homeLogo}
                  style={{ color: "transparent" }}
                />
                <p className="font-light w-full overflow-hidden whitespace-nowrap text-ellipsis">
                  {match.home}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  alt=""
                  loading="lazy"
                  width={20}
                  height={20}
                  decoding="async"
                  data-nimg={1}
                  className="rounded w-4 h-4 md:w-5 md:h-5 object-contain bg-white"
                  src={match.awayLogo}
                  style={{ color: "transparent" }}
                />
                <p className="font-light w-full overflow-hidden whitespace-nowrap text-ellipsis">
                  {match.away}
                </p>
              </div>
            </div>
            <div className="col-span-2 flex">
              <div className="flex items-center flex-col px-2 gap-2">
                <p>{match.scoreHome}</p>
                <p>{match.scoreAway}</p>
              </div>
            </div>
            <div className="flex justify-end col-span-1 md:col-span-3">
              <span className={`min-w-5 min-h-5 rounded flex items-center justify-center font-semibold text-white ${getStatusColor(getStatusText(match.scoreHome, match.scoreAway))}`}>
                {getStatusText(match.scoreHome, match.scoreAway)}
              </span>
            </div>
          </div>
          <div
            data-orientation="horizontal"
            role="none"
            className="shrink-0 bg-border h-[1px] w-full"
          />
        </Link>
      ))}
    </div>
  );
};

MatchH2h.propTypes = {};

export default MatchH2h;
