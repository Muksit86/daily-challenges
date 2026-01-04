import React from "react";
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
      <div className="flex-1 flex flex-col items-center justify-between p-5 border-black dark:border-white bg-background dark:bg-background-dark overflow-x-scroll animate-fade-in">
        {/* Head Button */}
        {allChallenges.length != 0 && (
          <header className="w-full flex justify-between mb-5 items-center animate-slide-up">
            <Link to="/newchallenge">
              <Button
                showTextOnMobile={false}
                text="New challenge"
                paddingClass="px-2 py-2"
                icon={<LuPlus className="w-5 h-5" />}
              />
            </Link>
          </header>
        )}

        {/* No Challenges */}
        {allChallenges.length === 0 ? (
          <section className="flex flex-col items-center justify-center gap-4 flex-1 animate-slide-up px-4">
            <div className="text-6xl mb-4">
              <svg
                className="fill-black dark:fill-white"
                width="50"
                viewBox="0 0 200 200"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="44.7761" height="45" />
                <rect x="155.224" width="44.7761" height="45" />
                <path d="M31.4079 200H0V169.397H30.7481V141.33H167.861V169.397H199.005V200H167.597V172.727H31.4079V200Z" />
              </svg>
            </div>
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
            <section className="w-full">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-4 md:mb-6 animate-slide-up">
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
