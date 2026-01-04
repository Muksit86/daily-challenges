import React from "react";
import memeImage from "../assets/meme_requesting.jpg";
import Button from "../Component/Button";
import { Link } from "react-router";

export default function RequestingPage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-10">
        <div>
          <img src={memeImage} alt="meme-image" />
        </div>

        <div className="flex-1 text-center w-6/12 text-2xl">
          <span>
            I need few more days to implement the authentication. Enjoy guest
            mode For now
          </span>
        </div>

        <Link to="/">
          <Button text="Go Back" />
        </Link>
      </div>
    </div>
  );
}
