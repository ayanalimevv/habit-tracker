import React from "react";
import { StreakBadge } from "./StreakBadge";

export const HabitHeading = ({
  habitName,
  streakLength,
}: {
  habitName: string;
  streakLength: number;
}) => {
  return (
    <div className="flex flex-col ">
      <div className="flex">
        <h1 className="text-2xl capitalize flex items-center mr-auto">
          {habitName}
        </h1>
        <StreakBadge streakLength={6} />
      </div>
      <h1>[Streak : {streakLength} Day]</h1>
    </div>
  );
};
