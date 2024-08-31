"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getMostReadArticles } from "@/services/news";
import Empty from "../home/Skeleton/Empty";
import SidebarSkeleton from "./SidebarSkeleton";

const SidebarItem = ({
  title,
  imageUrl,
  link,
}: {
  title: string;
  imageUrl: string;
  link: string;
}) => {
  return (
    <Link className="group col-span-1 flex gap-2" href={link}>
      <Image
        alt=""
        loading="lazy"
        width={100}
        height={70}
        decoding="async"
        data-nimg={1}
        className="object-cover rounded-lg border w-32 h-20 md:w-28"
        src={imageUrl || "/assets/images/logo-default.png"}
        style={{ color: "transparent" }}
      />
      <div className="flex-1 items-center justify-start flex">
        <p className="font-medium text-sm line-clamp-3 group-hover:underline md:text-base">
          {title}
        </p>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!articles && loading) {
      getMostReadArticles()
        .then(({ data }: any) => setArticles(data))
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) return <SidebarSkeleton />;

  return (
    <aside className="w-full md:w-3/12">
      <div className="w-full bg-card p-2 mt-2 md:mt-0 md:rounded-md md:border md:p-4">
        <p className="text-lg font-semibold text-primary">Đọc Nhiều nhất</p>
        <div className="grid grid-cols-1 gap-3 mt-2">
          {articles?.length ? (
            articles?.map((article, index) => (
              <SidebarItem
                key={index}
                title={article.title}
                imageUrl={article.thumbnails}
                link={article.slug}
              />
            ))
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
