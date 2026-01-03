import React from "react";

export default function Progress({
  value = 0, // 0 - 100
  size = 120,
  stroke = 10,
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <>
      <div className="relative inline-flex items-center justify-center animate-fade-in">
        <svg
          width={size}
          height={size}
          className="-rotate-90 filter drop-shadow-lg"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={stroke}
            className="fill-none stroke-gray-400"
          />

          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={stroke}
            className="fill-none stroke-gray-50 transition-all duration-700 ease-out"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>

        {/* Center text */}
        <span className="absolute text-2xl text-white font-bold">
          {value}%
        </span>
      </div>
    </>
  );
}
