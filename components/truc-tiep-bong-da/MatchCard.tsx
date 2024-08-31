import { convertTimestampToDate } from "@/utils";
import Image from "next/image";
import Link from "next/link";

const MatchCard: React.FC<Match> = ({
  leagueName,
  hasLive,
  matchId,
  homeLogo,
  homeName,
  awayLogo,
  awayName,
  matchAt,
  status,
  homeScore,
  awayScore,
}) => {
  const time = convertTimestampToDate({ matchAt, status });

  return (
    <Link href={`/tran-dau/${matchId}`}>
      <div className="border bg-card rounded-xl p-3 flex flex-col gap-3 cursor-pointer transition-all text-sm hover:border-primary">
        <div className="flex items-center justify-between">
          <span className="truncate w-1/2">{leagueName}</span>
          {hasLive && (
            <div className="bg-[#fa3434] py-0.5 px-1 rounded flex gap-1">
              <Image
                alt="Đang phát trực tiếp bóng đá"
                loading="lazy"
                width={10}
                height={10}
                decoding="async"
                data-nimg="1"
                className="w-3 object-contain"
                src="https://okchoi68.com/_next/image?url=%2Fassets%2Fimages%2Fliving.webp&w=16&q=75"
                style={{ color: "transparent" }}
              />
              <span className="text-xs font-medium text-white">Live</span>
            </div>
          )}
        </div>
        <div className="w-full flex items-end justify-between">
          <div className="w-2/5 flex flex-col items-center justify-center gap-2">
            <Image
              alt=""
              loading="lazy"
              width={32}
              height={32}
              decoding="async"
              data-nimg="1"
              className="rounded-full w-8 h-8 object-contain bg-primary/10 p-1"
              src={homeLogo || "/assets/images/logo-default.png"}
              style={{ color: "transparent" }}
            />
            <p className="truncate text-sm w-full text-center">{homeName}</p>
          </div>
          <div className="w-1/5 font-bold flex flex-col items-center justify-center gap-1">
            <div className="flex gap-2 text-xl">
              <div className="flex gap-2 text-xl">
                <span>{homeScore}</span>
                <span>-</span>
                <span>{awayScore}</span>
              </div>
            </div>
            <div
              className="text-center"
              dangerouslySetInnerHTML={{
                __html: time,
              }}
            ></div>
          </div>
          <div className="w-2/5 flex flex-col items-center justify-center gap-2">
            <Image
              alt=""
              loading="lazy"
              width={32}
              height={32}
              decoding="async"
              data-nimg="1"
              className="rounded-full w-8 h-8 object-contain bg-primary/10 p-1"
              src={awayLogo || "/assets/images/logo-default.png"}
              style={{ color: "transparent" }}
            />
            <p className="truncate text-sm w-full text-center">{awayName}</p>
          </div>
        </div>
        <div
          data-orientation="horizontal"
          role="none"
          className="shrink-0 bg-border h-[1px] w-full"
        />
        <div className="flex items-center justify-center gap-2">
          <button data-state="closed">
            <svg
              width={15}
              height={15}
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <path
                d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button data-state="closed">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 640 512"
              className="w-5 h-5"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M592 192H473.26c12.69 29.59 7.12 65.2-17 89.32L320 417.58V464c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48V240c0-26.51-21.49-48-48-48zM480 376c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm-46.37-186.7L258.7 14.37c-19.16-19.16-50.23-19.16-69.39 0L14.37 189.3c-19.16 19.16-19.16 50.23 0 69.39L189.3 433.63c19.16 19.16 50.23 19.16 69.39 0L433.63 258.7c19.16-19.17 19.16-50.24 0-69.4zM96 248c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"></path>
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default MatchCard;
