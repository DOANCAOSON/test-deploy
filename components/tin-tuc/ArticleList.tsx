"use client";

import React, { useEffect, useState } from "react";
import ArticleItem from "./ArticleItem";
import { getHotArticles, getNewArticles } from "@/services/news";
import Empty from "../home/Skeleton/Empty";
import ArticleSkeleton from "./ArticleSkeleton";
import { usePathname } from "next/navigation";

const ArticleList = () => {
  const pathname = usePathname();
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!articles && loading) {
      getNewArticles(pathname.split('/')[2] ?? '')
        .then(({ data }: any) => setArticles(data))
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) return <ArticleSkeleton />;

  return (
    <div className="w-full bg-card p-2 mt-2 sm:rounded-md sm:border sm:p-4">
      <p className="text-lg font-semibold text-primary sm:text-2xl">Mới nhất</p>
      <div className="grid grid-cols-1 gap-2 mt-2 md:gap-6">
        {articles?.length ? (
          articles.map((article, index) => (
            <ArticleItem key={index} {...article} />
          ))
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

export const ArticleHotList = () => {
  const pathname = usePathname();
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!articles && loading) {
      getHotArticles(pathname.split('/')[2] ?? '')
        .then(({ data }: any) => setArticles(data))
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) return <ArticleSkeleton />;

  return (
    <div className="w-full bg-card p-2 sm:rounded-md sm:border sm:p-4">
      <p className="text-lg font-semibold text-primary sm:text-2xl">HOT</p>
      <div className="grid mt-2 grid-cols-3 gap-2 md:gap-6">
        {articles?.length ? (
          articles.map((article, index) => (
            <ArticleItem
              key={index}
              {...article}
              layout={!index ? "row" : "col"}
            />
          ))
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

export default ArticleList;
