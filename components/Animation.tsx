"use client";
type AnimationType = "fadeIn" | "slideIn" | "slideInFromLeft" | "slideInFromRight";

interface MotionProps {
  animationName: AnimationType;
  children: React.ReactNode;
  className?: string;
  id?: string;
  duration?: number;
  inViewDefault?: boolean;
  key?: string | number;
  width?: string;
  style?: any;
}

export const Animation = (props: MotionProps) => {
  const {
    children,
    animationName,
    className = "",
    duration = 0.5,
    inViewDefault = false,
    width = "100%",
    style = {},
    ...rest
  } = props;

  const containerStyle = {
    width,
    visibility: inViewDefault ? "visible" : "hidden",
    animationDuration: `${duration}s`,
    ...style,
  } as any;

  return (
    <div
      {...rest}
      className={`animation ${className} ${inViewDefault ? animationName : ""}`}
      style={containerStyle}
    >
      {children}
    </div>
  );
};
