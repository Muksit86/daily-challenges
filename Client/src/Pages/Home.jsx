import React from "react";
import Button from "../Component/Button";
import { LuPlus, LuTreePalm } from "react-icons/lu";
import LogButton from "../Component/LogButton";
import Progress from "../Component/Progress";
import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <div className="bg-background flex-1 flex flex-col justify-between items-center">
        <header className="w-12/12 flex justify-between px-5 py-2">
          <Link to="/logs">
            <Button
              showTextOnMobile={false}
              text="View"
              icon={<LuTreePalm className="w-10 h-10" />}
            />
          </Link>

          <Button
            showTextOnMobile={false}
            text="New challenge"
            icon={<LuPlus className="w-10 h-10" />}
          />
        </header>
        <section>
          <Progress value={20} size={200} stroke={30} />
        </section>
        <section>
          <LogButton />
        </section>
      </div>
    </>
  );
}
