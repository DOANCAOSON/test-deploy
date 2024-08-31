"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Loading from "../Loading";
import { usePathname } from "next/navigation";
import {
  getComments,
  getTipDetail,
  onCreateComment,
  onLikeTip,
} from "@/services/article";
import TipSidebar from "./TipSidebar";
import ButtonLoad from "../Button";
import { Animation } from "../Animation";
import { FormInputEnum, FormProvider } from "../Form";

const MatchHeader = ({
  createdAt,
  views,
  like,
  liked,
}: {
  createdAt: string;
  views: number;
  like: number;
  liked: boolean;
}) => (
  <div className="flex items-center justify-between mt-2">
    <div className="flex items-center text-muted-foreground text-sm gap-1">
      <svg
        width={15}
        height={15}
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
      >
        <path
          d="M7.50009 0.877014C3.84241 0.877014 0.877258 3.84216 0.877258 7.49984C0.877258 11.1575 3.8424 14.1227 7.50009 14.1227C11.1578 14.1227 14.1229 11.1575 14.1229 7.49984C14.1229 3.84216 11.1577 0.877014 7.50009 0.877014ZM1.82726 7.49984C1.82726 4.36683 4.36708 1.82701 7.50009 1.82701C10.6331 1.82701 13.1729 4.36683 13.1729 7.49984C13.1729 10.6328 10.6331 13.1727 7.50009 13.1727C4.36708 13.1727 1.82726 10.6328 1.82726 7.49984ZM8 4.50001C8 4.22387 7.77614 4.00001 7.5 4.00001C7.22386 4.00001 7 4.22387 7 4.50001V7.50001C7 7.63262 7.05268 7.7598 7.14645 7.85357L9.14645 9.85357C9.34171 10.0488 9.65829 10.0488 9.85355 9.85357C10.0488 9.65831 10.0488 9.34172 9.85355 9.14646L8 7.29291V4.50001Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
      <span className="md:text-sm text-xs">{createdAt}</span>
    </div>
    <div className="flex items-center text-muted-foreground md:text-sm text-xs gap-4">
      <div className="flex items-center gap-1">
        <svg
          width={15}
          height={15}
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
        >
          <path
            d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
        <span>{views}</span>
      </div>
      <div className="flex items-center gap-1">
        <svg
          width={15}
          height={15}
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
        >
          <path
            d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
            fill={liked ? "red" : "currentColor"}
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
        <span>{like}</span>
      </div>
      <div className="flex items-center gap-1">
        <svg
          width={15}
          height={15}
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
        >
          <path
            d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
        <span>1</span>
      </div>
    </div>
  </div>
);

const TeamInfo = ({ teamName, logoSrc }: any) => (
  <div className="flex flex-col gap-2 items-center justify-center">
    <Image
      alt=""
      loading="lazy"
      width={100}
      height={100}
      decoding="async"
      className="md:w-20 md:h-20 w-14 h-14 bg-card rounded-lg border object-contain p-2"
      src={logoSrc || "/assets/images/logo-default.png"}
      style={{ color: "transparent" }}
    />
    <p className="text-sm text-center md:text-base">{teamName}</p>
  </div>
);

const MatchScore = ({ score1, score2, halfTime }: any) => (
  <div className="md:pt-0 pt-2 w-1/3 flex items-center justify-center flex-col gap-2">
    <div className="md:text-[46px] text-3xl flex gap-4 font-extrabold">
      <span>{score1}</span>
      <span>-</span>
      <span>{score2}</span>
    </div>
    <div className="text-sm flex items-center justify-center flex-col">
      <p className="font-medium">{halfTime}</p>
      <div className="text-[#ff0046] font-bold">
        48<span className="animate-blink ml-[2px]">&lsquo;</span>
      </div>
    </div>
  </div>
);

const MatchDetails = ({ team1, team2, score1, score2, halfTime }: any) => (
  <div className="w-full flex items-start md:items-center justify-between rounded-md py-2 md:py-4 ">
    <div className="w-1/3 flex gap-2 items-baseline md:items-center justify-end">
      <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-full -translate-y-1/2 md:h-9 md:w-9">
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
      </button>
      <TeamInfo teamName={team1.name} logoSrc={team1.logo} />
    </div>
    <MatchScore score1={score1} score2={score2} halfTime={halfTime} />
    <div className="items-baseline md:items-center w-1/3 flex gap-2 justify-start">
      <TeamInfo teamName={team2.name} logoSrc={team2.logo} />
      <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-full -translate-y-1/2 md:h-9 md:w-9">
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
      </button>
    </div>
  </div>
);

