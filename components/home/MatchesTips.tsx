"use client";

import React from "react";
import useHomeStore from "./store";
import Image from "next/image";
import Empty from "./Skeleton/Empty";
import { MatchTime } from "./MatchesItem";
import Link from "next/link";

function MatchesTips() {
  const { data } = useHomeStore();

  return (
    <div className="mt-2 w-full md:mt-4">
      <div className="infinite-scroll-component__outerdiv">
        <div
          className="infinite-scroll-component "
          style={{ height: "auto", overflow: "auto" }}
        >
          {data?.length ? (
            data.map((d, idx) => <MatchTips {...d} key={idx} />)
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </div>
  );
}

const MatchTips = ({
  leagueLogo,
  location,
  leagueName,
  matches,
}: Tournament) => {
  return (
    <div data-state="open" className="mt-2 w-full">
      <div className="grid bg-primary/10 shadow-sm w-full items-center h-8 grid-cols-12 md:h-10 sm:rounded-md md:grid-cols-20">
        <button
          data-state="closed"
          className="flex items-center justify-center col-span-1 h-8 w-8 rounded-full hover:bg-accent hover:text-accent-foreground md:h-9 md:w-9 "
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
        <div className="flex items-center col-span-6 md:col-span-12">
          <Image
            alt=""
            loading="lazy"
            width={20}
            height={20}
            decoding="async"
            data-nimg={1}
            className="mr-2 w-5 h-5 object-contain bg-white rounded"
            src={leagueLogo || "/assets/images/logo-default.png"}
            style={{ color: "transparent" }}
          />
          <span className="text-xs truncate mr-2 font-medium md:text-sm">
            {location}:
          </span>
          <span className="truncate text-xs hover:underline md:text-sm">
            {leagueName}
          </span>
          <button
            data-state="closed"
            className="flex items-center justify-center  hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-full  md:h-9 md:w-9"
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
        <div className="col-span-4 flex items-center justify-center text-xs md:col-span-6">
          <span className="w-1/4" />
          <span className="w-1/4 flex items-center justify-center text-center text-[10px] md:text-xs pl-1">
            Kèo chấp
          </span>
          <span className="w-1/4 flex items-center justify-center pl-2">1</span>
          <span className="w-1/4 flex items-center justify-center pl-2">2</span>
        </div>
        <button
          data-state="closed"
          className=" col-span-1 rounded w-full h-full flex items-center justify-center  hover:bg-accent hover:text-accent-foreground"
        >
          <svg
            width={15}
            height={15}
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            type="button"
            aria-controls="radix-:r6kh:"
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
      <div data-state="open" id="radix-:r6kh:" className="mt-2">
        {matches.map((match, idx) => (
          <MatchTip {...match} key={idx} />
        ))}
      </div>
    </div>
  );
};

const MatchTip = ({
  matchAt,
  status,
  homeLogo,
  homeName,
  awayLogo,
  awayName,
  homeScore,
  awayScore,
}: Match) => {
  return (
    <Link title="Click để có thông tin trận đấu!" href="/tran-dau/227139529">
      <div className="py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/5 grid grid-cols-12 items-center md:grid-cols-20 md:text-sm">
        <button
          data-state="closed"
          className="col-span-1 h-8 w-8 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground  md:h-9 md:w-9"
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
        <MatchTime
          matchAt={matchAt}
          status={status}
        />
        <div className="flex flex-col gap-1 col-span-3 md:col-span-8 md:gap-2">
          <div className="flex items-center gap-3">
            <Image
              alt=""
              loading="lazy"
              width={20}
              height={20}
              decoding="async"
              data-nimg={1}
              className="rounded w-5 h-5 object-contain bg-white"
              src={homeLogo  || '/assets/images/logo-default.png'}
              style={{ color: "transparent" }}
            />
            <p className="font-light whitespace-nowrap truncate">{homeName}</p>
          </div>
          <div className="flex items-center gap-3">
            <Image
              alt=""
              loading="lazy"
              width={20}
              height={20}
              decoding="async"
              data-nimg={1}
              className="rounded w-5 h-5 object-contain bg-white"
              src={awayLogo || '/assets/images/logo-default.png'}
              style={{ color: "transparent" }}
            />
            <p className="font-light whitespace-nowrap truncate">{awayName}</p>
          </div>
        </div>
        <div className="md:hidden items-center justify-end col-span-1 grid">
          <div className="text-center">Kết thúc</div>
        </div>
        <div className="col-span-1 flex justify-center md:justify-start">
          <div className="flex flex-col px-0 md:px-2 gap-2">
            <p>{homeScore}</p>
            <p>{awayScore}</p>
          </div>
        </div>
        <div
          data-orientation="vertical"
          role="none"
          className="shrink-0 bg-border h-full w-[1px]"
        />
        <div className="col-span-4 flex items-center justify-center text-[10px] font-light flex-col gap-0.5 md:flex-col md:col-span-6 md:gap-1 md:text-xs">
          <div className="w-full flex gap-1">
            <span className="w-1/4 flex items-center justify-end text-card-foreground gap-1 whitespace-nowrap shrink-0">
              Mở màn
            </span>
            <span className="w-1/4 flex items-center justify-center text-card-foreground gap-1 whitespace-nowrap shrink-0">
              -0.5
            </span>
            <span className="w-1/4 flex items-center justify-center text-card-foreground rounded border shrink-0 md:gap-1 md:p-1 md:rounded-md">
              0.95
            </span>
            <span className="w-1/4 flex items-center justify-center text-card-foreground rounded border shrink-0 md:gap-1 md:p-1 md:rounded-md">
              0.85
            </span>
          </div>
          <div className="w-full flex gap-1">
            <span className="w-1/4 flex items-center justify-end text-card-foreground gap-1 whitespace-nowrap shrink-0">
              Trước trận
            </span>
            <span className="w-1/4 flex items-center justify-center text-card-foreground gap-1 whitespace-nowrap shrink-0 md:p-1 ">
              -
            </span>
            <span className="w-1/4 flex items-center justify-center text-card-foreground rounded border shrink-0 md:gap-1 md:p-1 md:rounded-md">
              -
            </span>
            <span className="w-1/4 flex items-center justify-center text-card-foreground rounded border shrink-0 md:gap-1 md:p-1 md:rounded-md">
              -
            </span>
          </div>
          <div className="w-full flex gap-1">
            <span className="w-1/4 flex items-center justify-end text-card-foreground gap-1 whitespace-nowrap shrink-0">
              Trong trận
            </span>
            <span className="w-1/4 flex items-center justify-center text-card-foreground gap-1 whitespace-nowrap shrink-0 md:p-1 ">
              0 / -0.5
            </span>
            <span className="w-1/4 flex items-center justify-center text-card-foreground rounded border shrink-0 md:gap-1 md:p-1 md:rounded-md">
              <svg
                width={15}
                height={15}
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 md:w-4 md:h-4 text-red-600"
              >
                <path
                  d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
              0.90
            </span>
            <span className="w-1/4 flex items-center justify-center text-card-foreground rounded border shrink-0 md:gap-1 md:p-1 md:rounded-md">
              <svg
                width={15}
                height={15}
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 md:w-4 md:h-4 text-green-600"
              >
                <path
                  d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
              0.90
            </span>
          </div>
        </div>
      </div>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full"
      />
    </Link>
  );
};
MatchesTips.propTypes = {};

export default MatchesTips;
