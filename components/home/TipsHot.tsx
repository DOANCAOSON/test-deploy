"use client";
import React, { useEffect, useState } from "react";
import TipsList from "./TipsList";
import Link from "next/link";
import { getTipsHome } from "@/services/article";
import { getMatchesLive } from "@/services/sport";
import TipSkeleton from "./Skeleton/TipSkeleton";
import LiveMatchList from "./LiveMatchCard";

function TipsHot() {
  const [tips, setTips] = useState<Tip[] | null>(null);
  const [lives, setLives] = useState<Match[] | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tips || (!lives && loading)) {
      Promise.all([getTipsHome(), getMatchesLive()])
        .then(([tips, lives]: any) => {
          setTips(tips.data);
          setLives(lives.data);
        })
        .finally(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, []);

  if (loading) return <TipSkeleton />

  return (
    <aside className="hidden xl:flex xl:w-3/12">
      <div className="w-full h-fit rounded-lg border p-2 text-sm transition-all bg-card">
        <div className="mt-4">
          <Link
            className="group flex items-center justify-between"
            href="/tips"
          >
            <span className="pl-3 border-l-4 border-primary/10 text-base">
              Tips hot hôm nay
            </span>
            <span className="text-xs flex items-center group-hover:underline">
              Xem thêm
              <svg
                width={15}
                height={15}
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.w-3.5"
              >
                <path
                  d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Link>
          <TipsList tips={tips} />
        </div>
        <div className="mt-4">
          <Link
            className="group flex items-center justify-between"
            href="/truc-tiep-bong-da"
          >
            <span className="pl-3 border-l-4 border-primary/10 text-base">
              Trận đấu trực tiếp hot
            </span>
            <span className="text-xs flex items-center group-hover:underline">
              Xem thêm
              <svg
                width={15}
                height={15}
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.w-3.5"
              >
                <path
                  d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Link>
          <LiveMatchList lives={lives} />
        </div>
      </div>
    </aside>
  );
}

export default TipsHot;
