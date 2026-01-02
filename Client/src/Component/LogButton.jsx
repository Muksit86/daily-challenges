import React from "react";
import { LuTreePalm } from "react-icons/lu";

export default function LogButton() {
  const playSound = () => {
    const audio = new Audio("/win_sound.mp3");
    audio.play();
  };

  return (
    <>
      <label className="flex items-center justify-between bg-[#FFF7EC] px-6 py-4 rounded-2xl max-w-md cursor-pointer select-none gap-3 md:gap-5">
        {/* Text */}
        <span className="text-xl md:text-3xl font-semibold text-slate-900">
          Log today’s win
        </span>

        {/* Actual checkbox (hidden but real) */}
        <input
          type="checkbox"
          onClick={playSound}
          onChange={(e) => console.log(e.target.checked)}
          className="peer sr-only"
        />

        {/* Custom UI */}
        <span
          className="
          w-14 h-14 md:w-18 md:h-18 rounded-2xl flex items-center justify-center
          transition-all duration-200
          border-2 border-blue-400
          peer-checked:bg-blue-500
          peer-checked:animate-bounce-in
        "
        >
          <LuTreePalm
            className="
            w-7 h-7 md:w-10 md:h-10 text-background
          "
          />
        </span>
      </label>
    </>
  );
}
