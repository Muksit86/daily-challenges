import React from "react";
import clsx from "clsx";

export default function Button({
  icon,
  text,
  showTextOnMobile = true,
  textSize = "md",
  color = "primary",
  onClick,
}) {
  return (
    <>
      <button
        onClick={onClick}
        className={clsx(
          "shadow-md text-white font-semibold px-4 py-2 rounded-xl flex items-center justify-center md:gap-2 gap-2 cursor-pointer transition-all duration-200 active:animate-bounce-in hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
          textSize === "md" && "text-3xl",
          textSize === "sm" && "text-sm",
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
