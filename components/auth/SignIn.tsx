import React, { useRef, useState } from "react";
import { FormInputEnum, FormProvider } from "../Form";
import ButtonLoad from "../Button";
import { MATCH_PASSWORD } from "@/constants/app";
import { SignInUser } from "@/services/auth";
import { Animation } from "../Animation";
import { useAppStore } from "@/store/app-store";

const inputs: Input[] = [
  {
    name: "username",
    type: FormInputEnum.INPUT,
    required: { value: true, message: "Vui lòng nhập tài khoản!" },
    minLength: { value: 4, message: "Vui lòng nhập tài khoản!" },
    placeholder: "Tài khoản",
    label: "Tài khoản",
    className:
      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  },
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
    className:
      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  },
];

function SignIn({ setOpen }: { setOpen: (val: boolean) => void }) {
  const [loading, setLoading] = useState(false);
  const login = useAppStore((store) => store.login);
  const formRef = useRef(null);

  const onSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    const {
      current: { formValues },
    } = formRef as any;

    const values = formValues();
    if (values)
      await SignInUser(values, () => {
        setOpen(false);
        login();
      });
    setLoading(false);
  };

  return (
    <Animation animationName="fadeIn" inViewDefault={true}>
      <FormProvider inputs={inputs} ref={formRef} className="space-y-6">
        <ButtonLoad
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
          onClick={onSubmit}
          type="submit"
          label={<span>ĐĂNG NHẬP</span>}
          loading={loading}
        />
      </FormProvider>
    </Animation>
  );
}

SignIn.propTypes = {};

export default SignIn;
