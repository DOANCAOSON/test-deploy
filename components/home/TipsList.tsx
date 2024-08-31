"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Empty from "./Skeleton/Empty";

function TipCard({
  slug,
  title,
  matchSummary,
  username,
  chosenOdds,
  avatar,
}: Tip) {
  return (
    <Link href={`/tips/${slug}`}>
      <div className="w-full rounded-lg border px-4 py-3 text-sm relative flex gap-2 bg-card transition-colors hover:bg-muted">
        <span className="relative flex max-h-10 max-w-10 shrink-0 overflow-hidden rounded-full">
          <Image
            className="aspect-square h-full w-full"
            alt={title}
            src={avatar || "/assets/images/logo-default.png"}
            width={100}
            height={100}
          />
        </span>
        <div className="flex flex-col items-start justify-center">
          <h5 className="mb-1 font-medium leading-none tracking-tight">
            {username}
          </h5>
          <div className="text-xs flex items-center gap-1">
            <span className="line-clamp-1">{matchSummary.homeName}</span>
            <span>-</span>
            <span className="line-clamp-1">{matchSummary.awayName}</span>
          </div>
        </div>
        <div className="inline-flex items-center border sm:max-w-[95px] max-w-[75px] absolute top-1 right-1 px-3 py-0.5 rounded-full font-medium text-xs bg-primary text-primary-foreground shadow hover:bg-primary/80">
          {chosenOdds}
        </div>
      </div>
    </Link>
  );
}

function TipsList({ tips }: { tips: Tip[] | null }) {
  if (!tips?.length) return <Empty />;
  return (
    <div className="mt-4 flex flex-col gap-2">
      {tips.map((tip, index) => (
        <TipCard key={index} {...tip} />
      ))}
    </div>
  );
}

TipsList.propTypes = {};

export default TipsList;
