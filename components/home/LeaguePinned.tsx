import React from "react";
import Image from "next/image";
import useMatchStore from "../bong-da/store-league";
import { PinnedIcon } from "./NationalTeam";

function LeaguePinned() {
  const { data, removeLeague } = useMatchStore();

  return (
    <div className="py-2 w-full">
      {data.map((result) => (
        <div
          key={result.leagueId}
          className="group cursor-pointer flex items-center justify-between py-1.5 px-2 rounded transition-transform duration-300 hover:bg-secondary"
        >
          <a
            className="flex items-center gap-2 "
            href={`/bong-da/${result.countryName}/${
              result.leagueId
            }`}
          >
            <Image
              alt=""
              loading="lazy"
              width={20}
              height={20}
              decoding="async"
              data-nimg={1}
              className="w-5 h-5 object-contain bg-white rounded"
              src={result.countryLogo}
              style={{ color: "transparent" }}
            />
            <span className="text-sm font-light truncate">{result.leagueName}</span>
          </a>
          <button data-state="closed" onClick={() => removeLeague(result.leagueId)}>
            <PinnedIcon />
          </button>
        </div>
      ))}
    </div>
  );
}

LeaguePinned.propTypes = {};

export default LeaguePinned;
