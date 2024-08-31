import React, { useMemo, useState, useRef, ReactNode } from "react";
import classNames from "classnames";

const iconMap = {
  success: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  ),
  info: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
  ),
  error: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
      />
    </svg>
  ),
  warning: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
      />
    </svg>
  ),
  close: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  ),
};

interface AlertProps {
  type?: "success" | "info" | "warning" | "error";
  closable?: boolean;
  closeText?: React.ReactNode;
  message?: React.ReactNode;
  description?: React.ReactNode;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  afterClose?: () => void;
  showIcon?: boolean;
  role?: string;
  style?: React.CSSProperties;
  className?: string;
  banner?: boolean;
  icon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  action?: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  id?: string;
}

interface IconNodeProps {
    type: 'success' | 'info' | 'warning' | 'error';
    icon?: ReactNode;
  }

const IconNode = ({ type, icon }: IconNodeProps) => {
  const Icon = iconMap[type] as any;
  return icon ? (
    <span className="alert-icon">{icon}</span>
  ) : Icon ? (
    <Icon className="alert-icon" />
  ) : null;
};

const CloseIconNode = ({ isClosable, closeIcon, handleClose }: any) => {
  const defaultCloseIcon = iconMap.close;
  const icon = closeIcon || defaultCloseIcon;
  return isClosable ? (
    <button type="button" onClick={handleClose} className="alert-close-icon">
      {icon}
    </button>
  ) : null;
};

const Alert = (props: AlertProps) => {
  const {
    description,
    message,
    banner,
    className,
    style,
    onMouseEnter,
    onMouseLeave,
    onClick,
    afterClose,
    showIcon,
    closable,
    closeText,
    closeIcon,
    action,
    id,
    ...otherProps
  } = props;

  const [closed, setClosed] = useState(false);
  const internalRef = useRef<HTMLDivElement>(null);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClosed(true);
    props.onClose?.(e);
  };

  const type = useMemo(
    () => props.type || (banner ? "warning" : "info"),
    [props.type, banner]
  );

  const isClosable = useMemo(
    () => closable || closeText || closeIcon,
    [closable, closeText, closeIcon]
  );

  const alertCls = classNames(
    "alert",
    `alert-${type}`,
    {
      "alert-with-description": !!description,
      "alert-banner": !!banner,
    },
    className
  );

  if (closed) {
    afterClose?.();
    return null;
  }

  return (
    <div
      id={id}
      ref={internalRef}
      className={alertCls}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      role="alert"
      {...otherProps}
    >
      {showIcon !== false && <IconNode type={type} icon={props.icon} />}
      <div className="alert-content">
        {message && <div className="alert-message">{message}</div>}
        {description && <div className="alert-description">{description}</div>}
      </div>
      {action && <div className="alert-action">{action}</div>}
      <CloseIconNode
        isClosable={isClosable}
        closeIcon={closeIcon}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Alert;
