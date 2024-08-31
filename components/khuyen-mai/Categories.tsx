"use client";
import { getPromotions } from "@/services/promotion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import Empty from "../home/Skeleton/Empty";

interface ImageCardProps {
  src: string;
  alt?: string;
}

interface ScrollAreaProps {
  children: React.ReactNode;
}

const ScrollArea: React.FC<ScrollAreaProps> = ({ children }) => {
  return (
    <div
      dir="ltr"
      className="flex items-end w-full gap-4 justify-start"
    >
      <div
        data-radix-scroll-area-viewport
        className="h-full w-full rounded-[inherit]"
        style={{ overflow: "scroll" }}
      >
        <div style={{ minWidth: "100%", display: "table" }}>{children}</div>
      </div>
    </div>
  );
};

const ImageCard: React.FC<ImageCardProps> = ({ src, alt }) => {
  return (
    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground w-full h-full p-0 rounded-none bg-transparent shadow-none duration-200 transition-transform hover:rounded-none hover:bg-transparent hover:-translate-y-2">
      <Image
        alt={alt || ""}
        loading="lazy"
        width={800}
        height={100}
        decoding="async"
        data-nimg={1}
        src={src}
        style={{ color: "transparent" }}
      />
    </button>
  );
};

function Categories({ categories }: { categories: PromotionCategory[] }) {
  const [categoryId, setCategoryId] = useState(categories[0]?.id);

  const [data, setData] = useState<Tournament[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPromotions(categoryId)
      .then(({ data }: any) => setData(data))
      .finally(() => setLoading(false));
  }, [categoryId]);

  return (
    <>
      <div className="flex items-end w-full gap-4 justify-start">
        <ScrollArea>
          {categories?.map((c) => (
            <button
              key={c.id}
              className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  shadow  h-9 uppercase  px-4 py-1 ${
                c.id === categoryId
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-background"
              }`}
              onClick={() => setCategoryId(c.id)}
            >
              {c.title}
            </button>
          ))}
        </ScrollArea>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mt-4 md:mt-6">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6">
            {data?.length ? (
              data?.map((d, idx) => (
                <ImageCard
                  key={idx}
                  src="https://okchoi68.com/_next/image?url=https%3A%2F%2Fbanhgioo.sgp1.digitaloceanspaces.com%2Fmedia%2Fimage%2Foi696z_file.png&w=828&q=75"
                />
              ))
            ) : (
              <Empty />
            )}
          </div>
        </div>
      )}
    </>
  );
}

Categories.propTypes = {};

export default Categories;
