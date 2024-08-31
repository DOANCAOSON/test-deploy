"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Summary from "./Summary";
import MatchResults from "./MatchResults";
import MatchSchedule from "./MatchSchedule";
import Rankings from "./Rankings";
import Image from "next/image";
import { getSportTeam } from "@/services/sport";

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

function Teams() {
  const [isActive, setIsActive] = useState(1);
  const [teamDetail, setTeamDetail] = useState<League>();
  const handleChangeNav = (id: number) => {
    setIsActive(id);
  };

  useEffect(() => {
    if (!teamDetail) {
      getSportTeam().then(({ data }: any) => {
        setTeamDetail(data);
      });
    }
  }, []);

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
                        teamDetail?.logo || "/assets/images/logo-default.png"
                      }
                      style={{ color: "transparent" }}
                    />
                    <span>{teamDetail?.country}</span>
                  </div>
                </Link>
              </li>
            </ol>
          </nav>
          <div className=" mt-2 flex items-center border-b border-solid border-support-1 pr-4 py-4">
            <Image
              alt={teamDetail?.name ?? ""}
              loading="lazy"
              width={82}
              height={82}
              decoding="async"
              data-nimg={1}
              className="flex p-1 col-span-1 row-span-1 items-center justify-center bg-white border border-solid border-support-1 rounded-lg box-border"
              src={teamDetail?.logo || "/assets/images/logo-default.png"}
              style={{ color: "transparent" }}
            />
            <div className="grid items-center justify-center px-4 ">
              <div className="flex items-center">
                <span className="md:leading-10 leading-2 font-semibold mr-0 md:mr-2 text-xl">
                  {teamDetail?.name}
                </span>
                <button
                  data-state="closed"
                  className=" h-8 w-8 flex items-center justify-center  hover:bg-accent hover:text-accent-foreground rounded-full md:h-9 md:w-9"
                >
                  <svg
                    width={15}
                    height={15}
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="-rotate-45 h-5 w-5"
                  >
                    <path
                      d="M9.62129 1.13607C9.81656 0.940808 10.1331 0.940809 10.3284 1.13607L11.3891 2.19673L12.8033 3.61094L13.8639 4.6716C14.0592 4.86687 14.0592 5.18345 13.8639 5.37871C13.6687 5.57397 13.3521 5.57397 13.1568 5.37871L12.5038 4.7257L8.86727 9.57443L9.97485 10.682C10.1701 10.8773 10.1701 11.1939 9.97485 11.3891C9.77959 11.5844 9.463 11.5844 9.26774 11.3891L7.85353 9.97491L6.79287 8.91425L3.5225 12.1846C3.32724 12.3799 3.01065 12.3799 2.81539 12.1846C2.62013 11.9894 2.62013 11.6728 2.81539 11.4775L6.08576 8.20714L5.0251 7.14648L3.61089 5.73226C3.41563 5.537 3.41562 5.22042 3.61089 5.02516C3.80615 4.8299 4.12273 4.8299 4.31799 5.02516L5.42557 6.13274L10.2743 2.49619L9.62129 1.84318C9.42603 1.64792 9.42603 1.33133 9.62129 1.13607Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                    <path
                      d="M9.62129 1.13607C9.81656 0.940808 10.1331 0.940809 10.3284 1.13607L11.3891 2.19673L12.8033 3.61094L13.8639 4.6716C14.0592 4.86687 14.0592 5.18345 13.8639 5.37871C13.6687 5.57397 13.3521 5.57397 13.1568 5.37871L12.5038 4.7257L8.86727 9.57443L9.97485 10.682C10.1701 10.8773 10.1701 11.1939 9.97485 11.3891C9.77959 11.5844 9.463 11.5844 9.26774 11.3891L7.85353 9.97491L6.79287 8.91425L3.5225 12.1846C3.32724 12.3799 3.01065 12.3799 2.81539 12.1846C2.62013 11.9894 2.62013 11.6728 2.81539 11.4775L6.08576 8.20714L5.0251 7.14648L3.61089 5.73226C3.41563 5.537 3.41562 5.22042 3.61089 5.02516C3.80615 4.8299 4.12273 4.8299 4.31799 5.02516L5.42557 6.13274L10.2743 2.49619L9.62129 1.84318C9.42603 1.64792 9.42603 1.33133 9.62129 1.13607Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <span className="text-[13px] text-black dark:text-[#eee] leading-8">
                {teamDetail?.currentSeason}
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
      {isActive === 1 && (
        <Summary
          leagueId={teamDetail?.leagueId}
          subLeagueId={teamDetail?.subLeagues[0].subLeagueId}
          total="0.5"
        />
      )}
      {isActive === 2 && <MatchResults />}
      {isActive === 3 && <MatchSchedule />}
      {isActive === 4 && <Rankings />}
    </main>
  );
}

Teams.propTypes = {};

export default Teams;
