"use client";

import Link from "next/link";
import { headers } from "next/headers";
import React, { useEffect, useState } from "react";
import { getParams } from "@/utils/query-param";
import { getNewsCategories } from "@/services/news";
import { usePathname } from "next/navigation";

const defaultCa: Category = {
  id: "all",
  title: "Tất cả",
  description: "",
  image: "",
  slug: "",
};
function Navbar() {
  const pathname = usePathname();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!data) {
      getNewsCategories().then(({ data }: any) => setData(data));
    }
  }, []);

  if (!data) return <></>;

  return (
    <div className="bg-background border-y border-primary/30">
      <div
        dir="ltr"
        className="relative overflow-hidden w-full whitespace-nowrap"
      >
        <div
          className="h-full w-full rounded-[inherit]"
          style={{ overflow: "scroll" }}
        >
          <div>
            <ul className="container flex items-end w-full gap-4 justify-start md:gap-10">
              {[defaultCa, ...data].map((category) => {
                const isActive =
                  pathname == `/tin-tuc${category.slug ? `/${category.slug}` : category.slug}`;
                
                return (
                  <li
                    key={category.id}
                    className={`relative hover:text-primary cursor-pointer flex ${
                      isActive ? "text-primary" : "text-stone-800"
                    }  dark:text-white`}
                  >
                    <Link
                      className="w-full flex items-center gap-1 py-2 flex-col md:flex-row"
                      href={`/tin-tuc/${category.slug}`}
                    >
                      <span className="font-semibold text-xs md:text-sm">
                        {category.title}
                      </span>
                      {isActive && (
                        <span className="w-full h-1 bg-primary absolute bottom-0 rounded-tl-full rounded-tr-full" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

Navbar.propTypes = {};

export default Navbar;
