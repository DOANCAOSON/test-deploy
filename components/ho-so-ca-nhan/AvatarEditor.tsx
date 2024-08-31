import React, { useState } from "react";
import Modal from "../Modal";
import { onUpdateAvatar } from "@/services/account";
import Image from "next/image";
import auth from "@/utils/auth";
import fetchClient from "@/utils/fetchClient";

function AvatarEditor({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const [img, setImg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file, file.name);
    const token = auth.getToken();
    fetchClient
      .post(`https://client.banhgio88.com/api/accounts/me/avatar`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then(({ data }) => setImg(data.data))
      .finally(() => setLoading(false));
  };

  return (
    <Modal showModal={isOpen} setShowModal={setIsOpen}>
      <div className="flex flex-col space-y-1.5 text-center sm:text-left">
        <h2
          id="radix-:rgj:"
          className="text-lg font-semibold leading-none tracking-tight"
        >
          Đổi hình ảnh đại diện
        </h2>
        <p id="radix-:rgk:" className="text-sm text-muted-foreground">
          Tải lên hình ảnh đại diện
        </p>
      </div>
      <div className="grid gap-4 py-4">
        <div>
          <label
            role="presentation"
            tabIndex={0}
            htmlFor="dropzone-file"
            className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-dashed rounded-lg cursor-pointer "
          >
            <div className="text-center">
              <div className="border p-2 rounded-md max-w-min mx-auto">
                <svg
                  width={15}
                  height={15}
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.994 4.64254 10.994 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12C3 12.5538 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12C13 13.104 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="mt-2 text-sm ">
                <span className="font-semibold">Drag files</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Click to upload files (files should be under 5MB )
              </p>
            </div>
          </label>
          <input
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 hidden"
            accept="image/png, image/jpeg, image/jpg"
            multiple
            tabIndex={-1}
            id="dropzone-file"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      </div>{" "}
      {loading && <span>Đang tải...</span>}
      {img && (
        <Image
          alt=""
          loading="lazy"
          width="1000"
          height="1000"
          decoding="async"
          data-nimg="1"
          className="w-full object-contain"
          src={img ?? "/assets/images/logo-default.png"}
        />
      )}
      <button
        type="button"
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        onClick={() => setIsOpen(false)}
      >
        <svg
          width={15}
          height={15}
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
        >
          <path
            d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
        <span className="sr-only">Close</span>
      </button>
    </Modal>
  );
}

AvatarEditor.propTypes = {};

export default AvatarEditor;
