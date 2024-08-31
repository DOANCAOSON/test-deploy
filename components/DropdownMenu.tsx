import React, { useState, useRef, useEffect, ReactNode } from "react";

interface DropdownMenuProps {
  children: React.ReactNode;
  label: string;
  Icon: React.JSX.Element;
  className: string;
  subClassName?: string
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  label,
  Icon,
  className,
  subClassName
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document?.addEventListener("mousedown", handleClickOutside);
    return () => {
      document?.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between px-4 py-2 rounded-md hover:bg-gray-200 ${className}`}
      >
        {Icon}
        <span className="">{label}</span>
      </button>
      {isOpen && (
        <div className={`absolute right-0 w-48 bg-white rounded-md shadow-lg mt-2 z-50 ${subClassName}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
