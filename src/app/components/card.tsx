import React, { ReactNode } from "react";
import { colorsCard } from "../styles/colors";

interface Props {
    children?: ReactNode,
    color?: string,
    shadowColor?: string,
    className?: string,
    isFull?: boolean
}

export default function Card({
  children,
  color = "white",
  shadowColor,
  className = '',
  isFull = true
}: Props) {

  const shadow = shadowColor? "0px 6px 6px 0px" + shadowColor + ", -2px -4px 10px 2px " + shadowColor : "0px 6px 6px 0px #dae6ff, -2px -4px 10px 2px rgba(255, 255, 255, 0.25)";

  return (
    <div className={`${colorsCard[color]} ${isFull && 'h-full'} rounded-3xl p-3 content-center ${className}`}
      style={{
        boxShadow: shadow,
      }}
    >
      {children}
    </div>
  );
}