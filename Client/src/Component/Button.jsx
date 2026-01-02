import React from "react";
import clsx from "clsx";

export default function Button({
  icon,
  text,
  showTextOnMobile = true,
  textSize = "md",
  color = "primary",
}) {
  return (
    <>
      <button
        className={clsx(
          "shadow-sm text-white text-3xl font-semibold px-4 py-2 rounded-xl flex items-center justify-center md:gap-2 gap-2 cursor-pointer active:animate-bounce-in",
          textSize === "md" && "text-3xl",
          textSize === "sm" && "text-sm",
          color === "primary" && "bg-primary",
          color === "danger" && "bg-danger"
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