const Odds = ({ odds }: any) => (
  <div className="md:text-base text-sm w-full mt-4">
    <div className="grid grid-cols-3 gap-2">
      {odds.map((odd: any, index: number) => (
        <span
          key={index}
          className={`w-full border rounded flex items-center justify-center py-2 ${odd.bgColor}`}
        >
          {odd.text}
        </span>
      ))}
    </div>
  </div>
);

const History = ({ history }: any) => (
  <div className="md:text-base text-sm mt-4">
    <p className="whitespace-pre-line">{history}</p>
  </div>
);

const CommentSection = ({ articleId }: { articleId: string }) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!comments && loading) {
      getComments(articleId)
        .then(({ data }: any) => setComments(data))
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <>
      <div className="flex gap-2">
        <svg
          width={15}
          height={15}
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
        >
          <path
            d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
        <span className="md:text-base text-sm font-semibold">
          {comments?.length ?? 0} Bình luận
        </span>
      </div>
      {comments?.length ? (
        <div className="flex flex-col gap-2 mt-4">
          {comments?.map((comment) => (
            <CommentItem {...comment} key={comment.id} />
          ))}
        </div>
      ) : (
        <></>
      )}
      <CommentInput setComments={setComments} articleId={articleId} />
    </>
  );
};

const inputs = [
  {
    name: "comment",
    type: FormInputEnum.TEXTAREA,
    required: { value: true, message: "Vui lòng nhập bình luận!" },
    placeholder: "Nhập bình luận",
    className:
      "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-36",
  },
];

const CommentInput = ({
  setComments,
  articleId,
}: {
  setComments: (comments: any) => void;
  articleId: string;
}) => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const onSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    const {
      current: { formValues, reset },
    } = formRef as any;

    const values = formValues();
    if (values)
      onCreateComment({ ...values, articleId, parentCommentId: null })
        .then(({ data }: any) => {
          if (data?.id) {
            setComments((prevComments: any) => [...prevComments, data]);
            reset();
          }
        })
        .finally(() => setLoading(false));
  };

  return (
    <div className="mt-4">
      <p className="md:text-lg text-base font-semibold mb-2">Bình luận</p>
      <FormProvider inputs={inputs} ref={formRef} className="space-y-6">
        <div className="w-full flex items-center justify-end">
          <ButtonLoad
            loading={loading}
            disabled={loading}
            onClick={onSubmit}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
            type="submit"
            label={
              <>
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
                Gửi
              </>
            }
          />
        </div>
      </FormProvider>
    </div>
  );
};

const CommentItem = ({ comment, createdAt }: Comment) => {
  return (
    <Animation
      animationName="fadeIn"
      inViewDefault={true}
      className="flex gap-2 items-center bg-primary/5 p-2 rounded"
    >
      <Image
        alt=""
        loading="lazy"
        width={100}
        height={100}
        decoding="async"
        data-nimg={1}
        className="w-12 h-12 object-contain rounded-full border"
        src={"/assets/images/logo-default.png"}
        style={{ color: "transparent" }}
      />
      <div>
        <p className="whitespace-nowrap">
          <span className="text-muted-foreground text-xs md:text-sm">
            {createdAt}
          </span>
        </p>
        <p className="md:text-base text-sm mt-1">{comment}</p>
      </div>
    </Animation>
  );
};

