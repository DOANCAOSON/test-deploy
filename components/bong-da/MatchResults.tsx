import { useEffect, useState } from "react";
import { getLeagueSchedulesFnished } from "@/services/sport";
import Image from "next/image";
import { handleConvertData } from "../home/store";
import { formattedDate } from "@/utils/datime";
import { TeamInfo } from "../home/MatchesItem";

const MatchResults = () => {
  const [results, setResults] = useState<Tournament[]>();

  useEffect(() => {
    if (!results) {
      getLeagueSchedulesFnished().then(({ data }: any) => {
        setResults(handleConvertData(data) as Tournament[]);
      });
    }
  }, []);

  return (
    <div className="w-full mt-4 sm:rounded-md sm:border sm:bg-card sm:text-card-foreground sm:py-0 sm:px-2">
      <div data-state="open" className="mt-2 w-full">
        <div data-state="open" id="radix-:r1uc:" className="mt-2">
          {results?.map((result, index) => {
            return (
              <div key={index}>
                <div className="grid bg-primary/10 shadow-sm w-full h-8 grid-cols-10 md:h-10 sm:rounded-md md:grid-cols-20">
                  <div className="col-span-1" />
                  <div className="flex items-center col-span-8 md:col-span-18">
                    <Image
                      alt={result.leagueName}
                      loading="lazy"
                      width={20}
                      height={20}
                      decoding="async"
                      data-nimg={1}
                      className="mr-2"
                      src={
                        result.leagueLogo ?? "/assets/images/logo-default.png"
                      }
                      style={{ color: "transparent" }}
                    />
                    <span className="text-xs mr-2 font-medium md:text-sm">
                      {result.countryName}: {result.leagueName}
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
                      aria-controls="radix-:r1uc:"
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
                  {result.round ? (
                    <div className="w-full flex text-sm bg-primary/10 sm:rounded-md px-4 text-black dark:text-[#c8cdcd] py-1">
                      <span>Round {result.round}</span>
                    </div>
                  ) : (
                    ""
                  )}
                  {result.matches.map((match, idx) => {
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
          })}
        </div>
      </div>
      <div className=" border-t border-b md:border-b-0 flex justify-center items-center">
        <span className="cursor-pointer hover:underline p-3 w-32 text-center text-[13px]">
          Hiển thị thêm
        </span>
      </div>
    </div>
  );
};

export default MatchResults;
