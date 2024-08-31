"use client";
import { getMatchDetail } from "@/services/sport";
import React, { useEffect, useState } from "react";
import SkeletonMatch from "./SkeletonMatch";
import Image from "next/image";
import dayjs from "dayjs";
import { convertTimestampToDate } from "@/utils";
import VideoPlayer from "../VideoPlayer";
import MatchSummary from "./MatchSummary";

function MatchDetail() {
  const [data, setData] = useState<MatchDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data && loading) {
      getMatchDetail()
        .then(({ data }: any) => setData(data))
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) return <SkeletonMatch />;
  if (!data) return <></>;
  const { matchAt, status } = data;
  const time = convertTimestampToDate({ matchAt, status });

  return (
    <div className="lg:w-8/12 w-full">
      <div className="w-full flex items-start py-2 md:items-center justify-between bg-card text-card-foreground rounded-md md:py-4 md:border">
        <div className="w-1/3 md:pt-0 pt-2 flex gap-2 items-baseline md:items-center justify-center">
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-full -translate-y-1/2 md:h-9 md:w-9">
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
          <div className="flex flex-col gap-2 items-center justify-center">
            <Image
              alt=""
              loading="lazy"
              width={100}
              height={100}
              decoding="async"
              data-nimg={1}
              className="md:w-20 md:h-20 w-14 h-14 bg-card rounded-lg border object-contain p-2"
              src={data.homeLogo}
              style={{ color: "transparent" }}
            />
            <p className="text-sm text-center md:text-base">{data.homeName}</p>
          </div>
        </div>
        <div className="w-1/3 flex items-center justify-center flex-col gap-2">
          <p className="text-sm">
            {dayjs.unix(data.matchTime).format("DD.MM.YYYY HH:mm")}
          </p>
          <div className="md:text-[46px] text-3xl flex gap-4 font-extrabold">
            <span>{data.homeScore}</span>
            <span>-</span>
            <span>{data.awayScore}</span>
          </div>
          <div className="text-sm flex items-center justify-center flex-col">
            <div
              className="text-center"
              dangerouslySetInnerHTML={{
                __html: time,
              }}
            ></div>
          </div>
        </div>
        <div className="items-baseline md:items-center md:pt-0 pt-2 w-1/3 flex gap-2 justify-center">
          <div className="flex flex-col gap-2 items-center justify-center">
            <Image
              alt=""
              loading="lazy"
              width={100}
              height={100}
              decoding="async"
              data-nimg={1}
              className="md:w-20 md:h-20 w-14 h-14 bg-card rounded-lg border object-contain p-2"
              src={data.awayLogo}
              style={{ color: "transparent" }}
            />
            <p className="text-sm text-center md:text-base">{data.awayName}</p>
          </div>
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-full -translate-y-1/2 md:h-9 md:w-9">
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
        </div>
      </div>
      <div className="w-full mt-4">
        <div className="w-full h-full">
          <div style={{ width: "100%", height: "100%" }}>
            {data.playSd && <VideoPlayer src={data.playSd ?? ""} />}
          </div>
        </div>
      </div>
      <div className="w-full mt-4 h-[600px] bg-stone-400">
        <iframe
          src={`https://www.isportslive8.com/football/detail.html?matchId=${data.matchId}&accessKey=Je8LZdXSUoRKPrQQmjKpUqeNlxMrWGXR&lang=vi`}
          frameBorder={0}
          title="animation"
          width="100%"
          height="100%"
        />
      </div>
      <MatchSummary
        matchId={data.matchId}
        europeOdds={data?.odds?.europeOdds? data?.odds?.europeOdds:[]}
        leagueId={data.leagueId}
        subLeagueId={data.subLeagueId}
      />
    </div>
  );
}

MatchDetail.propTypes = {};

export default MatchDetail;
