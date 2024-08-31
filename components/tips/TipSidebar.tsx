"use client";

import React, { MouseEventHandler, useState } from "react";
import BXHMember from "./BXHMember";
import Image from "next/image";
import { onFollow, onUnFollow } from "@/services/account";
import ButtonLoad from "../Button";
import { useAppStore } from "@/store/app-store";

const TipSidebar = ({ userSummary }: { userSummary: UserSummary }) => {
  return (
    <aside className="hidden md:block w-3/12">
      <div className="space-y-4 w-full">
        <UserProfile {...userSummary} />
        <BXHMember className="w-full" />
      </div>
    </aside>
  );
};

const UserProfile = (userSummary: UserSummary) => {
  const {
    avatar,
    avgOdds,
    bio,
    isFollowing,
    roi,
    totalFollower,
    totalLike,
    totalTips,
    username,
    winRate,
    userId,
  } = userSummary;

  return (
    <div className="w-full rounded-md border bg-card p-4">
      <UserProfileImage avatar={avatar} username={username} />
      <UserName bio={bio} username={username} />
      <UserStatistics
        totalTips={totalTips}
        totalLike={totalLike}
        totalFollower={totalFollower}
      />
      <FollowButton isFollowing={isFollowing} userId={userId} />
      <UserMetrics
        winRate={winRate}
        roi={roi}
        avgOdds={avgOdds}
        totalTips={totalTips}
      />
    </div>
  );
};

const UserProfileImage = ({
  avatar,
  username,
}: {
  avatar: string | null;
  username: string;
}) => {
  return (
    <Image
      alt={username}
      loading="lazy"
      width={100}
      height={100}
      decoding="async"
      data-nimg={1}
      className="md:w-18 md:h-18 w-14 h-14 border object-contain p-1 rounded-full mx-auto"
      src={avatar || "/assets/images/logo-default.png"}
      style={{ color: "transparent" }}
    />
  );
};

const UserName = ({
  bio,
  username,
}: {
  bio: string | null;
  username: string;
}) => {
  return (
    <>
      <p className="text-center text-lg font-semibold">{username}</p>
      <p className="bg-primary/10 p-2 rounded text-sm">{bio || "..."}</p>
    </>
  );
};

const UserStatistics = ({
  totalTips,
  totalLike,
  totalFollower,
}: {
  totalTips: number;
  totalLike: number;
  totalFollower: number;
}) => {
  return (
    <div className="bg-primary/10 p-2 rounded text-sm mt-2 grid grid-cols-3">
      <StatisticItem value={totalTips} label="Bài viết" />
      <StatisticItem value={totalLike} label="Thích" />
      <StatisticItem value={totalFollower} label="Người theo dõi" />
    </div>
  );
};

const StatisticItem = ({
  value,
  label,
}: {
  value: number | string;
  label: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-primary font-semibold text-lg">{value}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
};

const FollowButton = ({
  isFollowing,
  userId,
}: {
  isFollowing: boolean;
  userId: string;
}) => {
  const isAuthorized = useAppStore((store) => store.isAuthorized);
  const onSetIsOpen = useAppStore((store) => store.onSetIsOpen);

  const [following, setFollowing] = useState<boolean | null>(isFollowing);
  const [loading, setLoading] = useState(false);

  const onClick = () => {
    if (!isAuthorized) return onSetIsOpen(true);
    setLoading(true);
    if (loading && following) {
      onUnFollow(userId)
        .then(({ isError }: any) => {
          !isError && setFollowing(!following);
        })
        .finally(() => setLoading(false));
    } else {
      onFollow(userId)
        .then(({ isError }: any) => {
          !isError && setFollowing(!following);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="mt-1 w-full">
      <ButtonLoad
        label={
          following ? (
            <span>Đã theo dõi</span>
          ) : (
            <>
              <svg
                width={15}
                height={15}
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-2"
              >
                <path
                  d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
              Theo dõi
            </>
          )
        }
        onClick={onClick}
        loading={loading}
        className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 rounded-md px-8 w-full text-sm border border-primary"
      />
    </div>
  );
};

const UserMetrics = ({
  winRate,
  roi,
  avgOdds,
  totalTips,
}: {
  winRate: number;
  roi: number;
  avgOdds: number;
  totalTips: number;
}) => {
  return (
    <div className="bg-primary/10 p-2 rounded text-sm mt-1 grid grid-cols-4">
      <MetricItem value={`${winRate}%`} label="Win Rate" />
      <MetricItem value={`${roi}%`} label="ROI" />
      <MetricItem value={totalTips} label="Tips" />
      <MetricItem value={avgOdds} label="Avg Odds" />
    </div>
  );
};

const MetricItem = ({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-primary font-semibold text-lg">{value}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
};

export default TipSidebar;
