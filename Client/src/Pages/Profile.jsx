import React, { useState } from "react";
import { LuChevronRight, LuMail } from "react-icons/lu";
import { Link } from "react-router";
import Button from "../Component/Button";

export default function Profile() {
  const [email, setEmail] = useState("amuksit7@gmail.com");
  const handleChangeEmail = () => {
    console.log("New email:", email);
    // 👉 call API here
  };

  return (
    <>
      <div className="min-h-screen bg-background flex-1 flex flex-col items-center justify-center py-10 px-5">
        <main className="flex-1 flex flex-col items-center px-4 py-6 pb-24 md:pb-6 mt-20 gap-5 w-12/12">
          {/* Email input */}
          <div className="w-full max-w-md space-y-2">
            <label className="flex items-center gap-2 font-medium">
              <LuMail size={16} />
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
              w-full rounded-xl px-4 py-3
              bg-white shadow-sm
              outline-none border
              focus:ring-2 focus:ring-primary
            "
            />

            <button
              onClick={handleChangeEmail}
              className="w-full mt-2 py-2 rounded-xl bg-primary text-white font-medium cursor-pointer active:scale-102 text-xl"
            >
              Change email
            </button>
          </div>

          {/* Check challenges */}
          <button className="w-full max-w-md mt-6 flex items-center justify-between bg-white rounded-xl px-4 py-4 shadow-sm">
            <Link className="flex justify-between w-full" to="/challenges">
              <span className="text-2xl">Check your challenges</span>
              <LuChevronRight size={30} />
            </Link>
          </button>

          {/* Actions */}
          <div className="w-full max-w-md mt-8 flex md:flex-col gap-4 justify-between">
            <Button color={"danger"} textSize="sm" text={"Log out"} />
            <Button color={"danger"} textSize="sm" text={"Delete account"} />
          </div>
        </main>
      </div>
    </>
  );
}
