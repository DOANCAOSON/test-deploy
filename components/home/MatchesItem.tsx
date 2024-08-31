import { convertTimestampToDate } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Animation } from "../Animation";
import { useInView } from "react-intersection-observer";
import useHomeStore from "./store";

export const StarIcon = () => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
  >
    <path
      d="M6.97942 1.25171L6.9585 1.30199L5.58662 4.60039C5.54342 4.70426 5.44573 4.77523 5.3336 4.78422L1.7727 5.0697L1.71841 5.07405L1.38687 5.10063L1.08608 5.12475C0.820085 5.14607 0.712228 5.47802 0.914889 5.65162L1.14406 5.84793L1.39666 6.06431L1.43802 6.09974L4.15105 8.42374C4.23648 8.49692 4.2738 8.61176 4.24769 8.72118L3.41882 12.196L3.40618 12.249L3.32901 12.5725L3.25899 12.866C3.19708 13.1256 3.47945 13.3308 3.70718 13.1917L3.9647 13.0344L4.24854 12.861L4.29502 12.8326L7.34365 10.9705C7.43965 10.9119 7.5604 10.9119 7.6564 10.9705L10.705 12.8326L10.7515 12.861L11.0354 13.0344L11.2929 13.1917C11.5206 13.3308 11.803 13.1256 11.7411 12.866L11.671 12.5725L11.5939 12.249L11.5812 12.196L10.7524 8.72118C10.7263 8.61176 10.7636 8.49692 10.849 8.42374L13.562 6.09974L13.6034 6.06431L13.856 5.84793L14.0852 5.65162C14.2878 5.47802 14.18 5.14607 13.914 5.12475L13.6132 5.10063L13.2816 5.07405L13.2274 5.0697L9.66645 4.78422C9.55432 4.77523 9.45663 4.70426 9.41343 4.60039L8.04155 1.30199L8.02064 1.25171L7.89291 0.944609L7.77702 0.665992C7.67454 0.419604 7.32551 0.419604 7.22303 0.665992L7.10715 0.944609L6.97942 1.25171ZM7.50003 2.60397L6.50994 4.98442C6.32273 5.43453 5.89944 5.74207 5.41351 5.78103L2.84361 5.98705L4.8016 7.66428C5.17183 7.98142 5.33351 8.47903 5.2204 8.95321L4.62221 11.461L6.8224 10.1171C7.23842 9.86302 7.76164 9.86302 8.17766 10.1171L10.3778 11.461L9.77965 8.95321C9.66654 8.47903 9.82822 7.98142 10.1984 7.66428L12.1564 5.98705L9.58654 5.78103C9.10061 5.74207 8.67732 5.43453 8.49011 4.98442L7.50003 2.60397Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

const StartFillIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-yellow-400"
  >
    <path
      d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
      fill="currentColor"
    ></path>
  </svg>
);

export const ArrowIcon = () => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="-rotate-45 h-5 w-5"
  >
    <path
      d="M9.62129 1.13607C9.81656 0.940808 10.1331 0.940809 10.3284 1.13607L11.3891 2.19673L12.8033 3.61094L13.8639 4.6716C14.0592 4.86687 14.0592 5.18345 13.8639 5.37871C13.6687 5.57397 13.3521 5.57397 13.1568 5.37871L12.5038 4.7257L8.86727 9.57443L9.97485 10.682C10.1701 10.8773 10.1701 11.1939 9.97485 11.3891C9.77959 11.5844 9.463 11.5844 9.26774 11.3891L7.85353 9.97491L6.79287 8.91425L3.5225 12.1846C3.32724 12.3799 3.01065 12.3799 2.81539 12.1846C2.62013 11.9894 2.62013 11.6728 2.81539 11.4775L6.08576 8.20714L5.0251 7.14648L3.61089 5.73226C3.41563 5.537 3.41562 5.22042 3.61089 5.02516C3.80615 4.8299 4.12273 4.8299 4.31799 5.02516L5.42557 6.13274L10.2743 2.49619L9.62129 1.84318C9.42603 1.64792 9.42603 1.33133 9.62129 1.13607Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

export const DropdownIcon = () => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.38523C7.64964 4.20492 7.35036 4.20492 7.15803 4.38523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

