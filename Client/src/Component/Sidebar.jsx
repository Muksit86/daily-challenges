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
      link: "/",
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
      <div className="bg-background dark:bg-background-dark border-r border-slate-200 dark:border-slate-700">
        <section className="flex justify-between px-5 py-5 md:flex-col md:mt-20 md:gap-10">
          {NavList.map((nav, index) => (
            <NavLink
              key={index}
              to={nav.link}
              className={({ isActive }) =>
                clsx(
                  "px-4 py-2 dark:text-white text-2xl rounded-xl hover:cursor-pointer flex justify-center items-center gap-2 active:animate-bounce-in transition-transform transition-shadow duration-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-105 active:scale-95",
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
            className="px-4 py-2 dark:text-white text-2xl rounded-xl hover:cursor-pointer flex justify-center items-center gap-4 active:animate-bounce-in hover:bg-primary hover:text-white transition-transform transition-shadow duration-200 hover:scale-105 active:scale-95"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <LuSun size={30} /> : <LuMoon size={30} />}
            <span className="hidden md:block">{isDark ? "Light" : "Dark"}</span>
          </button>
        </section>
      </div>
    </>
  );
}
