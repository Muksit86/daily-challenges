import clsx from "clsx";
import React from "react";
import { LuHouse, LuTreePalm, LuUser, LuMoon, LuSun } from "react-icons/lu";
import { Link, NavLink } from "react-router";
import { useTheme } from "../Healper/themeContext.jsx";

export default function Sidebar() {
  const { isDark, toggleTheme } = useTheme();
  const NavList = [
    {
      text: "Home",
      link: "/dashboard",
      icon: <LuHouse size={30} />,
    },
    {
      text: "Logs",
      link: "/logs",
      icon: <LuTreePalm size={30} />,
    },
    {
      text: "Profile",
      link: "/profile",
      icon: <LuUser size={30} />,
    },
  ];
  return (
    <>
      <div className="bg-background dark:bg-background-dark flex flex-col md:h-screen text-black">
        <section className="flex justify-between px-5 py-5 md:flex-col md:mt-20 md:gap-10">
          {NavList.map((nav, index) => (
            <NavLink
              key={index}
              to={nav.link}
              className={({ isActive }) =>
                clsx(
                  "px-4 py-2 text-black dark:text-white text-2xl rounded-xl hover:cursor-pointer flex justify-center items-center gap-2 active:animate-bounce-in transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-105 active:scale-95",
                  isActive &&
                  "bg-primary text-white shadow-md hover:bg-blue-700 hover:scale-105"
                )
              }
            >
              {nav.icon}
              <span className="hidden md:block">{nav.text}</span>
            </NavLink>
          ))}
          <button
            onClick={toggleTheme}
            className="px-4 py-2 text-black dark:text-white text-2xl rounded-xl hover:cursor-pointer flex justify-center items-center gap-4 active:animate-bounce-in hover:bg-primary hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <LuSun size={30} /> : <LuMoon size={30} />}
            <span className="hidden md:block">{isDark ? "Light" : "Dark"}</span>
          </button>
        </section>

        {/* Ads Placeholder */}
        <div className="mt-auto px-5 py-8 md:flex flex-col gap-4 hidden">
          <div className="bg-slate-200 dark:bg-slate-700 rounded-xl p-4 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">
              Ad Space
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
              Your ads here
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