export const TipsIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    className="w-3 h-3 md:w-4 md:h-4"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M247 32v298.582l-41.893 22.178c-3.534 10.965-9.343 20.92-16.877 29.303l67.77-35.88 105.512 55.86c-65.754 32.576-140.177 33.31-206.332 2.242C146.677 407.328 137.53 409 128 409c-7.938 0-15.606-1.17-22.863-3.313L18 451.817v20.365l113.213-59.936c78.502 43.595 171.072 43.595 249.574 0L494 472.182v-20.364L265 330.582V143.756c25.495-1.29 37.302-7.34 55 .244 29.395 23.17 64 48 96 48l-16-32c-48 0-53.708-90.33-80-112-19.185-11.34-29.794-15.214-55-15.88V32h-18zM116.963 265.975c-15.102 2.65-28.325 10.627-37.65 21.957L80 288l5.658 25.99-20.61 12.035c-.02.658-.048 1.313-.048 1.975 0 9.597 2.134 18.675 5.94 26.8l1.53-2.8 26.145 4.893 3.426 26.377-2.284 1.085C108.244 388.6 117.83 391 128 391c3.24 0 6.42-.244 9.525-.71l-6.257-6.618L144 360.316l26.146 4.89 1.124 8.64c10.107-9.54 17.04-22.395 19.09-36.87l-7.628 3.883-18.808-18.81L176 298.35l8.31 1.316c-6.132-12.207-16.102-22.12-28.357-28.17l.094 1.15-24.547 10.25-14.537-16.92zM128 304l18.81 18.81-12.078 23.7-26.27-4.16-4.163-26.274L128 304z"></path>
  </svg>
);

export const HotIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth={0}
    viewBox="0 0 24 24"
    className=" text-[#ff0046] w-5 h-5 md:h-6 md:w-6"
  >
    <g id="Stream_On">
      <g>
        <path d="M6.26,19.089A9.625,9.625,0,0,1,6.234,4.911C6.709,4.475,6,3.769,5.527,4.2A10.516,10.516,0,0,0,5.553,19.8c.475.433,1.184-.273.707-.707Z"></path>
        <path d="M8.84,15.706a5.024,5.024,0,0,1-.014-7.412c.474-.437-.234-1.143-.707-.707a6.028,6.028,0,0,0,.014,8.826c.474.434,1.183-.272.707-.707Z"></path>
        <circle cx="12" cy="12" r="1.244"></circle>
        <path d="M17.74,4.911a9.625,9.625,0,0,1,.026,14.178c-.475.436.234,1.142.707.707A10.516,10.516,0,0,0,18.447,4.2c-.475-.433-1.184.273-.707.707Z"></path>
        <path d="M15.16,8.294a5.024,5.024,0,0,1,.014,7.412c-.474.437.234,1.143.707.707a6.028,6.028,0,0,0-.014-8.826c-.474-.434-1.183.272-.707.707Z"></path>
      </g>
    </g>
  </svg>
);

export const AdditionalTipsIcon = () => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 md:w-5 md:h-5"
  >
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 md:w-5 md:h-5"
    >
      <path
        d="M0.877197 7.49984C0.877197 3.84216 3.84234 0.877014 7.50003 0.877014C11.1577 0.877014 14.1229 3.84216 14.1229 7.49984C14.1229 11.1575 11.1577 14.1227 7.50003 14.1227C3.84234 14.1227 0.877197 11.1575 0.877197 7.49984ZM7.50003 1.82701C4.36702 1.82701 1.8272 4.36683 1.8272 7.49984C1.8272 10.6328 4.36702 13.1727 7.50003 13.1727C10.633 13.1727 13.1729 10.6328 13.1729 7.49984C13.1729 4.36683 10.633 1.82701 7.50003 1.82701ZM7.12457 9.00001C7.06994 9.12735 6.33165 11.9592 6.33165 11.9592C6.26018 12.226 5.98601 12.3843 5.71928 12.3128C5.45255 12.2413 5.29425 11.9672 5.36573 11.7004C5.36573 11.7004 6.24661 8.87268 6.24661 8.27007V6.80099L4.28763 6.27608C4.0209 6.20461 3.86261 5.93045 3.93408 5.66371C4.00555 5.39698 4.27972 5.23869 4.54645 5.31016C4.54645 5.31016 6.20042 5.87268 6.84579 5.87268H8.15505C8.80042 5.87268 10.4534 5.31042 10.4534 5.31042C10.7202 5.23895 10.9943 5.39724 11.0658 5.66397C11.1373 5.93071 10.979 6.20487 10.7122 6.27635L8.74661 6.80303V8.27007C8.74661 8.87268 9.62663 11.6971 9.62663 11.6971C9.6981 11.9639 9.5398 12.238 9.27307 12.3095C9.00634 12.381 8.73217 12.2227 8.6607 11.956C8.6607 11.956 7.91994 9.12735 7.86866 9.00001C7.81994 8.87268 7.65006 8.87268 7.65006 8.87268H7.34317C7.34317 8.87268 7.16994 8.87268 7.12457 9.00001ZM7.50043 5.12007C8.12175 5.12007 8.62543 4.61639 8.62543 3.99507C8.62543 3.37375 8.12175 2.87007 7.50043 2.87007C6.87911 2.87007 6.37543 3.37375 6.37543 3.99507C6.37543 4.61639 6.87911 5.12007 7.50043 5.12007Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  </svg>
);

