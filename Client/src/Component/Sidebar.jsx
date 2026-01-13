import clsx from "clsx";
import React from "react";
import { LuHouse, LuTreePalm, LuUser, LuMoon, LuSun } from "react-icons/lu";
import { Link, NavLink } from "react-router";
import { useTheme } from "../Healper/themeContext.jsx";

export default function Sidebar() {
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
      <div className="bg-background-sidebar dark:bg-background-sidebar-dark flex flex-col md:h-screen border-black border-t md:border-r md:border-t-0 dark:border-white">
        <section className="flex justify-between md:flex-col md:mt-20 md:gap-10">
          {NavList.map((nav, index) => (
            <NavLink
              key={index}
              to={nav.link}
              className={({ isActive }) =>
                clsx(
                  "w-full md:border-y px-4 py-3 text-black dark:text-white text-2xl hover:cursor-pointer flex justify-center items-center gap-2 hover:bg-hover-light dark:hover:bg-elevation-dark",
                  isActive &&
                  "bg-primary text-white hover:bg-primary dark:hover:bg-primary"
                )
              }
            >
              <span className="block md:hidden">{nav.icon}</span>
              <span className="hidden md:block">{nav.text}</span>
            </NavLink>
          ))}
        </section>
      </div>
    </>
  );
}
