"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TipSkeleton from "./TipSkeleton";
import { getTips } from "@/services/tips";
import Empty from "../home/Skeleton/Empty";
import { useInView } from "react-intersection-observer";
import { Animation } from "../Animation";

const Tip = ({
  username,
  title,
  matchSummary,
  slug,
  createdAt,
  chosenOdds,
}: Tip) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  if (!inView) {
    return <div ref={ref} style={{ height: "150px" }} />;
  }

  return (
    <Animation animationName="slideInFromLeft" inViewDefault={inView}>
      <div className="flex items-start gap-2">
        <Image
          alt=""
          loading="lazy"
          width={100}
          height={100}
          decoding="async"
          data-nimg={1}
          className="md:w-12 md:h-12 w-8 h-8 object-contain rounded-full border"
          src="https://okchoi68.com/_next/image?url=%2Fassets%2Fimages%2Flogo-default.png&w=128&q=75"
          style={{ color: "transparent" }}
        />
        <div className="flex flex-col flex-1">
          <Link className="md:text-sm text-[13px] font-semibold" href="#">
            {username}
          </Link>
          <Link className="font-semibold" href={`/tips/${slug}`}>
            <div className="border text-card-foreground mt-2 py-2 bg-primary/5 rounded shadow-none hover:bg-primary/10">
              <div className="flex flex-col space-y-1.5 p-6 px-3 py-2">
                <h3 className="font-semibold tracking-tight line-clamp-1 w-full md:text-base text-sm">
                  {title}
                </h3>
              </div>
              <div className="p-6 px-3 py-0 mt-0">
                <div className="text-muted-foreground text-xs md:text-sm flex items-center gap-2">
                  <span className="line-clamp-1">{matchSummary.matchTime}</span>
                  <span>
                    <svg
                      width={15}
                      height={15}
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="line-clamp-1">
                    {matchSummary.leagueName}
                  </span>
                </div>
                <div className="mt-1 flex gap-2">
                  <div className="inline-flex items-center border sm:max-w-[95px] max-w-[75px] h-[16px] md:h-full text-[10px] md:text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80 px-3 py-0.5 rounded-full font-semibold">
                    {chosenOdds}
                  </div>
                  <span className="line-clamp-1">{matchSummary.homeName}</span>
                  <span>-</span>
                  <span className="line-clamp-1">{matchSummary.awayName}</span>
                </div>
              </div>
            </div>
          </Link>
          <div className="flex items-center justify-between md:text-sm text-xs mt-2 text-muted-foreground">
            <span>{createdAt}</span>
          </div>
        </div>
      </div>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full"
      />
    </Animation>
  );
};

const TipList = () => {
  const [data, setData] = useState<Tip[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data && loading) {
      getTips()
        .then(({ data }: any) => setData(data))
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) return <TipSkeleton />;

  return (
    <main className="w-full md:w-9/12">
      <div className="w-full rounded-md border bg-card p-2">
        <div className="flex items-center justify-between bg-primary/10 rounded p-2">
          <h1 className="md:text-sm text-xs font-semibold">TIPS BÓNG ĐÁ</h1>
          <Link href="/tips/gui-bai">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
              <svg
                width={15}
                height={15}
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="-rotate-45 mr-1 -translate-y-[2px]"
              >
                <path
                  d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22092 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22092 7.10002 9 7.10002H4.84553Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
              <span className="md:text-sm text-xs font-semibold">Gửi Bài</span>
            </button>
          </Link>
        </div>
        <div className="flex flex-col gap-4 mt-4 md:text-sm text-xs">
          {data?.length ? (
            data.map((tip, index) => <Tip key={index} {...tip} />)
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </main>
  );
};

export default TipList;
