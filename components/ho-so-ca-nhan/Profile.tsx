"use client";

import {
  getFollowing,
  getMe,
  onFollow,
  onUnFollow,
  onUpdateBio,
  onUpdateEmail,
  onUpdatePassword,
} from "@/services/account";
import { useAppStore } from "@/store/app-store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BioEditor from "./BioEditor";
import { FormInputEnum } from "../Form";
import { MATCH_PASSWORD } from "@/constants/app";
import Empty from "../home/Skeleton/Empty";
import ButtonLoad from "../Button";
import { getMyArticles } from "@/services/article";
import Link from "next/link";
import { formatDate, fromNow } from "@/utils";
import Loading from "../Loading";
import AvatarEditor from "./AvatarEditor";

const tabData = [
  { id: 1, title: "Thông tin cá nhân" },
  { id: 2, title: "Theo dõi của tôi" },
  { id: 3, title: "Tips của tôi" },
];

const TabList = ({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: { id: number; title: string }[];
  activeTab: number;
  setActiveTab: (tab: number) => void;
}) => (
  <div
    role="tablist"
    aria-orientation="horizontal"
    className="rounded-lg text-muted-foreground w-full flex h-full bg-transparent p-0 items-start justify-start gap-1 md:min-h-[50vh] md:flex-col"
    tabIndex={activeTab}
    data-orientation="horizontal"
    style={{ outline: "none" }}
  >
    {tabs.map((tab) => (
      <button
        key={tab.id}
        type="button"
        role="tab"
        aria-selected={tab.id === activeTab ? "true" : "false"}
        aria-controls={`radix-:rft:-content-${tab.id}`}
        data-state={tab.id === activeTab ? "active" : "inactive"}
        id={`radix-:rft:-trigger-${tab.id}`}
        className="items-center whitespace-nowrap rounded-md px-3 font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground data-[state=active]:shadow text-sm w-full flex justify-start py-2 hover:bg-primary/5 data-[state=active]:bg-primary/10 data-[state=active]:border-l-2 data-[state=active]:border-primary"
        tabIndex={activeTab}
        data-orientation="horizontal"
        data-radix-collection-item=""
        onClick={() => setActiveTab(tab.id)}
      >
        {tab.title}
      </button>
    ))}
  </div>
);

interface Profile {
  iconPath: string;
  id: number;
  title: string;
  value: string;
  actionText: string;
  editor: any;
  key: string;
}

const ProfileCard = ({ data }: { data: Profile[] }) => {
  const [isVisible, setIsVisible] = useState(0);

  return (
    <div className="grid grid-cols-1 gap-3 mt-4 md:grid-cols-2">
      {data.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border bg-card text-card-foreground shadow p-3 flex items-center justify-between hover:bg-primary/5"
        >
          {isVisible === item.id &&
            item.editor({
              isOpen: isVisible === item.id,
              setIsOpen: setIsVisible,
            })}
          <div className="flex items-center gap-4 flex-1">
            <svg
              width={15}
              height={15}
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
            >
              <path
                d={item.iconPath}
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex flex-col items-start flex-1">
              <p>{item.title}</p>
              <p
                className="text-sm text-muted-foreground truncate"
                id={item.key}
              >
                {item.value}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(item.id)}
            className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary shadow hover:bg-primary/90 px-3 text-xs rounded-full h-7 text-white"
          >
            {item.actionText}
          </button>
        </div>
      ))}
    </div>
  );
};

const inputBio: Input[] = [
  {
    name: "bio",
    type: FormInputEnum.INPUT,
    required: { value: true, message: "Vui lòng nhập bio!" },
    minLength: { value: 5, message: "Bio tối thiểu 5 kí tư" },
    maxLength: { value: 100, message: "Bio giới hạn 100 kí tự" },
    placeholder: "bio",
    className:
      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  },
];

