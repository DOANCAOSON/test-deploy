"use client";

import { getRanksTips } from "@/services/tips";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Empty from "../home/Skeleton/Empty";

const Member = ({ username, avatar, totalTips, winRate }: Tip) => (
  <>
    <div className="flex items-center gap-2 justify-between">
      <div className="flex gap-2">
        <Image
          alt=""
          loading="lazy"
          width={50}
          height={50}
          decoding="async"
          className="w-10 h-10 object-contain rounded-full border p-0.5"
          src={avatar || "/assets/images/logo-default.png"}
          style={{ color: "transparent" }}
        />
        <div className="flex flex-col">
          <p className="font-semibold text-sm">{username}</p>
          <span className="text-xs text-center bg-primary/10 rounded w-fit px-2 py-0.5">
            {totalTips} tips
          </span>
        </div>
      </div>
      <span className="font-bold text-md text-primary">{winRate}%</span>
    </div>
    <div
      data-orientation="horizontal"
      role="none"
      className="shrink-0 bg-border h-[1px] w-full"
    />
  </>
);

const BXHMember = ({ className }: { className?: string }) => {
  const [data, setData] = useState<Tip[] | null>(null);

  useEffect(() => {
    if (!data) {
      getRanksTips().then(({ data }: any) => setData(data));
    }
  }, []);

  return (
    <aside className={`hidden md:block w-3/12 ${className}`}>
      <div className="space-y-4 w-full">
        <div className="w-full rounded-md border bg-card p-4">
          <p className="font-semibold">BXH THÀNH VIÊN</p>
          <div className="mt-4 flex flex-col gap-2">
            {data?.length ? (
              data.map((member, index) => <Member key={index} {...member} />)
            ) : (
              <Empty />
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default BXHMember;
