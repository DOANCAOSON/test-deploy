"use client";
import React, { useRef, useState } from "react";
import { useTipsStore } from "./store";
import Link from "next/link";
import { Animation } from "../Animation";
import { FormInputEnum, FormProvider } from "../Form";
import ButtonLoad from "../Button";
import { toast } from "react-toastify";
import { onCreateTip } from "@/services/tips";

const TipMatch = () => {
  const { setData, data, odds } = useTipsStore();
  if (!odds)
    return (
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
        <p className="text-sm ">Vui lòng chọn một trận đấu</p>
      </div>
    );

  const { match, handicap, europeOdds, overUnder } = odds;

  const betOptions = [
    {
      label: "Chủ",
      value: europeOdds.instantHome,
      chosenOdds: 1,
      key: "betOptions",
    },
    {
      label: "Hòa",
      value: europeOdds.instantDraw,
      chosenOdds: 2,
      key: "betOptions",
    },
    {
      label: "Khách",
      value: europeOdds.instantAway,
      chosenOdds: 3,
      key: "betOptions",
    },
  ];

  const handicapOptions = [
    {
      label: "Chủ",
      value: handicap.instantHome,
      chosenOdds: 4,
      key: "handicapOptions",
    },
    {
      label: "HDP",
      value: handicap.instantHandicap,
      disabled: true,
      chosenOdds: 5,
      key: "handicapOptions",
    },
    {
      label: "Khách",
      value: handicap.instantAway,
      chosenOdds: 6,
      key: "handicapOptions",
    },
  ];

  const overUnderOptions = [
    {
      label: "Tài",
      value: overUnder.instantOver,
      chosenOdds: 7,
      key: "overUnderOptions",
    },
    {
      label: "T/X",
      value: overUnder.instantHandicap,
      disabled: true,
      chosenOdds: 6,
      key: "overUnderOptions",
    },
    {
      label: "Xỉu",
      value: overUnder.instantUnder,
      chosenOdds: 8,
      key: "overUnderOptions",
    },
  ];

  const oops = { betOptions, handicapOptions, overUnderOptions } as any;

  const renderButtons = (options: any[]) => {
    const handleSetData = (d: any) => {
      const data = {
        chosenOdds: d.chosenOdds,
        matchId: match.matchId,
        rate1: oops[d.key]?.[0].value,
        rate2: oops[d.key]?.[1].value,
        rate3: oops[d.key]?.[2].value,
      };
      setData(data as any);
    };

    return options.map((o, index) => {
      return (
        <div key={index} className=" grid grid-cols-3 gap-2">
          {o.map((b: any) => (
            <button
              key={index}
              onClick={() => handleSetData(b)}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 md:text-sm text-[13px] ${
                data?.chosenOdds === b.chosenOdds
                  ? "bg-primary text-primary-foreground shadow hover:bg-primary/90"
                  : ""
              }`}
              disabled={b.disabled}
            >
              {b.label} {b.value}
            </button>
          ))}
        </div>
      );
    });
  };

  return (
    <Animation
      animationName="fadeIn"
      inViewDefault
      className="w-full mx-auto flex flex-col py-4"
    >
      <Link
        className="group font-semibold md:px-0 px-2 flex items-center justify-between hover:underline"
        href={`/tran-dau/${match.matchId}`}
      >
        <span className="text-sm md:text-base">
          {match.homeName} VS {match.awayName}
        </span>
        <span>
          <svg
            width={15}
            height={15}
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 group-hover:animate-arrow-x"
          >
            <path
              d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </Link>
      <div className=" md:px-0 px-2 w-full flex flex-col gap-2 mt-2">
        {renderButtons([betOptions, handicapOptions, overUnderOptions])}
      </div>
    </Animation>
  );
};
function TipCreateBox() {
  return (
    <main className="w-full md:w-9/12">
      <div className="w-full md:rounded-md md:border bg-card md:p-2 md:px-6">
        <div>
          <h4 className="text-sm flex items-center gap-2 font-semibold bg-primary/10 shadow-sm md:rounded p-2 relative">
            <div className="border px-0.5 sm:max-w-[95px] max-w-[75px] h-[16px] md:h-full text-[10px] md:text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80 w-5 !h-5 rounded-full flex items-center justify-center !font-extrabold">
              2
            </div>
            Xác nhận lựa chọn
          </h4>
          <div className="w-full mx-auto flex flex-col py-4">
            <TipMatch />
          </div>
        </div>
        <TipForm />
      </div>
    </main>
  );
}

const inputs: Input[] = [
  {
    name: "title",
    type: FormInputEnum.INPUT,
    required: { value: true, message: "Vui lòng nhập tiêu đề!" },
    placeholder: "Vui lòng nhập tiêu đề",
    className:
      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  },
  {
    name: "comment",
    type: FormInputEnum.TEXTAREA,
    required: { value: true, message: "Vui lòng nhập nội dung!" },
    minLength: { value: 300, message: "Vui lòng nhập ít nhất 300 ký tự!" },
    placeholder: "Vui lòng nhập nội dung",
    id: "comment-input",
    className:
      "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-72 md:min-h-80",
  },
];

const TipForm = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const data = useTipsStore((s) => s.data);

  const onSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    const {
      current: { formValues },
    } = formRef as any;

    const values = formValues();
    if (values && data) {
      onCreateTip(data)
    } else {
      toast("Vui lòng chọn cách chơi", { type: "info", theme: "light" });
    }
    setLoading(false);
  };

  return (
    <div>
      <h4 className="text-sm flex items-center gap-2 font-semibold bg-primary/10 shadow-sm rounded p-2 relative">
        <div className="border px-0.5 sm:max-w-[95px] max-w-[75px] h-[16px] md:h-full text-[10px] md:text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80 w-5 !h-5 rounded-full flex items-center justify-center !font-extrabold">
          3
        </div>
        Nội dung
      </h4>
      <div className="md:px-0 px-2 w-full mx-auto flex flex-col py-4">
        <FormProvider inputs={inputs} ref={formRef} className="space-y-6">
          <ButtonLoad
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary shadow hover:bg-primary/90 h-9 px-4 py-2 w-2/5 text-white"
            onClick={onSubmit}
            type="submit"
            label={<span>Gửi bài</span>}
            loading={loading}
          />
        </FormProvider>
      </div>
    </div>
  );
};
TipCreateBox.propTypes = {};

export default TipCreateBox;
