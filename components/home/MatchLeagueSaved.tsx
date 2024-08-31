import React from "react";
import useSearchResultsStore from "../bong-da/store";
import Image from "next/image";

function MatchLeagueSaved() {
  const { searchResults, removeFromSearchResults, setIsOpenSearchLeague } =
    useSearchResultsStore();

  return (
    <div className="py-2 w-full">
      {searchResults.map((result) => (
        <div
          key={result.teamId}
          className="group cursor-pointer flex items-center justify-between py-1.5 px-2 rounded transition-transform duration-300 hover:bg-secondary"
        >
          <a
            className="flex items-center gap-2 "
            href={`/doi-tuyen/${result.name.replace('', '-')}/${result.teamId}`}
          >
            <Image
              alt=""
              loading="lazy"
              width={20}
              height={20}
              decoding="async"
              data-nimg={1}
              className="w-5 h-5 object-contain bg-white rounded"
              src={result.logo}
              style={{ color: "transparent" }}
            />
            <span className="text-sm font-light truncate">{result.name}</span>
          </a>
          <button data-state="closed" onClick={() => removeFromSearchResults(result.teamId)}>
            <svg
              width={15}
              height={15}
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-yellow-400 hidden group-hover:block"
            >
              <path
                d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      ))}
      <button onClick={() => setIsOpenSearchLeague(true)} className="inline-flex items-center justify-center whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline h-9 text-xs p-2 text-primary font-bold">
        <svg
          width={15}
          height={15}
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-5 w-5"
        >
          <path
            d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
        THÊM ĐỘI BÓNG
      </button>
    </div>
  );
}

MatchLeagueSaved.propTypes = {};

export default MatchLeagueSaved;
