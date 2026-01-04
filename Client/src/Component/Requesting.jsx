import clsx from "clsx";
import memeImage from "../assets/meme_requesting.jpg";

export default function Requesting({ className }) {
  return (
    <>
      <div
        className={clsx(
          "bg-primary w-60 flex flex-col items-center p-3  -sm gap-5",
          className
        )}
      >
        <div>
          <img src={memeImage} className="w-15 h-15" alt="meme-image" />
        </div>

        <div className="flex-1 text-center text-sm">
          <span>
            I need few more days to implement the authentication. Enjoy guest
            mode For now
          </span>
        </div>
      </div>
    </>
  );
}
