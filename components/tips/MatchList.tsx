"use client";

import { getSportSchedulesTips } from "@/services/sport";
import React, { useEffect, useState } from "react";
import MatchSkeleton from "./skeleton/MatchSkeleton";
import Empty from "../home/Skeleton/Empty";
import Image from "next/image";
import { Animation } from "../Animation";
import { useInView } from "react-intersection-observer";
import { useTipsStore } from "./store";
import useDebounce from "@/utils/debound";

const handleConvertData = (data: any[]) => {
  const leagueMap = data.reduce((acc, match) => {
    if (!acc[match.leagueId]) {
      acc[match.leagueId] = {
        leagueId: match.leagueId,
        leagueName: match.leagueName,
        leagueShortName: match.leagueShortName,
        leagueColor: match.leagueColor,
        leagueLogo: match.leagueLogo,
        countryId: match.countryId,
        countryName: match.countryName,
        countryLogo: match.countryLogo,
        matches: [],
      };
    }

    acc[match.leagueId].matches.push({
      matchId: match.matchId,
      matchAt: match.matchAt,
      homeName: match.homeName,
      homeLogo: match.homeLogo,
      awayName: match.awayName,
      awayLogo: match.awayLogo,
      homeScore: match.homeScore,
      awayScore: match.awayScore,
      homeHalfScore: match.homeHalfScore,
      awayHalfScore: match.awayHalfScore,
      homeRed: match.homeRed,
      awayRed: match.awayRed,
      homeYellow: match.homeYellow,
      awayYellow: match.awayYellow,
      homeCorner: match.homeCorner,
      awayCorner: match.awayCorner,
      status: match.status,
      explain: match.explain,
      odds: match.odds,
    });

    return acc;
  }, {});

  return Object.values(leagueMap);
};

function MatchList() {
  const [data, setData] = useState<Tournament[] | null>(null);
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (!data && loading) {
      getSportSchedulesTips()
        .then(({ data }: any) =>
          setData(handleConvertData(data) as Tournament[])
        )
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) return <MatchSkeleton />;

 
  const filteredData = data?.map(tournament => ({
    ...tournament,
    matches: tournament.matches.filter(
      match => 
        match.homeName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        match.awayName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )
  })).filter(tournament => tournament.matches.length > 0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <aside className="w-full md:w-3/12">
      <div className=" w-full">
        <h4 className="text-sm flex  justify-between items-center gap-2 font-semibold bg-primary/10 shadow-sm md:rounded p-2 relative">
          <div className="flex gap-2">
            <div className="border px-0.5 sm:max-w-[95px] max-w-[75px] h-[16px] md:h-full text-[10px] md:text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80 w-5 !h-5 rounded-full flex items-center justify-center !font-extrabold">
              1
            </div>
            Chọn trận đấu
          </div>
          <button onClick={() => setOpen(!open)} className="items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 hidden rounded-full md:flex">
            <svg
              width={15}
              height={15}
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <path
                d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button className="items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary shadow hover:bg-primary/90 text-xs block rounded-full text-white px-4 h-8 md:hidden">
            Chọn ngay
          </button>
        </h4>
        {open && <SearchBox onChange={handleSearchChange}/>}
        <div className="hidden md:block w-full">
          <div dir="ltr" className="relative overflow-hidden w-full">
          {!!filteredData?.length ? (
              filteredData.map((i) => {
                return <MatchItem key={i.leagueId} i={i} />;
              })
            ) : (
              <Empty />
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

const SearchBox = ({ onChange }: any) => {
  return (
    <div className="bg-primary/10 p-1 mb-3 rounded-b-md">
      <input
        className="flex h-9 w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-card"
        placeholder="Nhập trận đấu"
        type="text"
        onChange={onChange}
      />
    </div>
  );
};

const MatchItem = ({ i }: { i: Tournament }) => {
  const { setOdds, odds } = useTipsStore();

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  if (!inView) {
    return <div ref={ref} style={{ height: "150px" }} />;
  }

  const handleSetOdds = (
    odds: Odds,
    match: {
      matchId: string;
      awayName: string;
      homeName: string;
    }
  ) => {
    const europeOdds = odds.europeOdds[0];
    const handicap = odds.handicap[0];
    const overUnder = odds.overUnder[0];
    setOdds({ europeOdds, handicap, overUnder, match } as any);
  };

  return (
    <Animation
      animationName="fadeIn"
      inViewDefault={inView}
      data-radix-scroll-area-viewport
      className="h-full w-full rounded-[inherit]"
      style={{ overflow: "hidden scroll" }}
      key={i.leagueId}
    >
      <div style={{ minWidth: "100%", display: "table" }}>
        <div className="mt-[2px]">
          <div className="flex bg-primary/5 shadow-sm rounded px-2 py-1">
            <Image
              alt={i.leagueName}
              loading="lazy"
              width={20}
              height={20}
              decoding="async"
              data-nimg={1}
              className="mr-2 w-5 h-5 object-contain bg-white rounded"
              src={i.countryLogo}
              style={{ color: "transparent" }}
            />
            <span className="truncate text-sm">{i.leagueName}</span>
          </div>
          {i.matches.map((match, idx) => {
            return (
              <div
                key={idx}
                onClick={() =>
                  handleSetOdds(match.odds, {
                    matchId: match.matchId,
                    awayName: match.awayName,
                    homeName: match.homeName,
                  })
                }
                className={`group cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${
                  odds?.match.matchId === match.matchId
                    ? "bg-primary/90 text-white"
                    : "hover:bg-primary/5"
                }`}
              >
                <div className="p-2 items-center grid grid-cols-12  md:text-sm text-[13px] rounded mt-[2px] ">
                  <div className="col-span-2">17/06 22:59</div>
                  <div className="col-span-8 items-center  md:text-sm text-[13px]">
                    <div className="flex gap-1">
                      <Image
                        alt={match.homeName}
                        loading="lazy"
                        width={20}
                        height={20}
                        decoding="async"
                        data-nimg={1}
                        className="rounded w-4 h-4 object-contain bg-white"
                        src={match.homeLogo}
                        style={{ color: "transparent" }}
                      />
                      <p>{match.homeName}</p>
                    </div>
                    <div className="flex gap-1">
                      <Image
                        alt={match.awayName}
                        loading="lazy"
                        width={20}
                        height={20}
                        decoding="async"
                        data-nimg={1}
                        className="rounded w-4 h-4 object-contain bg-white"
                        src={match.awayLogo}
                        style={{ color: "transparent" }}
                      />
                      <p>{match.awayName}</p>
                    </div>
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <svg
                      width={15}
                      height={15}
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="group-hover:animate-arrow-x"
                    >
                      <path
                        d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div
                  data-orientation="horizontal"
                  role="none"
                  className="shrink-0 bg-border h-[1px] w-full"
                />
              </div>
            );
          })}
        </div>
      </div>
    </Animation>
  );
};

MatchList.propTypes = {};

export default MatchList;