const OtherTips = ({ tips }: { tips: OtherTip[] }) => (
  <div className="mt-2">
    <Link
      href={"/tips"}
      className="md:text-base text-sm font-semibold py-2 px-4 rounded bg-primary text-white"
    >
      Xem tips khác
    </Link>
    {tips.map((tip: OtherTip, index: number) => (
      <Link key={index} className="font-semibold" href={`/tips/${tip.slug}`}>
        <div className="border text-card-foreground mt-3 py-2 bg-primary/5 rounded shadow-none hover:bg-primary/10">
          <div className="flex flex-col space-y-1.5 p-6 px-3 py-2">
            <h3 className="font-semibold tracking-tight truncate md:text-base text-sm">
              {tip.title}
            </h3>
          </div>
          <div className="p-6 px-3 py-0 mt-0">
            <div className="text-muted-foreground md:text-sm text-xs flex items-center gap-2">
              <span>{tip.createdAt}</span>
              <span>
                <svg
                  width={15}
                  height={15}
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span>{tip.matchSummary.leagueName}</span>
            </div>
            <div className="md:text-base text-xs mt-1 flex gap-2">
              <div className="inline-flex items-center border sm:max-w-[95px] max-w-[75px] h-[16px] md:h-full text-[10px] md:text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80 px-3 py-0.5 rounded-full font-semibold">
                {tip.chosenOddsName}
              </div>
              <span className="line-clamp-1">{tip.matchSummary.homeName}</span>
              <span>-</span>
              <span className="line-clamp-1">{tip.matchSummary.awayName}</span>
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
);

const ButtonLiked = ({ liked, id }: { liked: boolean; id: string }) => {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [loading, setLoading] = useState(false);

  const handleLike = () => {
    setLoading(true);
    if (!loading) {
      onLikeTip({ articleId: id })
        .then(() => setIsLiked(!isLiked))
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <ButtonLoad
        className={`whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-inputs shadow-sm hover:bg-accent hover:text-accent-foreground px-4 py-2 flex flex-col items-center justify-center rounded-full w-12 h-12 md:w-16 md:h-16 ${
          isLiked ? "bg-[#ff0046]" : "bg-background"
        }`}
        onClick={handleLike}
        aria-label="like"
        loading={loading}
        label={
          <svg
            width={15}
            height={15}
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="md:w-8 md:h-8 w-6 h-6"
          >
            <path
              d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        }
      ></ButtonLoad>
    </div>
  );
};
function TipDetail() {
  const pathname = usePathname();
  const [data, setData] = useState<Tip | null>(null);
  const [loading, setLoading] = useState(true);

  const slug = pathname.replace("/tips/", "");
  useEffect(() => {
    if (!data && loading && slug) {
      getTipDetail({ slug })
        .then(({ data }: any) => setData(data))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) return <Loading />;

  if (!data) return <></>;

  const {
    title,
    like,
    liked,
    views,
    id,
    createdAt,
    userSummary,
    matchSummary,
    rate1,
    rate2,
    rate3,
    content,
    listOtherTips,
  } = data;

  const match = {
    odds: [
      { text: `Tài ${rate1}`, bgColor: "bg-primary text-white" },
      { text: `T/X ${rate2}`, bgColor: "" },
      { text: rate3, bgColor: "" },
    ],
  };

  return (
    <>
      <main className="w-full md:w-9/12">
        <div className="w-full">
          <div className="w-full rounded-md border bg-card p-4">
            <h1 className="md:text-lg text-base flex items-center justify-between font-medium ">
              {title}
            </h1>
            <MatchHeader
              createdAt={createdAt}
              like={like}
              liked={liked}
              views={views}
            />
            <div className="mt-4 bg-primary/5 rounded p-4">
              <p className="md:text-base text-sm text-center grid">
                <span>{matchSummary.matchTime} </span>
                <span>{matchSummary.leagueName}</span>
              </p>
              <MatchDetails
                team1={{
                  logo: matchSummary.homeLogo,
                  name: matchSummary.homeName,
                }}
                team2={{
                  logo: matchSummary.awayLogo,
                  name: matchSummary.awayName,
                }}
                score1={matchSummary.homeScore}
                score2={matchSummary.awayScore}
                halfTime={matchSummary.halfStartTime}
              />
              <Odds odds={match.odds} />
            </div>
            <History history={content} />
            <ButtonLiked liked={liked} id={id} />
          </div>
          <OtherTips tips={listOtherTips} />
          <div className="w-full rounded-md border bg-card p-4 mt-2">
            <CommentSection articleId={id} />
          </div>
        </div>
      </main>
      <TipSidebar userSummary={userSummary} />
    </>
  );
}

export default TipDetail;
