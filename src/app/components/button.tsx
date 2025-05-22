'use client';
import React, { ReactNode } from "react";
import { colorsButton } from "../styles/colors";

type Props = {
  children: ReactNode;
  id?: string;
  color?: keyof typeof colorsButton;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  iconTop?: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  children,
  id,
  color = "futuro",
  iconLeft,
  iconRight,
  iconTop,
  onClick,
  className = "",
  style = {
    boxShadow:
      "0px 2px 2px 0px #dae6ff, -2px -4px 5px 2px rgba(255, 255, 255, 0.25)",
  },
  disabled,
  type = "button",
}: Readonly<Props>) {
  const colorClass =
    onClick && !disabled ? colorsButton[color] ?? colorsButton["futuro"] : "bg-gray-200 text-gray-400";

  return (
    <button
      id={id}
      onClick={() => onClick?.()}
      disabled={!onClick || disabled}
      className={`${colorClass} font-medium rounded-xl text-sm px-4 py-2 text-center items-center ${className}`}
      style={style}
      type={type}
    >
      <div className="flex flex-col justify-center items-center">
        {iconTop && <div className="mb-2">{iconTop}</div>}
        <div className="flex gap-4 flex-row items-center">
          {iconLeft ?? ""}
          {children}
        </div>
        {iconRight ?? ""}
      </div>
    </button>
  );
}
