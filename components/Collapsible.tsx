import React from "react";

const Collapsible = ({ label, isOpen, children, className, onToggle }: any) => {
  return (
    <div className={`w-full mt-0.5 ${className}`}>
      <div
        className="w-full flex items-center justify-between rounded py-1.5 px-2 cursor-pointer hover:bg-primary/10"
        onClick={onToggle}
      >
        <div className="flex items-center">
          {label}
          {/* <Image
            alt=""
            loading="lazy"
            width={20}
            height={20}
            className="mr-2 w-5 h-5 object-contain bg-white rounded"
            src={iconSrc}
            style={{ color: "transparent" }}
          />
          <span className="text-xs mr-2 font-medium md:text-sm">{title}</span> */}
        </div>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline col-span-1">
          <svg
            width={15}
            height={15}
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={isOpen ? "rotate-180" : ""}
          >
            <path
              d="M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.38523C7.64964 4.20492 7.35036 4.20492 7.15803 4.38523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {
        isOpen && children
        // <div className="flex flex-col items-end w-full">
        //   {items.map((item, index) => (
        //     <a
        //       key={index}
        //       className="flex items-center mt-1 py-1 px-2 rounded cursor-pointer w-[90%] text-pretty hover:bg-primary/10"
        //       href={item.href}
        //     >
        //       <Image
        //         alt=""
        //         loading="lazy"
        //         width={20}
        //         height={20}
        //         className="mr-2 w-4 h-4 object-contain bg-white rounded"
        //         src={item.iconSrc}
        //         style={{ color: "transparent" }}
        //       />
        //       <span className="text-xs mr-2 font-medium text-pretty flex flex-1 md:text-xs">
        //         {item.label}
        //       </span>
        //     </a>
        //   ))}
        // </div>
      }
    </div>
  );
};

export default Collapsible;
