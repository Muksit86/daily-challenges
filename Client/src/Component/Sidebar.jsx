import clsx from "clsx";
import React from "react";
import { LuHouse, LuTreePalm, LuUser } from "react-icons/lu";
import { Link, NavLink } from "react-router";

export default function Sidebar() {
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
      <div className="bg-background">
        <section className="flex justify-between px-5 py-5 md:flex-col md:mt-20 md:gap-10">
          {NavList.map((nav, index) => (
            <NavLink
              key={index}
              to={nav.link}
              className={({ isActive }) =>
                clsx(
                  "px-4 py-2 text-2xl rounded-xl hover:cursor-pointer flex justify-center items-center gap-2",
                  isActive && "bg-primary text-white"
                )
              }
            >
              {nav.icon}
              <span className="hidden md:block">{nav.text}</span>
            </NavLink>
          ))}
        </section>
      </div>
    </>
  );
}
