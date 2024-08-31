"use client";
import React from "react";
import useHomeStore from "./store";
import dayjs from "dayjs";
import DropdownMenu from "../DropdownMenu";

function MatchesHeader({
  tabs,
  visibleTime,
}: {
  tabs: { label: string; key: string }[];
  visibleTime?: boolean;
}) {
  const { activeTab, setActiveTab } = useHomeStore();

  return (
    <div className="w-full flex items-center justify-between flex-col md:gap-2 lg:flex-row">
      <div
        dir="ltr"
        className="relative overflow-hidden w-full whitespace-nowrap py-1 md:py-3"
      >
        <div
          data-radix-scroll-area-viewport
          className="h-full w-full rounded-[inherit]"
          style={{ overflow: "scroll" }}
        >
          <div style={{ minWidth: "100%", display: "table" }}>
            <div className="w-full flex gap-2 px-2">
              {tabs.map((button, index) => (
                <button
                  key={index}
                  className={`inline-flex items-center justify-center whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 px-4 py-2 uppercase text-xs font-medium h-7 md:h-8 ${
                    button.key === activeTab
                      ? "bg-primary text-primary-foreground shadow hover:bg-primary/90"
                      : "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
                  }`}
                  onClick={() => setActiveTab(button.key)}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {visibleTime && (
        <div className="px-2 w-full flex items-center mt-2 md:mt-0 md:w-auto">
          <ButtonDate />
        </div>
      )}
    </div>
  );
}

const ButtonDate = () => {
  const { date, fetchMatchesByDate } = useHomeStore();
  const currentDate = dayjs();

  const dates = [];
  for (let i = -7; i <= 7; i++) {
    const date = currentDate.add(i, "day");
    const formattedDate = date.format("DD/MM");
    const dayOfWeek = date.format("dddd");
    const dateWith = `${formattedDate} ${dayOfWeek}`;
    const isoString = date.toISOString();

    dates.push({ label: dateWith, iso: isoString });
  }

  const dateCurrent = dayjs(date);
  const formattedDate = dateCurrent.format("DD/MM");
  const dayOfWeek = dateCurrent.format("dddd");
  const dateWithDayOfWeek = `${formattedDate} ${dayOfWeek}`;


  const handleNext = () => {
    fetchMatchesByDate(dateCurrent.add(1, 'day').toISOString())
  };

  const handlePrev = () => {
    fetchMatchesByDate(dateCurrent.subtract(1, 'day').toISOString())
  };

  return (
    <div className="border rounded flex w-full bg-card md:w-[180px] justify-evenly">
      <button onClick={handlePrev} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9 border-none hover:rounded-none">
        <svg
          width={15}
          height={15}
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
        >
          <path
            d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <DropdownMenu
        Icon={<></>}
        label={dateWithDayOfWeek}
        subClassName="-right-1/4"
        className="inline-flex whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-center items-center border-none text-center hover:rounded-none"
      >
        <div
          tabIndex={-1}
          className="flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground"
        >
          <label
            htmlFor=":r1o5:"
            id=":r1o4:"
            style={{
              position: "absolute",
              width: "1px",
              height: "1px",
              padding: "0px",
              margin: "-1px",
              overflow: "hidden",
              clip: "rect(0px, 0px, 0px, 0px)",
              whiteSpace: "nowrap",
              borderWidth: "0px",
            }}
          />
          <div
            className="overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
            cmdk-group
            role="presentation"
            data-value="undefined"
          >
            <div role="group">
              <div
                className="overflow-y-auto overflow-x-hidden max-h-full"
                role="listbox"
                aria-label="Suggestions"
                id=":r1o3:"
              >
                <div cmdk-list-sizer>
                  {dates.map((d, idx) => {
                    const selected = dayjs(d.iso).isSame(dayjs(date), 'day')
                    return (
                    <div
                      key={idx}
                      className={`"relative select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-primary hover:bg-accent aria-selected:text-accent-foreground mt-1 text-center flex justify-center data-[disabled]:opacity-1 data-[disabled]:pointer-events-auto cursor-pointer ${selected ? "bg-primary hover:bg-primary" : ""}`}
                      id=":r1o9:"
                      role="option"
                      onClick={() => fetchMatchesByDate(d.iso)}
                      aria-disabled="false"
                    >
                      {d.label}
                    </div>
                  )
                  } )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DropdownMenu>
      <button onClick={handleNext} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9 border-none hover:rounded-none">
        <svg
          width={15}
          height={15}
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
        >
          <path
            d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

MatchesHeader.propTypes = {};

export default MatchesHeader;
