"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getCountries, getLeaguesById } from "@/services/sport";
import NationalSkeleton from "./Skeleton/NationalSkeleton";
import { Animation } from "../Animation";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import MatchLeagueSaved from "./MatchLeagueSaved";
import useMatchStore from "../bong-da/store-league";
import LeaguePinned from "./LeaguePinned";

function NationalTeam() {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { data } = useMatchStore();

  useEffect(() => {
    if (!countries && loading) {
      getCountries()
        .then(({ data }: any) => setCountries(data))
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <aside className="hidden md:flex md:flex-col md:w-3/12 lg:w-2/12">
      <div className="w-full">
        {!!data.length && (
          <>
            <div className="border-b border-border/40 flex items-center">
              <PinIcon />
              <p className="truncate uppercase text-sm font-medium">
                Giải đấu được ghim
              </p>
            </div>
            <div className="py-2 w-full">
              <LeaguePinned />
            </div>
          </>
        )}
        <div className="border-b border-border/40 flex items-center">
          <StarIcon />
          <p className="truncate uppercase text-sm font-medium">
            Đội bóng của tôi
          </p>
        </div>
        <div className="py-2 w-full">
          <MatchLeagueSaved />
        </div>
      </div>
      <div className="w-full">
        <div className="border-b border-border/40 py-1.5 flex items-center">
          <p className="truncate uppercase text-sm font-medium">Quốc gia</p>
        </div>
        <div className="w-full">
          {loading ? (
            <NationalSkeleton />
          ) : (
            countries?.map((country, idx) => (
              <CountryItem {...country} key={idx} />
            ))
          )}
        </div>
      </div>
    </aside>
  );
}

const StarIcon = () => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mr-2 h-5 w-5"
  >
    <path
      d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
      fill="currentColor"
    />
  </svg>
);

export const PinIcon = () => {
  return (
    <svg
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2 h-5 w-5 -rotate-45"
    >
      <path
        d="M9.62129 1.13607C9.81656 0.940808 10.1331 0.940809 10.3284 1.13607L11.3891 2.19673L12.8033 3.61094L13.8639 4.6716C14.0592 4.86687 14.0592 5.18345 13.8639 5.37871C13.6687 5.57397 13.3521 5.57397 13.1568 5.37871L12.5038 4.7257L8.86727 9.57443L9.97485 10.682C10.1701 10.8773 10.1701 11.1939 9.97485 11.3891C9.77959 11.5844 9.463 11.5844 9.26774 11.3891L7.85353 9.97491L6.79287 8.91425L3.5225 12.1846C3.32724 12.3799 3.01065 12.3799 2.81539 12.1846C2.62013 11.9894 2.62013 11.6728 2.81539 11.4775L6.08576 8.20714L5.0251 7.14648L3.61089 5.73226C3.41563 5.537 3.41562 5.22042 3.61089 5.02516C3.80615 4.8299 4.12273 4.8299 4.31799 5.02516L5.42557 6.13274L10.2743 2.49619L9.62129 1.84318C9.42603 1.64792 9.42603 1.33133 9.62129 1.13607Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
      <path
        d="M9.62129 1.13607C9.81656 0.940808 10.1331 0.940809 10.3284 1.13607L11.3891 2.19673L12.8033 3.61094L13.8639 4.6716C14.0592 4.86687 14.0592 5.18345 13.8639 5.37871C13.6687 5.57397 13.3521 5.57397 13.1568 5.37871L12.5038 4.7257L8.86727 9.57443L9.97485 10.682C10.1701 10.8773 10.1701 11.1939 9.97485 11.3891C9.77959 11.5844 9.463 11.5844 9.26774 11.3891L7.85353 9.97491L6.79287 8.91425L3.5225 12.1846C3.32724 12.3799 3.01065 12.3799 2.81539 12.1846C2.62013 11.9894 2.62013 11.6728 2.81539 11.4775L6.08576 8.20714L5.0251 7.14648L3.61089 5.73226C3.41563 5.537 3.41562 5.22042 3.61089 5.02516C3.80615 4.8299 4.12273 4.8299 4.31799 5.02516L5.42557 6.13274L10.2743 2.49619L9.62129 1.84318C9.42603 1.64792 9.42603 1.33133 9.62129 1.13607Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const PinnedIcon = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="-rotate-45 h-5 w-5 text-blue-600"
    >
      <path
        d="M9.62129 1.13607C9.81656 0.940808 10.1331 0.940809 10.3284 1.13607L11.3891 2.19673L12.8033 3.61094L13.8639 4.6716C14.0592 4.86687 14.0592 5.18345 13.8639 5.37871C13.6687 5.57397 13.3521 5.57397 13.1568 5.37871L12.5038 4.7257L8.86727 9.57443L9.97485 10.682C10.1701 10.8773 10.1701 11.1939 9.97485 11.3891C9.77959 11.5844 9.463 11.5844 9.26774 11.3891L7.85353 9.97491L6.79287 8.91425L3.5225 12.1846C3.32724 12.3799 3.01065 12.3799 2.81539 12.1846C2.62013 11.9894 2.62013 11.6728 2.81539 11.4775L6.08576 8.20714L5.0251 7.14648L3.61089 5.73226C3.41563 5.537 3.41562 5.22042 3.61089 5.02516C3.80615 4.8299 4.12273 4.8299 4.31799 5.02516L5.42557 6.13274L10.2743 2.49619L9.62129 1.84318C9.42603 1.64792 9.42603 1.33133 9.62129 1.13607Z"
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ></path>
      <path
        d="M9.62129 1.13607C9.81656 0.940808 10.1331 0.940809 10.3284 1.13607L11.3891 2.19673L12.8033 3.61094L13.8639 4.6716C14.0592 4.86687 14.0592 5.18345 13.8639 5.37871C13.6687 5.57397 13.3521 5.57397 13.1568 5.37871L12.5038 4.7257L8.86727 9.57443L9.97485 10.682C10.1701 10.8773 10.1701 11.1939 9.97485 11.3891C9.77959 11.5844 9.463 11.5844 9.26774 11.3891L7.85353 9.97491L6.79287 8.91425L3.5225 12.1846C3.32724 12.3799 3.01065 12.3799 2.81539 12.1846C2.62013 11.9894 2.62013 11.6728 2.81539 11.4775L6.08576 8.20714L5.0251 7.14648L3.61089 5.73226C3.41563 5.537 3.41562 5.22042 3.61089 5.02516C3.80615 4.8299 4.12273 4.8299 4.31799 5.02516L5.42557 6.13274L10.2743 2.49619L9.62129 1.84318C9.42603 1.64792 9.42603 1.33133 9.62129 1.13607Z"
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
};

const CountryItem = ({ country, countryId, countryLogo }: Country) => {
  const [isOpen, setIsOpen] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  if (!inView) {
    return <div ref={ref} style={{ height: "150px" }} />;
  }

  return (
    <Animation
      animationName="slideInFromLeft"
      inViewDefault={inView}
      data-state="closed"
      className="w-full mt-0.5"
    >
      <div
        className="w-full flex items-center justify-between rounded py-1.5 px-2 cursor-pointer hover:bg-primary/10"
        aria-controls={`radix-${country}`}
        aria-expanded="false"
        data-state="closed"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <Image
            alt={country}
            loading="lazy"
            width={20}
            height={20}
            decoding="async"
            className="mr-2 w-5 h-5 object-contain bg-white rounded"
            src={countryLogo || "/assets/images/logo-default.png"}
            style={{ color: "transparent" }}
          />
          <span className="text-xs mr-2 font-medium md:text-sm">{country}</span>
        </div>
        <DropdownIcon />
      </div>
      {isOpen && <LeagueItems isOpen={isOpen} countryId={countryId} />}
    </Animation>
  );
};

const LeagueItems = ({
  isOpen,
  countryId,
}: {
  isOpen: boolean;
  countryId: string;
}) => {
  const [data, setData] = useState<Country[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data && loading && isOpen) {
      getLeaguesById(countryId)
        .then(({ data }: any) => setData(data))
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  if (loading)
    return (
      <div className="flex flex-col items-end w-full">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-full h-4 mb-2 rounded"
          />
        ))}
      </div>
    );

  if (!data) return <></>;

  return (
    <div className="flex flex-col items-end w-full">
      {data[0].leagues.map((item, index) => (
        <LeagueItem {...item} key={index} />
      ))}
    </div>
  );
};

const LeagueItem = (item: League) => {
  return (
    <Link
      className="flex items-center mt-1 py-1 px-2 rounded cursor-pointer w-[90%] text-pretty hover:bg-primary/10"
      href={`/bong-da/${item.country}/${item.leagueId}`}
    >
      <Image
        alt=""
        loading="lazy"
        width={20}
        height={20}
        className="mr-2 w-4 h-4 object-contain bg-white rounded"
        src={item.logo || "/assets/images/logo-default.png"}
        style={{ color: "transparent" }}
      />
      <span className="text-xs mr-2 font-medium text-pretty flex flex-1 md:text-xs">
        {item.name}
      </span>
    </Link>
  );
};

const DropdownIcon = () => (
  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline col-span-1">
    <svg
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  </button>
);

export default NationalTeam;
