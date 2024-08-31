import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { useAppStore } from "@/store/app-store";
import { getSportSearch } from "@/services/sport";
import Empty from "../home/Skeleton/Empty";
import useDebounce from "@/utils/debound";
import useSearchResultsStore from "./store";

const SearchSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 pb-2  w-full">
      <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-full h-16 rounded" />
      <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-full h-16 rounded" />
      <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-full h-16 rounded" />
      <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-full h-16 rounded" />
      <div className="animate-pulse relative overflow-hidden bg-primary/10 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0)_100%)] dark:after:bg-[linear-gradient(90deg,rgba(250,250,250,0)_0%,rgba(250,250,250,0.05)_20%,rgba(250,250,250,0.1)_60%,rgba(250,250,250,0)_100%)] after:transform after:translate-x-[-100%] after:animate-skeleton w-full h-16 rounded" />
    </div>
  );
};
function SearchLeague() {
  const { isOpenSearchLeague, setIsOpenSearchLeague } = useSearchResultsStore();

  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearchKey = useDebounce(searchKey, 500);

  useEffect(() => {
    if (loading) {
      getSportSearch(debouncedSearchKey)
        .then(({ data }: any) => setSearchResults(data))
        .finally(() => setLoading(false));
    }
  }, [debouncedSearchKey]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(event.target.value);
    setLoading(true);
  };

  const onClose = (val: boolean) => {
    setSearchKey("");
    setIsOpenSearchLeague(val);
  };

  return (
    <Modal showModal={isOpenSearchLeague} setShowModal={onClose}>
      <div className="flex flex-col space-y-1.5 text-center sm:text-left">
        <h2
          id="radix-:r7:"
          className="text-lg font-semibold leading-none tracking-tight"
        >
          <p>Tìm kiếm</p>
        </h2>
        <div className="py-4">
          <div className="flex w-full items-center relative">
            <input
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 relative pr-8"
              placeholder="Nhập đội bóng bạn cần tìm ..."
              type="search"
              value={searchKey}
              onChange={handleSearch}
            />
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 w-9 absolute right-0">
              <svg
                width={15}
                height={15}
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
              >
                <path
                  d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            dir="ltr"
            className="relative overflow-hidden h-[50vh] mt-4 pr-4 w-full"
          >
            <div
              className="h-full w-full rounded-[inherit]"
              style={{ overflow: "hidden scroll" }}
            >
              <div style={{ minWidth: "100%", display: "table" }}>
                <SearchResult loading={loading} result={searchResults} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

const SearchResult = ({
  result,
  loading,
}: {
  result: Team[] | null;
  loading: boolean;
}) => {
  const { searchResults, addToSearchResults, removeFromSearchResults } =
    useSearchResultsStore();

  const handleAddToSearchResults = (item: Team) => {
    addToSearchResults(item);
  };

  const handleRemoveFromSearchResults = (itemId: string) => {
    removeFromSearchResults(itemId);
  };

  if (loading) return <SearchSkeleton />;
  if (!result?.length) return <Empty />;
  return (
    <div className="flex flex-col gap-2 pb-2 w-full">
      {result.map((r) => (
        <div
          role="alert"
          key={r.teamId}
          className="relative rounded-lg border text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7 bg-background text-foreground w-full flex flex-row items-center justify-between transition-colors hover:bg-primary/5 p-2"
        >
          <div className="flex items-center gap-2">
            <Image
              alt=""
              loading="lazy"
              width={50}
              height={50}
              decoding="async"
              data-nimg={1}
              className="bg-primary/10 w-8 h-8 md:w-12 md:h-12 object-contain rounded-full"
              src={r.logo}
              style={{ color: "transparent" }}
            />
            <div className="flex flex-col items-start justify-center">
              <h5 className="mb-1 font-medium leading-none tracking-tight">
                {r.name}
              </h5>
              <div className="[&_p]:leading-relaxed text-xs text-muted-foreground">
                BÓNG ĐÁ {r.area}
              </div>
            </div>
          </div>
          {searchResults.find((s) => r.teamId === s.teamId) ? (
            <StarTicked
              onClick={() => handleRemoveFromSearchResults(r.teamId)}
            />
          ) : (
            <StarNotTicked onClick={() => handleAddToSearchResults(r)} />
          )}
        </div>
      ))}
    </div>
  );
};

const StarTicked = ({ onClick }: any) => {
  return (
    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-full md:h-9 md:w-9">
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-yellow-400"
        onClick={onClick}
      >
        <path
          d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
          fill="currentColor"
        ></path>
      </svg>
    </button>
  );
};

const StarNotTicked = ({ onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-full md:h-9 md:w-9"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
      >
        <path
          d="M6.97942 1.25171L6.9585 1.30199L5.58662 4.60039C5.54342 4.70426 5.44573 4.77523 5.3336 4.78422L1.7727 5.0697L1.71841 5.07405L1.38687 5.10063L1.08608 5.12475C0.820085 5.14607 0.712228 5.47802 0.914889 5.65162L1.14406 5.84793L1.39666 6.06431L1.43802 6.09974L4.15105 8.42374C4.23648 8.49692 4.2738 8.61176 4.24769 8.72118L3.41882 12.196L3.40618 12.249L3.32901 12.5725L3.25899 12.866C3.19708 13.1256 3.47945 13.3308 3.70718 13.1917L3.9647 13.0344L4.24854 12.861L4.29502 12.8326L7.34365 10.9705C7.43965 10.9119 7.5604 10.9119 7.6564 10.9705L10.705 12.8326L10.7515 12.861L11.0354 13.0344L11.2929 13.1917C11.5206 13.3308 11.803 13.1256 11.7411 12.866L11.671 12.5725L11.5939 12.249L11.5812 12.196L10.7524 8.72118C10.7263 8.61176 10.7636 8.49692 10.849 8.42374L13.562 6.09974L13.6034 6.06431L13.856 5.84793L14.0852 5.65162C14.2878 5.47802 14.18 5.14607 13.914 5.12475L13.6132 5.10063L13.2816 5.07405L13.2274 5.0697L9.66645 4.78422C9.55432 4.77523 9.45663 4.70426 9.41343 4.60039L8.04155 1.30199L8.02064 1.25171L7.89291 0.944609L7.77702 0.665992C7.67454 0.419604 7.32551 0.419604 7.22303 0.665992L7.10715 0.944609L6.97942 1.25171ZM7.50003 2.60397L6.50994 4.98442C6.32273 5.43453 5.89944 5.74207 5.41351 5.78103L2.84361 5.98705L4.8016 7.66428C5.17183 7.98142 5.33351 8.47903 5.2204 8.95321L4.62221 11.461L6.8224 10.1171C7.23842 9.86302 7.76164 9.86302 8.17766 10.1171L10.3778 11.461L9.77965 8.95321C9.66654 8.47903 9.82822 7.98142 10.1984 7.66428L12.1564 5.98705L9.58654 5.78103C9.10061 5.74207 8.67732 5.43453 8.49011 4.98442L7.50003 2.60397Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
  );
};
SearchLeague.propTypes = {};

export default SearchLeague;
