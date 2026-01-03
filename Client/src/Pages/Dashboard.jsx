import React from "react";
import { useLog } from "../Healper/LogContext";
import { useChallenges } from "../Healper/ChallengesContext";
import Button from "../Component/Button";
import { LuPlus } from "react-icons/lu";
import { Link } from "react-router";
import ChallenegCard from "../Component/ChallenegCard";

export default function Dashboard() {
  const { getChallenges } = useChallenges();

  const allChallenges = getChallenges();

  return (
    <>
      <div className="bg-background dark:bg-background-dark flex flex-col items-center min-h-screen py-3 md:py-5 animate-fade-in">
        {/* Head Button */}
        <header className="w-full flex justify-between items-center px-3 md:px-5 mb-4 md:mb-8 animate-slide-up">
          <Link to="/newchallenge">
            <Button
              showTextOnMobile={false}
              text="New challenge"
              icon={<LuPlus className="w-5 h-5" />}
            />
          </Link>
        </header>

        {/* No Challenges */}
        {allChallenges.length === 0 ? (
          <section className="flex flex-col items-center justify-center gap-4 flex-1 animate-slide-up px-4">
            <div className="text-6xl mb-4">🏃</div>
            <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white text-center">
              No challenges yet
            </p>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 text-center">
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
            {/* All Challenges Grid */}
            <section className="w-full px-3 md:px-5">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 animate-slide-up">
                Your Challenges
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 justify-items-center">
                {allChallenges.map((challenge) => (
                  <ChallenegCard key={challenge.id} challenge={challenge} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}

