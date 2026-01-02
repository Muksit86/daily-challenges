import React from "react";
import { useLog } from "../Healper/LogContext";
import { useChallenges } from "../Healper/ChallengesContext";
import Button from "../Component/Button";
import { LuPlus, LuTreePalm } from "react-icons/lu";
import LogButton from "../Component/LogButton";
import Progress from "../Component/Progress";
import { Link } from "react-router";

export default function Home() {
  const { getLogsCount } = useLog();
  const { getSelectedChallenge, getChallenges } = useChallenges();

  const selectedChallenge = getSelectedChallenge();
  const allChallenges = getChallenges();
  const logsCount = selectedChallenge ? getLogsCount(selectedChallenge.id) : 0;

  // Calculate progress based on selected challenge
  const progressPercentage = selectedChallenge
    ? (logsCount / selectedChallenge.days) * 100
    : 0;

  return (
    <>
      <div className="bg-background dark:bg-background-dark flex-1 flex flex-col items-center justify-between py-5">
        {/* Head Button */}
        <header className="w-full flex justify-between items-center px-5">
          <Link to="/logs">
            <Button
              showTextOnMobile={false}
              text="View"
              icon={<LuTreePalm className="w-10 h-10" />}
            />
          </Link>

          <Link to="/newchallenge">
            <Button
              showTextOnMobile={false}
              text="New challenge"
              icon={<LuPlus className="w-10 h-10" />}
            />
          </Link>
        </header>

        {/* No Challenges */}
        {allChallenges.length === 0 ? (
          <section className="flex flex-col items-center justify-center gap-4 flex-1">
            <p className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white text-center px-4">
              No challenges yet
            </p>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 text-center px-4">
              Create your first challenge to get started
            </p>
            <Link to="/newchallenge">
              <Button
                textSize="sm"
                text="Create Challenge"
                icon={<LuPlus className="w-6 h-6" />}
              />
            </Link>
          </section>
        ) : (
          <>
            {/* Challenge Name */}
            {selectedChallenge && (
              <section className="flex flex-col items-center gap-2">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white text-center px-4">
                  {selectedChallenge.title}
                </h2>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                  {logsCount} / {selectedChallenge.days} days
                </p>
              </section>
            )}

            {/* Progress Wheel */}
            <section>
              <Progress
                value={Math.floor(Math.min(progressPercentage, 100))}
                size={200}
                stroke={30}
              />
            </section>

            {/* Today's log */}
            <section className="">
              <LogButton challengeId={selectedChallenge.id} />
            </section>
          </>
        )}
      </div>
    </>
  );
}
