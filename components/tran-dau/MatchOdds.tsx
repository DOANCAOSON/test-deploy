'use client'

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getSportOdds } from "@/services/sport";
import Empty from "../home/Skeleton/Empty";

function MatchOdds({ matchId }: { matchId: string }) {
  const [data, setData] = useState<MatchOdds | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data && loading) {
      getSportOdds(matchId)
        .then(({ data }: any) => setData(data))
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) return <Empty loading={loading} />;
  return (
    <div
      data-state="active"
      data-orientation="horizontal"
      role="tabpanel"
      aria-labelledby="radix-:rnb:-trigger-odds"
      id="radix-:rnb:-content-odds"
      tabIndex={0}
      className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-0"
    >
      <div dir="ltr" data-orientation="horizontal" className="w-full">
        <div dir="ltr" className="relative overflow-hidden">
          <div
            data-radix-scroll-area-viewport
            className="h-full w-full rounded-[inherit]"
            style={{ overflow: "scroll" }}
          >
            <div style={{ minWidth: "100%", display: "table" }}>
              <div
                role="tablist"
                aria-orientation="horizontal"
                className="bg-muted p-1 text-muted-foreground rounded-none mt-3 md:rounded w-full flex items-center justify-start h-10"
                tabIndex={0}
                data-orientation="horizontal"
                style={{ outline: "none" }}
              >
                {[
                  "TỶ LỆ 1X2",
                  "T/X",
                  "AH",
                  "EH",
                  "DC",
                  "HT/FT",
                  "TS",
                  "O/E",
                  "BTS",
                ].map((tab, index) => (
                  <button
                    key={index}
                    type="button"
                    role="tab"
                    aria-selected={index === 0}
                    aria-controls={`radix-:ro2:-content-${tab
                      .toLowerCase()
                      .replace("/", "_")}`}
                    data-state={index === 0 ? "active" : "inactive"}
                    id={`radix-:ro2:-trigger-${tab
                      .toLowerCase()
                      .replace("/", "_")}`}
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                      index === 0
                        ? "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
                        : ""
                    } py-1.5`}
                    tabIndex={index === 0 ? 0 : -1}
                    data-orientation="horizontal"
                    data-radix-collection-item
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          data-state="active"
          data-orientation="horizontal"
          role="tabpanel"
          aria-labelledby="radix-:ro2:-trigger-odds1x2"
          id="radix-:ro2:-content-odds1x2"
          tabIndex={0}
          className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          style={{}}
        >
          <div className="w-full text-[11px]">
            <div className="grid bg-muted w-full grid-cols-20 rounded-none md:rounded px-3 py-1.5 font-medium">
              <div className="col-span-11">NHÀ CÁI</div>
              <div className="col-span-3 mr-4 text-center">1</div>
              <div className="col-span-3 mr-2 text-center">X</div>
              <div className="col-span-3 text-center">2</div>
            </div>
            {data?.europeOdds.map((odds, index) => (
              <div
                key={index}
                className="grid w-full grid-cols-20 rounded px-3 py-4 text-xs border-b border-muted"
              >
                <div className="col-span-11" />
                <div className="col-span-3 mr-4 flex items-center justify-center">
                  <div className="w-fit flex items-center justify-center rounded border bg-accent text-card-foreground px-0.5 gap-2 md:p-1 md:px-2 md:rounded-md">
                    <svg
                      width={15}
                      height={15}
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 md:w-4 md:h-4 text-green-600"
                    >
                      <path
                        d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      />
                    </svg>
                    {odds.instantHome}
                  </div>
                </div>
                <div className="col-span-3 mr-2 flex items-center justify-center">
                  <div className="w-fit flex items-center justify-center rounded border bg-accent text-card-foreground px-0.5 gap-2 md:p-1 md:px-2 md:rounded-md">
                    <svg
                      width={15}
                      height={15}
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 md:w-4 md:h-4 text-green-600"
                    >
                      <path
                        d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      />
                    </svg>
                    {odds.instantDraw}
                  </div>
                </div>
                <div className="col-span-3 flex items-center justify-center">
                  <div className="w-fit flex items-center justify-center rounded border bg-accent text-card-foreground px-0.5 gap-2 md:p-1 md:px-2 md:rounded-md">
                    <svg
                      width={15}
                      height={15}
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 md:w-4 md:h-4 text-red-600"
                    >
                      <path
                        d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      />
                    </svg>
                    {odds.instantAway}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {["o_u", "ah", "eh", "dc", "ht_ft", "cs", "o_e", "bts"].map(
          (tab, index) => (
            <div
              key={index}
              data-state="inactive"
              data-orientation="horizontal"
              role="tabpanel"
              aria-labelledby={`radix-:ro2:-trigger-${tab}`}
              id={`radix-:ro2:-content-${tab}`}
              tabIndex={0}
              className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          )
        )}
      </div>
    </div>
  );
}

export default MatchOdds;