const inputEmail: Input[] = [
  {
    name: "email",
    type: FormInputEnum.INPUT,
    required: { value: true, message: "Vui lòng nhập email!" },
    minLength: { value: 5, message: "Email tối thiểu 5 kí tư" },
    maxLength: { value: 100, message: "Email giới hạn 100 kí tự" },
    placeholder: "Email",
    className:
      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  },
];

function Profile() {
  const [data, setData] = useState<AccountBody | null>(null);
  const logout = useAppStore((store) => store.logout);
  const [activeTab, setActiveTab] = useState(1);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!data) {
      getMe()
        .then(({ data }: any) => setData(data))
        .finally(() => setLoading(false));
    }
  }, []);

  if (!data || loading) return <Loading />;

  const inputPassword: Input[] = [
    {
      name: "password",
      type: FormInputEnum.PASSWORD,
      required: { value: true, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
      minLength: { value: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
      pattern: {
        value: MATCH_PASSWORD,
        message:
          "Mật khẩu phải bao gồm ít nhất một chữ cái thường, một chữ cái hoa, một số, và một ký tự đặc biệt!",
      },
      placeholder: "Mật khẩu",
      label: "Mật khẩu",
      onChange(e) {
        const value = e.target.value;
        setPassword(value);
      },
      className:
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
    },
    {
      name: "confirm-password",
      type: FormInputEnum.PASSWORD,
      required: { value: true, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
      minLength: { value: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
      pattern: {
        value: MATCH_PASSWORD,
        message:
          "Mật khẩu phải bao gồm ít nhất một chữ cái thường, một chữ cái hoa, một số, và một ký tự đặc biệt!",
      },
      validation(val) {
        if (val !== password) return { message: `Mật khẩu không khớp!` };
      },
      placeholder: "Nhập lại mật khẩu",
      label: "Nhập lại mật khẩu",
      className:
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
    },
  ];

  const profileData = [
    {
      id: 1,
      iconPath:
        "M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82708 7.49972C1.82708 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82708 10.6327 1.82708 7.49972ZM5.03747 9.21395C4.87949 8.98746 4.56782 8.93193 4.34133 9.08991C4.11484 9.24789 4.05931 9.55956 4.21729 9.78605C4.93926 10.8211 6.14033 11.5 7.50004 11.5C8.85974 11.5 10.0608 10.8211 10.7828 9.78605C10.9408 9.55956 10.8852 9.24789 10.6587 9.08991C10.4323 8.93193 10.1206 8.98746 9.9626 9.21395C9.41963 9.99238 8.51907 10.5 7.50004 10.5C6.481 10.5 5.58044 9.99238 5.03747 9.21395ZM5.37503 6.84998C5.85828 6.84998 6.25003 6.45815 6.25003 5.97498C6.25003 5.4918 5.85828 5.09998 5.37503 5.09998C4.89179 5.09998 4.50003 5.4918 4.50003 5.97498C4.50003 6.45815 4.89179 6.84998 5.37503 6.84998ZM10.5 5.97498C10.5 6.45815 10.1083 6.84998 9.62503 6.84998C9.14179 6.84998 8.75003 6.45815 8.75003 5.97498C8.75003 5.4918 9.14179 5.09998 9.62503 5.09998C10.1083 5.09998 10.5 5.4918 10.5 5.97498Z",
      title: "Bio",
      value: data?.bio || "...",
      actionText: "Sửa đổi",
      editor: ({ isOpen, setIsOpen }: any) => (
        <BioEditor
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          inputs={inputBio}
          onUpdate={(values: any, onAction: () => void) =>
            onUpdateBio(values, onAction)
          }
          title="Bio"
          inputId="bio"
          description="Hãy cập nhật bio ngay cho mình."
        />
      ),
      key: "bio",
    },
    {
      id: 2,
      iconPath:
        "M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3L14 3V3.92494C13.9174 3.92486 13.8338 3.94751 13.7589 3.99505L7.5 7.96703L1.24112 3.99505C1.16621 3.94751 1.0826 3.92486 1 3.92494V3ZM1 4.90797V12H14V4.90797L7.74112 8.87995C7.59394 8.97335 7.40606 8.97335 7.25888 8.87995L1 4.90797Z",
      title: "Email",
      value: data?.email || "Trống",
      actionText: "Sửa đổi",
      key: "email",
      editor: ({ isOpen, setIsOpen }: any) => (
        <BioEditor
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          inputs={inputEmail}
          onUpdate={(values: any, onAction: () => void) =>
            onUpdateEmail(values, onAction)
          }
          inputId="email"
          title="Email"
          description="Hãy cập nhật email ngay cho mình."
        />
      ),
    },
    {
      id: 3,
      iconPath:
        "M5 4.63601C5 3.76031 5.24219 3.1054 5.64323 2.67357C6.03934 2.24705 6.64582 1.9783 7.5014 1.9783C8.35745 1.9783 8.96306 2.24652 9.35823 2.67208C9.75838 3.10299 10 3.75708 10 4.63325V5.99999H5V4.63601ZM4 5.99999V4.63601C4 3.58148 4.29339 2.65754 4.91049 1.99307C5.53252 1.32329 6.42675 0.978302 7.5014 0.978302C8.57583 0.978302 9.46952 1.32233 10.091 1.99162C10.7076 2.65557 11 3.57896 11 4.63325V5.99999H12C12.5523 5.99999 13 6.44771 13 6.99999V13C13 13.5523 12.5523 14 12 14H3C2.44772 14 2 13.5523 2 13V6.99999C2 6.44771 2.44772 5.99999 3 5.99999H4ZM3 6.99999H12V13H3V6.99999Z",
      title: "Mật khẩu",
      value: "*********",
      actionText: "Sửa đổi",
      editor: ({ isOpen, setIsOpen }: any) => (
        <BioEditor
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          inputs={inputPassword}
          onUpdate={(values: any, onAction: () => void) =>
            onUpdatePassword(values, onAction)
          }
          title="Đổi mật khẩu"
          description="Cập nhật mật khẩu mới."
        />
      ),
    },
  ];

  return (
      <div className="w-full md:w-10/12">
        <AvatarEditor isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="w-full bg-card md:rounded md:border p-4">
          <div className="flex items-center gap-6">
            <div className="relative" onClick={() => setIsOpen(!isOpen)}>
              <Image
                alt=""
                loading="lazy"
                width={100}
                height={100}
                decoding="async"
                data-nimg={1}
                className="w-16 h-16 object-contain border rounded-full p-0.5"
                src={data.avatar || "/assets/images/logo-default.png"}
              />
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground absolute bottom-0 -right-2 rounded-full w-8 h-8">
                <svg
                  width={15}
                  height={15}
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                >
                  <path
                    d="M2 3C1.44772 3 1 3.44772 1 4V11C1 11.5523 1.44772 12 2 12H13C13.5523 12 14 11.5523 14 11V4C14 3.44772 13.5523 3 13 3H2ZM0 4C0 2.89543 0.895431 2 2 2H13C14.1046 2 15 2.89543 15 4V11C15 12.1046 14.1046 13 13 13H2C0.895431 13 0 12.1046 0 11V4ZM2 4.25C2 4.11193 2.11193 4 2.25 4H4.75C4.88807 4 5 4.11193 5 4.25V5.75454C5 5.89261 4.88807 6.00454 4.75 6.00454H2.25C2.11193 6.00454 2 5.89261 2 5.75454V4.25ZM12.101 7.58421C12.101 9.02073 10.9365 10.1853 9.49998 10.1853C8.06346 10.1853 6.89893 9.02073 6.89893 7.58421C6.89893 6.14769 8.06346 4.98315 9.49998 4.98315C10.9365 4.98315 12.101 6.14769 12.101 7.58421ZM13.101 7.58421C13.101 9.57302 11.4888 11.1853 9.49998 11.1853C7.51117 11.1853 5.89893 9.57302 5.89893 7.58421C5.89893 5.5954 7.51117 3.98315 9.49998 3.98315C11.4888 3.98315 13.101 5.5954 13.101 7.58421Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div>
              <p className="md:text-base text-sm font-semibold">
                {data.fullName}
              </p>
              <div className="flex gap-2 md:text-sm text-xs text-muted-foreground">
                <span>
                  Bài viết
                  <span className="text-primary font-bold">
                    {data.totalTips}
                  </span>
                </span>
                <span>
                  Thích
                  <span className="text-primary font-bold">
                    {data.totalLike}
                  </span>
                </span>
                <span>
                  Người theo dõi
                  <span className="text-primary font-bold">
                    {data.totalFollowers}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex mt-3">
          <div
            dir="ltr"
            data-orientation="horizontal"
            className="w-full md:flex grid gap-3"
          >
            <div className="w-full h-full bg-card p-2 flex flex-col md:rounded md:border md:w-3/12">
              <TabList
                tabs={tabData}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
              />
              <button
                onClick={logout}
                className="items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 rounded-md px-8 hidden w-full md:flex"
              >
                Đăng xuất
              </button>
            </div>
            <div className="text-sm md:w-9/12 w-full bg-card md:rounded md:border p-3 md:text-base">
              {activeTab == 1 && (
                <div
                  data-state="active"
                  data-orientation="horizontal"
                  role="tabpanel"
                  aria-labelledby="radix-:rft:-trigger-me"
                  id="radix-:rft:-content-me"
                  tabIndex={0}
                  className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <p className="">Thông tin cá nhân</p>
                  <div
                    data-orientation="horizontal"
                    role="none"
                    className="shrink-0 bg-border h-[1px] w-full my-2"
                  />
                  <ProfileCard data={profileData as any} />
                </div>
              )}
              {activeTab == 2 && (
                <div
                  data-state="active"
                  data-orientation="horizontal"
                  role="tabpanel"
                  aria-labelledby="radix-:rft:-trigger-me"
                  id="radix-:rft:-content-me"
                  tabIndex={0}
                  className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <p className="">Theo dõi của tôi</p>
                  <div
                    data-orientation="horizontal"
                    role="none"
                    className="shrink-0 bg-border h-[1px] w-full my-2"
                  />
                  <Following />
                </div>
              )}
              {activeTab == 3 && (
                <div
                  data-state="active"
                  data-orientation="horizontal"
                  role="tabpanel"
                  aria-labelledby="radix-:rft:-trigger-me"
                  id="radix-:rft:-content-me"
                  tabIndex={0}
                  className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <p className="">Bài tips của tôi</p>
                  <div
                    data-orientation="horizontal"
                    role="none"
                    className="shrink-0 bg-border h-[1px] w-full my-2"
                  />
                  <Tips />
                </div>
              )}
              <div
                data-state="inactive"
                data-orientation="horizontal"
                role="tabpanel"
                aria-labelledby="radix-:rft:-trigger-following"
                id="radix-:rft:-content-following"
                tabIndex={0}
                className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <div
                data-state="inactive"
                data-orientation="horizontal"
                role="tabpanel"
                aria-labelledby="radix-:rft:-trigger-my-article"
                id="radix-:rft:-content-my-article"
                tabIndex={0}
                className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>
        </div>
      </div>
  );
}
const Tips = () => {
  const [tips, setTips] = useState<Tip[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tips && loading) {
      getMyArticles()
        .then(({ data }: any) => setTips(data))
        .finally(() => setLoading(false));
    }
  }, []);

  if (!tips || loading) return <Empty loading={loading} />;

  return (
    <>
      {tips.map((tip) => (
        <Link
          key={tip.id}
          className="flex flex-col flex-1 font-semibold"
          href={`/tips/${tip.slug}`}
        >
          <div className="border text-card-foreground mt-2 py-2 bg-primary/5 rounded shadow-none hover:bg-primary/10">
            <div className="flex flex-col space-y-1.5 p-6 px-3 py-2 items-center justify-between">
              <h3 className="font-semibold tracking-tight line-clamp-1 w-full flex justify-between md:text-base text-sm">
                <span>{tip.title}</span>
                <span className="text-muted-foreground text-sm">
                  {fromNow(tip.createdAt)}
                </span>
              </h3>
            </div>
            <div className="p-6 px-3 py-0 mt-0">
              <div className="text-muted-foreground text-xs md:text-sm flex items-center gap-2">
                <span className="line-clamp-1">
                  {formatDate(tip.createdAt)}
                </span>
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
                <span className="line-clamp-1">
                  {tip.matchSummary.leagueName}
                </span>
              </div>
              <div className="mt-1 flex justify-between gap-2">
                <div className="flex gap-2">
                  <div className="inline-flex items-center border sm:max-w-[95px] max-w-[75px] h-[16px] md:h-full text-[10px] md:text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80 px-3 py-0.5 rounded-full font-semibold">
                    {tip.chosenOdds}
                  </div>
                  <span className="line-clamp-1">
                    {tip.matchSummary.homeName}
                  </span>
                  <span>-</span>
                  <span className="line-clamp-1">
                    {tip.matchSummary.awayName}
                  </span>
                </div>
                {tip.isWin === null && (
                  <div className="inline-flex items-center border sm:max-w-[95px] max-w-[75px] h-[16px] md:h-full text-[10px] md:text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80 px-3 py-0.5 rounded-full font-semibold" />
                )}
                {tip.isWin === false && (
                  <div className="inline-flex items-center border sm:max-w-[95px] max-w-[75px] h-[16px] md:h-full text-[10px] md:text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-primary-foreground shadow hover:bg-primary/80 px-3 py-0.5 rounded-full font-semibold bg-red-500">
                    Sai
                  </div>
                )}
                {tip.isWin === true && (
                  <div className="inline-flex items-center border sm:max-w-[95px] max-w-[75px] h-[16px] md:h-full text-[10px] md:text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-primary-foreground shadow hover:bg-primary/80 px-3 py-0.5 rounded-full font-semibold bg-green-500">
                    Đúng
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};
const Following = () => {
  const [data, setData] = useState<UserInfo[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data && loading) {
      getFollowing()
        .then(({ data }: any) => setData(data))
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) return <Empty loading={loading} />;

  return (
    <div className="grid grid-cols-1 gap-3 mt-4 md:grid-cols-2">
      {data?.map((d) => {
        return <FollowingItem key={d.id} d={d} />;
      })}
    </div>
  );
};

const FollowingItem = ({ d }: { d: UserInfo }) => {
  const [isFollowing, setIsFollowing] = useState(true);
  const [loading, setLoading] = useState(false);

  const onClick = () => {
    setLoading(true);
    if (isFollowing) {
      onUnFollow(d.userId)
        .then(() => setIsFollowing(!isFollowing))
        .finally(() => setLoading(false));
    } else {
      onFollow(d.userId)
        .then(() => setIsFollowing(!isFollowing))
        .finally(() => setLoading(false));
    }
  };

  return (
    <div
      key={d.userId}
      className="rounded-xl border bg-card text-card-foreground shadow p-3 flex items-center justify-between hover:bg-primary/5"
    >
      <div className="flex items-center gap-4 flex-1">
        <Image
          alt={d.fullName}
          loading="lazy"
          width={50}
          height={50}
          decoding="async"
          data-nimg={1}
          className="w-10 h-10 object-contain border rounded-full p-0.5"
          src={d.avatar || "/assets/images/logo-default.png"}
          style={{ color: "transparent" }}
        />
        <div className="flex flex-col items-start flex-1">
          <p>{d.fullName}</p>
          <div className="flex gap-2 text-xs text-muted-foreground truncate font-bold">
            <span className="flex gap-1">
              <svg
                width={15}
                height={15}
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
              >
                <path
                  d="M4.2 1H4.17741H4.1774C3.86936 0.999988 3.60368 0.999978 3.38609 1.02067C3.15576 1.04257 2.92825 1.09113 2.71625 1.22104C2.51442 1.34472 2.34473 1.51442 2.22104 1.71625C2.09113 1.92825 2.04257 2.15576 2.02067 2.38609C1.99998 2.60367 1.99999 2.86935 2 3.17738V3.1774V3.2V11.8V11.8226V11.8226C1.99999 12.1307 1.99998 12.3963 2.02067 12.6139C2.04257 12.8442 2.09113 13.0717 2.22104 13.2837C2.34473 13.4856 2.51442 13.6553 2.71625 13.779C2.92825 13.9089 3.15576 13.9574 3.38609 13.9793C3.60368 14 3.86937 14 4.17741 14H4.2H10.8H10.8226C11.1306 14 11.3963 14 11.6139 13.9793C11.8442 13.9574 12.0717 13.9089 12.2837 13.779C12.4856 13.6553 12.6553 13.4856 12.779 13.2837C12.9089 13.0717 12.9574 12.8442 12.9793 12.6139C13 12.3963 13 12.1306 13 11.8226V11.8V3.2V3.17741C13 2.86936 13 2.60368 12.9793 2.38609C12.9574 2.15576 12.9089 1.92825 12.779 1.71625C12.6553 1.51442 12.4856 1.34472 12.2837 1.22104C12.0717 1.09113 11.8442 1.04257 11.6139 1.02067C11.3963 0.999978 11.1306 0.999988 10.8226 1H10.8H4.2ZM3.23875 2.07368C3.26722 2.05623 3.32362 2.03112 3.48075 2.01618C3.64532 2.00053 3.86298 2 4.2 2H10.8C11.137 2 11.3547 2.00053 11.5193 2.01618C11.6764 2.03112 11.7328 2.05623 11.7613 2.07368C11.8285 2.11491 11.8851 2.17147 11.9263 2.23875C11.9438 2.26722 11.9689 2.32362 11.9838 2.48075C11.9995 2.64532 12 2.86298 12 3.2V11.8C12 12.137 11.9995 12.3547 11.9838 12.5193C11.9689 12.6764 11.9438 12.7328 11.9263 12.7613C11.8851 12.8285 11.8285 12.8851 11.7613 12.9263C11.7328 12.9438 11.6764 12.9689 11.5193 12.9838C11.3547 12.9995 11.137 13 10.8 13H4.2C3.86298 13 3.64532 12.9995 3.48075 12.9838C3.32362 12.9689 3.26722 12.9438 3.23875 12.9263C3.17147 12.8851 3.11491 12.8285 3.07368 12.7613C3.05624 12.7328 3.03112 12.6764 3.01618 12.5193C3.00053 12.3547 3 12.137 3 11.8V3.2C3 2.86298 3.00053 2.64532 3.01618 2.48075C3.03112 2.32362 3.05624 2.26722 3.07368 2.23875C3.11491 2.17147 3.17147 2.11491 3.23875 2.07368ZM5 10C4.72386 10 4.5 10.2239 4.5 10.5C4.5 10.7761 4.72386 11 5 11H8C8.27614 11 8.5 10.7761 8.5 10.5C8.5 10.2239 8.27614 10 8 10H5ZM4.5 7.5C4.5 7.22386 4.72386 7 5 7H10C10.2761 7 10.5 7.22386 10.5 7.5C10.5 7.77614 10.2761 8 10 8H5C4.72386 8 4.5 7.77614 4.5 7.5ZM5 4C4.72386 4 4.5 4.22386 4.5 4.5C4.5 4.77614 4.72386 5 5 5H10C10.2761 5 10.5 4.77614 10.5 4.5C10.5 4.22386 10.2761 4 10 4H5Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-primary">{d.totalTips}</span>
            </span>
            <span className="flex gap-1">
              <svg
                width={15}
                height={15}
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
              >
                <path
                  d="M4.89346 2.35248C3.49195 2.35248 2.35248 3.49359 2.35248 4.90532C2.35248 6.38164 3.20954 7.9168 4.37255 9.33522C5.39396 10.581 6.59464 11.6702 7.50002 12.4778C8.4054 11.6702 9.60608 10.581 10.6275 9.33522C11.7905 7.9168 12.6476 6.38164 12.6476 4.90532C12.6476 3.49359 11.5081 2.35248 10.1066 2.35248C9.27059 2.35248 8.81894 2.64323 8.5397 2.95843C8.27877 3.25295 8.14623 3.58566 8.02501 3.88993C8.00391 3.9429 7.98315 3.99501 7.96211 4.04591C7.88482 4.23294 7.7024 4.35494 7.50002 4.35494C7.29765 4.35494 7.11523 4.23295 7.03793 4.04592C7.01689 3.99501 6.99612 3.94289 6.97502 3.8899C6.8538 3.58564 6.72126 3.25294 6.46034 2.95843C6.18109 2.64323 5.72945 2.35248 4.89346 2.35248ZM1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.0084 1.35248 6.73504 1.76049 7.20884 2.2953C7.32062 2.42147 7.41686 2.55382 7.50002 2.68545C7.58318 2.55382 7.67941 2.42147 7.79119 2.2953C8.265 1.76049 8.99164 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-primary">{d.totalLike}</span>
            </span>
            <span className="flex gap-1">
              <svg
                width={15}
                height={15}
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
              >
                <path
                  d="M0.877014 7.49988C0.877014 3.84219 3.84216 0.877045 7.49985 0.877045C11.1575 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1575 14.1227 7.49985 14.1227C3.84216 14.1227 0.877014 11.1575 0.877014 7.49988ZM7.49985 1.82704C4.36683 1.82704 1.82701 4.36686 1.82701 7.49988C1.82701 8.97196 2.38774 10.3131 3.30727 11.3213C4.19074 9.94119 5.73818 9.02499 7.50023 9.02499C9.26206 9.02499 10.8093 9.94097 11.6929 11.3208C12.6121 10.3127 13.1727 8.97172 13.1727 7.49988C13.1727 4.36686 10.6328 1.82704 7.49985 1.82704ZM10.9818 11.9787C10.2839 10.7795 8.9857 9.97499 7.50023 9.97499C6.01458 9.97499 4.71624 10.7797 4.01845 11.9791C4.97952 12.7272 6.18765 13.1727 7.49985 13.1727C8.81227 13.1727 10.0206 12.727 10.9818 11.9787ZM5.14999 6.50487C5.14999 5.207 6.20212 4.15487 7.49999 4.15487C8.79786 4.15487 9.84999 5.207 9.84999 6.50487C9.84999 7.80274 8.79786 8.85487 7.49999 8.85487C6.20212 8.85487 5.14999 7.80274 5.14999 6.50487ZM7.49999 5.10487C6.72679 5.10487 6.09999 5.73167 6.09999 6.50487C6.09999 7.27807 6.72679 7.90487 7.49999 7.90487C8.27319 7.90487 8.89999 7.27807 8.89999 6.50487C8.89999 5.73167 8.27319 5.10487 7.49999 5.10487Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-primary">{d.totalFollowers}</span>
            </span>
          </div>
        </div>
      </div>
      <ButtonLoad
        loading={loading}
        onClick={onClick}
        disabled={loading}
        className={
          isFollowing
            ? "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 px-3 text-xs rounded-full h-6"
            : "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground px-3 text-xs rounded-full h-6"
        }
        label={<span>{isFollowing ? "Đã theo dõi" : "Theo dõi"}</span>}
      />
    </div>
  );
};
Profile.propTypes = {};

export default Profile;
