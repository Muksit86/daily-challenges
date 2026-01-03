import React from "react";
import { IoMdMore } from "react-icons/io";
import Progress from "./Progress";
import { useNavigate } from "react-router";
import { useChallenges } from "../Healper/ChallengesContext";
import { useLog } from "../Healper/LogContext";

export default function ChallenegCard({ challenge }) {
  const navigate = useNavigate();
  const { selectChallenge } = useChallenges();
  const { getLogsCount } = useLog();

  // Calculate progress for this challenge
  const logsCount = getLogsCount(challenge.id);
  const progressPercentage = Math.round((logsCount / challenge.days) * 100);

  const handleCardClick = () => {
    // Select this challenge and navigate to logs page
    selectChallenge(challenge.id);
    navigate("/logs");
  };

  return (
    <>
      <div
        className="bg-primary p-5 rounded-xl flex flex-col items-center gap-3 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 animate-slide-up w-full max-w-sm"
        onClick={handleCardClick}
      >
        <div className="gap-3 flex flex-col items-center w-full">
          <Progress value={progressPercentage} />
          <span className="text-white font-bold text-lg text-center line-clamp-2">
            {challenge.title}
          </span>
          <span className="text-white/80 text-sm">
            {logsCount} / {challenge.days} days
          </span>
        </div>
      </div>
    </>
  );
}
