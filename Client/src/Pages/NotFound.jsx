import React from "react";
import wrongUrl from "../assets/wrong_url.jpg";
import Button from "../Component/Button";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-10">
        <div>
          <img src={wrongUrl} alt="meme-image" />
        </div>

        <div className="flex-1 text-center w-6/12 text-2xl">
          <span>Looks like you typed a wrong url</span>
        </div>

        <Link to="/dashboard">
          <Button text="Go Back to Home" />
        </Link>
      </div>
    </div>
  );
}
