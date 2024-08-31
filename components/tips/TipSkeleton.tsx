import Link from "next/link";
import React from "react";

function TipSkeleton() {
  return (
    <div className="w-full rounded-md border bg-card p-2">
      <div className="flex items-center justify-between bg-primary/10 rounded p-2">
        <h1 className="md:text-sm text-xs font-semibold">TIPS BÓNG ĐÁ </h1>
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
      <div className="px-2 mt-6">
        <div className="my-5 flex items-start gap-2">
          <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-8 h-8 object-contain rounded-full border md:w-12 md:h-12" />
          <div className="flex flex-col flex-1">
            <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-16 h-4 rounded" />
            <div className="grid grid-cols-1 gap-2 mt-2 w-full px-3 py-5 h-24 bg-primary/5">
              <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-16 h-4 rounded" />
              <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-52 h-4 rounded" />
              <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-32 h-4 rounded" />
            </div>
            <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton mt-2 w-20 h-4 rounded" />
          </div>
        </div>
        <div
          data-orientation="horizontal"
          role="none"
          className="shrink-0 bg-border h-[1px] w-full"
        />
        <div className="my-5 flex items-start gap-2">
          <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-8 h-8 object-contain rounded-full border md:w-12 md:h-12" />
          <div className="flex flex-col flex-1">
            <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-16 h-4 rounded" />
            <div className="grid grid-cols-1 gap-2 mt-2 w-full px-3 py-5 h-24 bg-primary/5">
              <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-16 h-4 rounded" />
              <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-52 h-4 rounded" />
              <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-32 h-4 rounded" />
            </div>
            <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton mt-2 w-20 h-4 rounded" />
          </div>
        </div>
        <div
          data-orientation="horizontal"
          role="none"
          className="shrink-0 bg-border h-[1px] w-full"
        />
        <div className="my-5 flex items-start gap-2">
          <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-8 h-8 object-contain rounded-full border md:w-12 md:h-12" />
          <div className="flex flex-col flex-1">
            <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-16 h-4 rounded" />
            <div className="grid grid-cols-1 gap-2 mt-2 w-full px-3 py-5 h-24 bg-primary/5">
              <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-16 h-4 rounded" />
              <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-52 h-4 rounded" />
              <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-32 h-4 rounded" />
            </div>
            <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton mt-2 w-20 h-4 rounded" />
          </div>
        </div>
        <div
          data-orientation="horizontal"
          role="none"
          className="shrink-0 bg-border h-[1px] w-full"
        />
        <div className="my-5 flex items-start gap-2">
          <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-8 h-8 object-contain rounded-full border md:w-12 md:h-12" />
          <div className="flex flex-col flex-1">
            <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-16 h-4 rounded" />
            <div className="grid grid-cols-1 gap-2 mt-2 w-full px-3 py-5 h-24 bg-primary/5">
              <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-16 h-4 rounded" />
              <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-52 h-4 rounded" />
              <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-32 h-4 rounded" />
            </div>
            <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton mt-2 w-20 h-4 rounded" />
          </div>
        </div>
        <div
          data-orientation="horizontal"
          role="none"
          className="shrink-0 bg-border h-[1px] w-full"
        />
      </div>
      <div className="w-full mt-4 flex md:hidden">
        <div className="space-y-4 w-full">
          <div className="w-full rounded-md border bg-card p-4">
            <p className="font-semibold">BXH THÀNH VIÊN</p>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex flex-col gap-2 items-center justify-center text-muted-foreground py-6 md:py-10">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 512 512"
                  className="w-10 h-10 md:w-14 md:h-14"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256 48C141.1 48 48 141.1 48 256c0 114.7 93.3 208 208 208 114.9 0 208-93.1 208-208 0-114.7-93.3-208-208-208zm127.3 80.7c8.5 8.5 16.1 17.7 22.6 27.5.7 1 .9 2.4.4 3.5L391.9 201c-.4 1-1.1 1.9-2.1 2.3l-57.5 26.2c-1.4.6-3 .4-4.2-.6l-56.6-47.6a4.1 4.1 0 0 1-1.4-3.1v-63.1c0-1.3.7-2.6 1.8-3.3l38.4-26.1c1-.7 2.3-.9 3.5-.5 25.8 8.9 49.6 23.6 69.5 43.5zm-73.9 297.6c-.4 1.2-1.4 2.1-2.6 2.4-16.3 4.8-33.4 7.2-50.8 7.2-17.5 0-34.5-2.5-50.8-7.2-1.2-.4-2.2-1.3-2.6-2.4l-16.4-43c-.4-1.1-.3-2.3.2-3.3l22.3-42.3c.7-1.3 2.1-2.1 3.5-2.1h87.5c1.5 0 2.8.8 3.5 2.1l22.3 42.3c.5 1 .6 2.2.2 3.3l-16.3 43zm-67.4-311v63.1c0 1.2-.5 2.3-1.4 3.1L183.9 229c-1.2 1-2.8 1.2-4.2.6l-57.5-26.2c-1-.5-1.8-1.3-2.1-2.3l-14.4-41.2c-.4-1.2-.3-2.5.4-3.5 6.5-9.8 14.1-19 22.6-27.5 19.9-19.9 43.7-34.6 69.6-43.3 1.2-.4 2.5-.2 3.5.5l38.4 26.1c1.1.5 1.8 1.7 1.8 3.1zM77.7 264.1l36.1-31.2c1.2-1 2.9-1.3 4.3-.6l52.4 23.8c1.1.5 1.9 1.5 2.2 2.7l14.6 57.3c.2 1 .1 2-.3 2.9l-23.2 43.9c-.7 1.3-2.1 2.2-3.6 2.1l-46-.6c-1.2 0-2.4-.6-3.2-1.6-20.5-27.7-32.5-60.6-34.7-95.4 0-1.3.5-2.5 1.4-3.3zm270.4 98.7L325 319c-.5-.9-.6-1.9-.3-2.9l14.6-57.3c.3-1.2 1.1-2.2 2.2-2.7l52.4-23.8c1.4-.6 3.1-.4 4.3.6l36.1 31.2c.9.8 1.5 2 1.4 3.3-2.1 34.8-14.2 67.6-34.7 95.4-.7 1-1.9 1.6-3.2 1.6l-46.1.6c-1.5-.1-2.9-.9-3.6-2.2z" />
                </svg>
                <p className="text-sm ">Đang cập nhật ...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TipSkeleton.propTypes = {};

export default TipSkeleton;
