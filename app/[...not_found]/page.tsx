import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-2">
      <p className="font-extrabold text-transparent text-9xl bg-clip-text bg-gradient-to-t from-primary to-primary/70">
        404
      </p>
      <p className="mt-4 text-2xl font-medium text-center">
        Rất tiếc! Không tìm thấy trang :(
      </p>
      <p className="text-md text-center mt-2">
        Liên kết này có thể bị hỏng, hoặc trang này có thể đã được loại bỏ.
      </p>
      <Link
        className="flex items-center mt-4 text-primary bg-white border-primary shadow-sm border px-2 py-1 text-sm rounded hover:shadow-primary lg:rounded-lg lg:h-10 lg:px-4"
        href="/"
      >
        <svg
          width={15}
          height={15}
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
        <p className="ml-2 bg-clip-text bg-gradient-to-t from-primary to-primary/70">
          Trở về trang chủ
        </p>
      </Link>
    </div>
  );
}

page.propTypes = {};

export default page;