export function TeamInfo({
  logo,
  name,
  red,
  isActive,
}: {
  logo: string;
  name: string;
  red: number;
  isActive: boolean;
}) {
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Image
        alt={name}
        loading="lazy"
        width={20}
        height={20}
        className="rounded w-4 h-4 md:w-5 md:h-5 object-contain bg-white"
        src={logo || "/assets/images/logo-default.png"}
      />
      <p
        className={`flex items-center gap-1 ${
          isActive ? "font-semibold" : "font-light"
        }`}
      >
        <span>{name}</span>
        {Array(red)
          .fill("")
          .map((r) => (
            <span
              key={r}
              className="w-2 h-3 rounded-[2px] bg-red-600 block"
            ></span>
          ))}
      </p>
    </div>
  );
}

function MatchScore({
  homeScore,
  awayScore,
}: {
  homeScore: number;
  awayScore: number;
}) {
  return (
    <div className="col-span-1 md:justify-start justify-center flex md:col-span-2">
      <div className="flex flex-col px-0 gap-1 md:px-2 md:gap-2 text-[#ff0046] font-bold">
        <p>{homeScore}</p>
        <p>{awayScore}</p>
      </div>
    </div>
  );
}

interface MatchTimeProps {
  matchAt: string;
  status: number;
}

export const MatchTime: React.FC<MatchTimeProps> = ({ matchAt, status }) => {
  const timeHtml = convertTimestampToDate({ matchAt, status });

  return (
    <div className="hidden h-full items-center justify-center col-span-2 rounded md:flex">
      <div
        className="text-center"
        dangerouslySetInnerHTML={{
          __html: timeHtml,
        }}
      ></div>
    </div>
  );
};

function TipsInfo({
  homeCorner,
  awayCorner,
}: {
  homeCorner: number;
  awayCorner: number;
}) {
  return (
    <div className="col-span-1 md:justify-start justify-center flex md:col-span-2">
      <div className="flex flex-col px-0 gap-1 md:px-2 md:gap-2">
        <button>
          <p className="flex items-center gap-1">
            <TipsIcon />
            {homeCorner}
          </p>
        </button>
        <button data-state="closed">
          <p className="flex items-center gap-1">
            <TipsIcon />
            {awayCorner}
          </p>
        </button>
      </div>
    </div>
  );
}

const InfoMatch = ({ hasLive, hasLineup, tips }: any) => {
  return (
    <>
      <div
        data-orientation="vertical"
        role="none"
        className="shrink-0 bg-border h-full w-[1px] hidden md:block"
      ></div>
      <div className="col-span-2 flex items-center justify-center gap-2 md:col-span-3">
        {hasLive && <HotIcon />}
        {hasLineup && <AdditionalTipsIcon />}
        {!!tips && <TipIcon tip={tips} />}
      </div>
    </>
  );
};

const FavoriteAction = ({ matchId }: { matchId: string }) => {
  const { favoriteMatches, addFavoriteMatch, removeFavoriteMatch } =
    useHomeStore();

  const ismatch = favoriteMatches.includes(matchId);
  const onAddFavorite = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    ismatch ? removeFavoriteMatch(matchId) : addFavoriteMatch(matchId);
  };

  return (
    <button
      onClick={onAddFavorite}
      className="col-span-1 h-8 w-8 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground md:h-9 md:w-9"
    >
      {ismatch ? <StartFillIcon /> : <StarIcon />}
    </button>
  );
};

