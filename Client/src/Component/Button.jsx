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
          "shadow-md text-white font-semibold rounded-xl flex items-center justify-center md:gap-2 gap-2 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-101 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
          paddingClass,
          textSize,
          color === "primary" && "bg-primary hover:bg-blue-700",
          color === "danger" && "bg-danger hover:bg-red-600"
        )}
      >
        {icon}
        <span
          className={clsx(showTextOnMobile ? "inline" : "hidden sm:inline")}
        >
          {text}
        </span>
      </button>
    </>
  );
}
