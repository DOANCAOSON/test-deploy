"use client";

import { getLeagueSchedulesNotFinished } from "@/services/sport";
import { useEffect, useState } from "react";
import { handleConvertRound } from "../home/store";
import { Animation } from "../Animation";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Empty from "../home/Skeleton/Empty";
import { formattedDate } from "@/utils/datime";
import { TeamInfo } from "../home/MatchesItem";

const MatchSchedule = () => {
  const [leagues, setLeagues] = useState<Tournament[]>();

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!leagues) {
      getLeagueSchedulesNotFinished().then(({ data }: any) => {
        setLeagues(handleConvertRound(data) as Tournament[]);
      });
    }
  }, []);

  if (!inView) {
    return <div ref={ref} style={{ height: "150px" }} />;
  }

  return (
    <Animation
      animationName="fadeIn"
      inViewDefault={inView}
      className="w-full mt-4 sm:rounded-md sm:border sm:bg-card sm:text-card-foreground sm:py-0 sm:px-2"
    >
      <div data-state="open" className="mt-2 w-full">
          {!!leagues?.length ? (
            leagues.map((league, idx) => {
              return (
                <div key={idx}>
                  <div className="grid bg-primary/10 shadow-sm w-full h-8 grid-cols-10 md:h-10 sm:rounded-md md:grid-cols-20">
                    <button
                      data-state="closed"
                      className="flex items-center justify-center  hover:bg-accent hover:text-accent-foreground col-span-1 h-8 w-8 rounded-full md:h-9 md:w-9"
                    >
                      <svg
                        width={15}
                        height={15}
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                      >
                        <path
                          d="M6.97942 1.25171L6.9585 1.30199L5.58662 4.60039C5.54342 4.70426 5.44573 4.77523 5.3336 4.78422L1.7727 5.0697L1.71841 5.07405L1.38687 5.10063L1.08608 5.12475C0.820085 5.14607 0.712228 5.47802 0.914889 5.65162L1.14406 5.84793L1.39666 6.06431L1.43802 6.09974L4.15105 8.42374C4.23648 8.49692 4.2738 8.61176 4.24769 8.72118L3.41882 12.196L3.40618 12.249L3.32901 12.5725L3.25899 12.866C3.19708 13.1256 3.47945 13.3308 3.70718 13.1917L3.9647 13.0344L4.24854 12.861L4.29502 12.8326L7.34365 10.9705C7.43965 10.9119 7.5604 10.9119 7.6564 10.9705L10.705 12.8326L10.7515 12.861L11.0354 13.0344L11.2929 13.1917C11.5206 13.3308 11.803 13.1256 11.7411 12.866L11.671 12.5725L11.5939 12.249L11.5812 12.196L10.7524 8.72118C10.7263 8.61176 10.7636 8.49692 10.849 8.42374L13.562 6.09974L13.6034 6.06431L13.856 5.84793L14.0852 5.65162C14.2878 5.47802 14.18 5.14607 13.914 5.12475L13.6132 5.10063L13.2816 5.07405L13.2274 5.0697L9.66645 4.78422C9.55432 4.77523 9.45663 4.70426 9.41343 4.60039L8.04155 1.30199L8.02064 1.25171L7.89291 0.944609L7.77702 0.665992C7.67454 0.419604 7.32551 0.419604 7.22303 0.665992L7.10715 0.944609L6.97942 1.25171ZM7.50003 2.60397L6.50994 4.98442C6.32273 5.43453 5.89944 5.74207 5.41351 5.78103L2.84361 5.98705L4.8016 7.66428C5.17183 7.98142 5.33351 8.47903 5.2204 8.95321L4.62221 11.461L6.8224 10.1171C7.23842 9.86302 7.76164 9.86302 8.17766 10.1171L10.3778 11.461L9.77965 8.95321C9.66654 8.47903 9.82822 7.98142 10.1984 7.66428L12.1564 5.98705L9.58654 5.78103C9.10061 5.74207 8.67732 5.43453 8.49011 4.98442L7.50003 2.60397Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <div className="flex items-center col-span-8 md:col-span-18">
                      <Image
                        alt=""
                        loading="lazy"
                        width={20}
                        height={20}
                        decoding="async"
                        data-nimg={1}
                        className="mr-2"
                        src={
                          league.leagueLogo ?? "/assets/images/logo-default.png"
                        }
                        style={{ color: "transparent" }}
                      />
                      <span className="text-xs mr-2 font-medium md:text-sm">
                        {league.countryName}: {league.leagueName}
                      </span>
                      <button
                        data-state="closed"
                        className="flex items-center justify-center  hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-full md:h-9 md:w-9"
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
                    <button
                      data-state="closed"
                      className="rounded flex items-center justify-center  hover:bg-accent hover:text-accent-foreground col-span-1 w-full h-full"
                    >
                      <svg
                        width={15}
                        height={15}
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        type="button"
                        aria-controls="radix-:r1ud:"
                        aria-expanded="true"
                        data-state="open"
                      >
                        <path
                          d="M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.38523C7.64964 4.20492 7.35036 4.20492 7.15803 4.38523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <div>
                    <div className="w-full flex text-sm bg-primary/10 sm:rounded-md px-4 text-black dark:text-[#c8cdcd] py-1">
                      <span>Round {league.round}</span>
                    </div>
                    {league.matches.map((match, idx) => {
                      return (
                        <a
                          title="Click để có thông tin trận đấu!"
                          className="border-b border-muted py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/5 grid grid-cols-10 items-center md:grid-cols-20 md:text-sm"
                          href={`/tran-dau/${match.matchId}`}
                          key={idx}
                        >
                          <div className="col-span-1" />
                          <div className="hidden items-center justify-center col-span-3 md:flex">
                            <p>{formattedDate(match.matchAt)}</p>
                          </div>
                          <div className="flex flex-col gap-1 md:px-2 px-0 col-span-4 md:col-span-8 md:gap-2">
                            <TeamInfo
                              logo={match.homeLogo}
                              name={match.homeName}
                              red={match.homeRed}
                              isActive={match.homeScore > match.awayScore}
                            />
                            <TeamInfo
                              logo={match.awayLogo}
                              name={match.awayName}
                              red={match.awayRed}
                              isActive={match.homeScore < match.awayScore}
                            />
                          </div>
                          <div className="md:hidden items-center text-center justify-center col-span-1 grid">
                            <p>21.07 01:30</p>
                          </div>
                          <div className="col-span-1 justify-center  flex md:col-span-2">
                            <div className="flex flex-col px-2 gap-1 md:gap-2">
                              <p>{match.homeScore}</p>
                              <p>{match.awayScore}</p>
                            </div>
                          </div>
                          <div className="col-span-1 md:justify-start justify-center flex md:col-span-2">
                            <div className="flex flex-col px-0 gap-1 md:px-2 md:gap-2">
                              <button data-state="closed">
                                <p className="flex items-center gap-1">
                                  <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth={0}
                                    viewBox="0 0 512 512"
                                    className="w-3 h-3 md:w-4 md:h-4"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M247 32v298.582l-41.893 22.178c-3.534 10.965-9.343 20.92-16.877 29.303l67.77-35.88 105.512 55.86c-65.754 32.576-140.177 33.31-206.332 2.242C146.677 407.328 137.53 409 128 409c-7.938 0-15.606-1.17-22.863-3.313L18 451.817v20.365l113.213-59.936c78.502 43.595 171.072 43.595 249.574 0L494 472.182v-20.364L265 330.582V143.756c25.495-1.29 37.302-7.34 55 .244 29.395 23.17 64 48 96 48l-16-32c-48 0-53.708-90.33-80-112-19.185-11.34-29.794-15.214-55-15.88V32h-18zM116.963 265.975c-15.102 2.65-28.325 10.627-37.65 21.957L80 288l5.658 25.99-20.61 12.035c-.02.658-.048 1.313-.048 1.975 0 9.597 2.134 18.675 5.94 26.8l1.53-2.8 26.145 4.893 3.426 26.377-2.284 1.085C108.244 388.6 117.83 391 128 391c3.24 0 6.42-.244 9.525-.71l-6.257-6.618L144 360.316l26.146 4.89 1.124 8.64c10.107-9.54 17.04-22.395 19.09-36.87l-7.628 3.883-18.808-18.81L176 298.35l8.31 1.316c-6.132-12.207-16.102-22.12-28.357-28.17l.094 1.15-24.547 10.25-14.537-16.92zM128 304l18.81 18.81-12.078 23.7-26.27-4.16-4.163-26.274L128 304z" />
                                  </svg>
                                  {match.homeCorner}
                                </p>
                              </button>
                              <button data-state="closed">
                                <p className="flex items-center gap-1">
                                  <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth={0}
                                    viewBox="0 0 512 512"
                                    className="w-3 h-3 md:w-4 md:h-4"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M247 32v298.582l-41.893 22.178c-3.534 10.965-9.343 20.92-16.877 29.303l67.77-35.88 105.512 55.86c-65.754 32.576-140.177 33.31-206.332 2.242C146.677 407.328 137.53 409 128 409c-7.938 0-15.606-1.17-22.863-3.313L18 451.817v20.365l113.213-59.936c78.502 43.595 171.072 43.595 249.574 0L494 472.182v-20.364L265 330.582V143.756c25.495-1.29 37.302-7.34 55 .244 29.395 23.17 64 48 96 48l-16-32c-48 0-53.708-90.33-80-112-19.185-11.34-29.794-15.214-55-15.88V32h-18zM116.963 265.975c-15.102 2.65-28.325 10.627-37.65 21.957L80 288l5.658 25.99-20.61 12.035c-.02.658-.048 1.313-.048 1.975 0 9.597 2.134 18.675 5.94 26.8l1.53-2.8 26.145 4.893 3.426 26.377-2.284 1.085C108.244 388.6 117.83 391 128 391c3.24 0 6.42-.244 9.525-.71l-6.257-6.618L144 360.316l26.146 4.89 1.124 8.64c10.107-9.54 17.04-22.395 19.09-36.87l-7.628 3.883-18.808-18.81L176 298.35l8.31 1.316c-6.132-12.207-16.102-22.12-28.357-28.17l.094 1.15-24.547 10.25-14.537-16.92zM128 304l18.81 18.81-12.078 23.7-26.27-4.16-4.163-26.274L128 304z" />
                                  </svg>
                                  {match.awayCorner}
                                </p>
                              </button>
                            </div>
                          </div>
                          <div
                            data-orientation="vertical"
                            role="none"
                            className="shrink-0 bg-border h-full w-[1px] hidden md:block"
                          />
                          <div className="col-span-2 pr-1 flex items-center justify-around md:pr-0 md:col-span-3" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <Empty />
          )}
      </div>
      <div className=" border-t border-b md:border-b-0 flex justify-center items-center">
        <span className="cursor-pointer hover:underline p-3 w-32 text-center text-[13px]">
          Hiển thị thêm
        </span>
      </div>
    </Animation>
  );
};

export default MatchSchedule;
