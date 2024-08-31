"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getNewsDetail } from "@/services/news";
import Loading from "../Loading";
import { usePathname } from "next/navigation";

function NewsDetail() {
  const pathname = usePathname();
  const [data, setData] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const slug = pathname.split("/")[3];
  
  useEffect(() => {
    if (!data && loading && slug) {
      getNewsDetail({ slug })
        .then(({ data }: any) => setData(data))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) return <Loading />;

  if (!data) return <></>;

  return (
    <div className="w-full rounded-md border bg-card p-4">
      <p className="text-2xl font-semibold pb-4">{data.title}</p>
      <Image
        alt="Nhận định Dortmund vs Real Madrid vào 2h00 ngày 2/6: Chung kết C1"
        loading="lazy"
        width={900}
        height={600}
        decoding="async"
        data-nimg={1}
        className=""
        src={data.thumbnails}
        style={{ color: "transparent" }}
      />
      <article
        className="mt-4 ck-content"
        dangerouslySetInnerHTML={{
          __html: data.content,
        }}
      />
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full my-4"
      />
    </div>
  );
}

export default NewsDetail;
