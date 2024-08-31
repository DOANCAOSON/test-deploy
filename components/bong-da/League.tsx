"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Summary from "./Summary";
import MatchResults from "./MatchResults";
import MatchSchedule from "./MatchSchedule";
import Rankings from "./Rankings";
import { getLeagueDetailById } from "@/services/sport";
import Image from "next/image";
import useMatchStore from "./store-league";
import { PinIcon, PinnedIcon } from "../home/NationalTeam";

const listNav = [
  {
    id: 1,
    name: " TÓM TẮT",
  },
  {
    id: 2,
    name: "KẾT QUẢ",
  },
  {
    id: 3,
    name: "LỊCH THI ĐẤU",
  },
  {
    id: 4,
    name: "BẢNG XẾP HẠNG",
  },
];

function League() {
  const [isActive, setIsActive] = useState(1);
  const [leagueDetail, setLeagueDetail] = useState<League>();
  const { data, pinnedLeague, removeLeague } = useMatchStore();

  const handleChangeNav = (id: number) => {
    setIsActive(id);
  };

  useEffect(() => {
    if (!leagueDetail) {
      getLeagueDetailById().then(({ data }: any) => {
        setLeagueDetail(data);
      });
    }
  }, []);

  const isPinned = data?.find((d) => d.leagueId === leagueDetail?.leagueId);

  console.log(leagueDetail);
  
  const handlePinned = () => {
    if (isPinned) {
      removeLeague(leagueDetail?.leagueId ?? '');
    } else {
      pinnedLeague({
        countryLogo:
          leagueDetail?.countryLogo,
        countryName: leagueDetail?.country,
        leagueColor: leagueDetail?.color,
        leagueId: leagueDetail?.leagueId,
        leagueName:leagueDetail?.name,
        leagueShortName:leagueDetail?.shortName,
        leagueType: leagueDetail?.type,
      } as any);
    }
  };

  return (
    <main className="w-full md:w-9/12 xl:w-7/12">
      <div className="w-full sm:rounded-md sm:border sm:bg-card sm:text-card-foreground sm:py-0 sm:px-2">
        <div className="p-4 pb-0">
          <nav aria-label="breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
              <li className="inline-flex items-center gap-1.5">
                <Link
                  className="transition-colors hover:text-foreground"
                  href="/"
                >
                  BÓNG ĐÁ
                </Link>
              </li>
              <li
                role="presentation"
                aria-hidden="true"
                className="[&>svg]:size-3.5"
              >
                <svg
                  width={15}
                  height={15}
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Link
                  role="link"
                  aria-disabled="true"
                  aria-current="page"
                  className="font-normal text-foreground"
                  href="/"
                >
                  <div className="flex items-center">
                    <Image
                      alt=""
                      loading="lazy"
                      width={20}
                      height={20}
                      decoding="async"
                      data-nimg={1}
                      className="mr-2"
                      src={
                        leagueDetail?.logo || "/assets/images/logo-default.png"
                      }
                      style={{ color: "transparent" }}
                    />
                    <span>{leagueDetail?.country}</span>
                  </div>
                </Link>
              </li>
            </ol>
          </nav>
          <div className=" mt-2 flex items-center border-b border-solid border-support-1 pr-4 py-4">
            <Image
              alt={leagueDetail?.name ?? ""}
              loading="lazy"
              width={82}
              height={82}
              decoding="async"
              data-nimg={1}
              className="flex p-1 col-span-1 row-span-1 items-center justify-center bg-white border border-solid border-support-1 rounded-lg box-border"
              src={leagueDetail?.logo || "/assets/images/logo-default.png"}
              style={{ color: "transparent" }}
            />
            <div className="grid items-center justify-center px-4 ">
              <div className="flex items-center">
                <span className="md:leading-10 leading-2 font-semibold mr-0 md:mr-2 text-xl">
                  {leagueDetail?.name}
                </span>
                <button
                  data-state="closed"
                  onClick={handlePinned}
                  className=" h-8 w-8 flex items-center justify-center  hover:bg-accent hover:text-accent-foreground rounded-full md:h-9 md:w-9"
                >
                  {data?.find((d) => d.leagueId === leagueDetail?.leagueId) ? (
                    <PinnedIcon />
                  ) : (
                    <PinIcon />
                  )}
                </button>
              </div>
              <span className="text-[13px] text-black dark:text-[#eee] leading-8">
                {leagueDetail?.currentSeason}
              </span>
            </div>
          </div>
          <div dir="ltr" className="relative overflow-hidden">
            <div
              data-radix-scroll-area-viewport
              className="h-full w-full rounded-[inherit]"
              style={{ overflow: "scroll" }}
            >
              <div style={{ minWidth: "100%", display: "table" }}>
                <div className="flex gap-2 pt-3 h-10 items-center flex-nowrap w-full  px-2  md:h-auto md:px-0">
                  {listNav.map((nav, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => handleChangeNav(nav.id)}
                        className={`${
                          nav.id === isActive
                            ? "before:absolute before:bottom-0 before:bg-[#c80037] before:rounded-t-[1.5px] before:w-[calc(100%-28px)] before:h-[3px]"
                            : ""
                        } inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 px-4 py-2 h-6 md:h-8 cursor-pointer text-xs font-bold mt-0 !pb-[14px] relative uppercase whitespace-nowrap box-border`}
                      >
                        {nav.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ----------------------- */}
      <div className="w-full mt-4 sm:rounded-md sm:border sm:bg-card sm:text-card-foreground sm:py-0 sm:px-2" />
      {isActive === 1 && !!leagueDetail && (
        <Summary
          leagueId={leagueDetail.leagueId}
          subLeagueId={leagueDetail.subLeagues[0]?.subLeagueId}
          total="0.5"
        />
      )}
      {isActive === 2 && <MatchResults />}
      {isActive === 3 && <MatchSchedule />}
      {isActive === 4 && <Rankings />}
    </main>
  );
}

League.propTypes = {};

export default League;
