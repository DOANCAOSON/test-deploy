"use client"
import React, { useState } from "react";
import Modal from "../Modal";
import Image from "next/image";
import Register from "./Register";
import SignIn from "./SignIn";
import { useAppStore } from "@/store/app-store";

const Authentication = () => {
  const isOpen = useAppStore((store) => store.isOpen)
  const onSetIsOpen = useAppStore((store) => store.onSetIsOpen)

  const [state, setState] = useState<"signIn" | "signUp">("signIn");

  const authInfo: Record<"signIn" | "signUp", {
    title: string;
    component: JSX.Element;
    footer: JSX.Element;
  }> = {
    signIn: {
      title: "Đăng nhập vào tài khoản có sẵn",
      component: <SignIn setOpen={onSetIsOpen} />,
      footer: (
        <div className="flex items-center justify-center py-2">
          <span className="text-sm text-muted-foreground">
            Bạn chưa có tài khoản?
          </span>
          <button
            onClick={() => setState("signUp")}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-9 py-2 px-1"
          >
            Đăng ký
          </button>
        </div>
      ),
    },
    signUp: {
      title: "Tạo tài khoản mới",
      component: <Register setOpen={onSetIsOpen} />,
      footer: (
        <div className="flex items-center justify-center py-2">
          <span className="text-sm text-muted-foreground">
            Bạn đã có tài khoản?
          </span>
          <button
            onClick={() => setState("signIn")}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-9 py-2 px-1"
          >
            Đăng nhập
          </button>
        </div>
      ),
    },
  };

  return (
    <Modal showModal={isOpen} setShowModal={onSetIsOpen}>
      <div className="flex flex-col space-y-1.5 text-center sm:text-left">
        <h2
          id="radix-:r1:"
          className="text-lg font-semibold leading-none tracking-tight flex items-center justify-center"
        >
          <Image
            alt=""
            loading="lazy"
            width={200}
            height={150}
            decoding="async"
            data-nimg={1}
            className="h-20 w-40 object-contain"
            src="/assets/images/logo-dark.webp"
            style={{ color: "transparent" }}
          />
        </h2>
        <div className="py-4 w-full mx-auto lg:w-4/5">
          <p className="font-semibold text-center text-lg mb-4">
            {authInfo[state].title}
          </p>
          {authInfo[state].component}
          {authInfo[state].footer}
        </div>
      </div>
    </Modal>
  );
};

export default Authentication;
