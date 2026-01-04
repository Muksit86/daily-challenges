import React from "react";
import clsx from "clsx";

export default function Button({
  icon,
  text,
  showTextOnMobile = true,
  textSize = "text-2xl",
  color = "primary",
  onClick,
  paddingClass = "px-4 py-2",
}) {
  return (
    <>
      <button
        onClick={onClick}
        className={clsx(
          "group  -md text-white font-semibold flex items-center justify-center md:gap-2 gap-2 cursor-pointer transition-all duration-200 hover: -lg hover:scale-101 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
          paddingClass,
          textSize,
          color === "primary" && "bg-primary",
          color === "danger" && "bg-danger hover:bg-red-600"
        )}
      >
        <span className="rotate-0 group-hover:animate-rotate-in">{icon}</span>

        <span
          className={clsx(showTextOnMobile ? "inline" : "hidden sm:inline")}
        >
          {text}
        </span>
      </button>
    </>
  );
}