const FavoriteLeagueAction = ({
  leagueId,
  matchIds,
}: {
  leagueId: string;
  matchIds: string[];
}) => {
  const { favoriteLeagues, addFavoriteLeague, removeFavoriteLeague } =
    useHomeStore();

  const ismatch = favoriteLeagues.includes(leagueId);
  const onAddFavorite = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    ismatch
      ? removeFavoriteLeague(leagueId, matchIds)
      : addFavoriteLeague(leagueId, matchIds);
  };

  return (
    <button
      onClick={onAddFavorite}
      className="col-span-1 h-8 w-8 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground md:h-9 md:w-9"
    >
      {ismatch ? <StartFillIcon /> : <StarIcon />}
    </button>
  );
};
function MatchDetails({ matches }: { matches: Match[] }) {
  return matches.map((match, idx) => {
    return (
      <Link
        href={`/tran-dau/${match.matchId}`}
        key={idx}
        title="Click để có thông tin trận đấu!"
      >
        <div className="py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/5 grid grid-cols-10 items-center md:grid-cols-20 md:text-sm">
          <FavoriteAction matchId={match.matchId} />
          <MatchTime matchAt={match.matchAt} status={match.status} />
          <div className="flex flex-col gap-1 px-0 md:px-2 col-span-4 md:col-span-8 md:gap-2">
            <TeamInfo
              logo={match.homeLogo}
              name={match.homeName}
              red={match.homeRed}
              isActive={match.homeScore > match.awayScore}
            />
            <TeamInfo
              logo={match.awayLogo}
              name={match.awayName}
              red={match.awayRed}
              isActive={match.homeScore < match.awayScore}
            />
          </div>
          <MatchScore homeScore={match.homeScore} awayScore={match.awayScore} />
          <TipsInfo
            homeCorner={match.homeCorner}
            awayCorner={match.awayCorner}
          />
          <InfoMatch
            hasLive={match.hasLive}
            hasLineup={match.hasLineup}
            tips={match.tips}
          />
        </div>
        <div
          data-orientation="horizontal"
          role="none"
          className="shrink-0 bg-border h-[1px] w-full"
        ></div>
      </Link>
    );
  });
}

const TipIcon = ({ tip }: { tip: number }) => {
  return (
    <div className="inline-flex items-center border px-0.5 sm:max-w-[95px] max-w-[75px] h-[16px] md:h-full text-[10px] md:text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-primary-foreground shadow hover:bg-primary/80 rounded bg-[#ff0000]">
      {tip} tips
    </div>
  );
};

const MatchesItem = ({ tournament }: { tournament: Tournament }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  if (!inView) {
    return <div ref={ref} style={{ height: "150px" }} />;
  }

  return (
    <Animation
      animationName="fadeIn"
      inViewDefault={inView}
      key={tournament.countryId}
      className="mt-2 w-full"
    >
      <div
        ref={ref}
        className="grid bg-primary/10 shadow-sm w-full items-center h-8 grid-cols-12 md:h-10 sm:rounded-md md:grid-cols-20"
      >
        <FavoriteLeagueAction
          leagueId={tournament.leagueId}
          matchIds={tournament.matches.map((match) => match.matchId)}
        />
        <div className="flex items-center col-span-10 md:col-span-18">
          <Image
            alt={tournament.leagueShortName}
            loading="lazy"
            width={20}
            height={20}
            className="mr-2 w-5 h-5 object-contain bg-white rounded"
            src={tournament.countryLogo || "/assets/images/logo-default.png"}
          />
          <span className="text-xs truncate mr-2 font-medium md:text-sm">
            {tournament.countryName}:
          </span>
          <span className="truncate text-xs hover:underline md:text-sm">
            {tournament.leagueName}
          </span>
          <button className="flex items-center justify-center  hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-full  md:h-9 md:w-9">
            <ArrowIcon />
          </button>
        </div>
      </div>
      <div className="mt-2">
        <MatchDetails matches={tournament.matches} />
        <div className="shrink-0 bg-border h-[1px] w-full" />
      </div>
    </Animation>
  );
};

MatchesItem.propTypes = {};

export default MatchesItem;
