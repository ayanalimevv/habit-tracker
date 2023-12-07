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
      <div className="flex items-center">
        <h1 className="text-2xl capitalize flex items-center mr-auto">
          {habitName}
        </h1>
        <StreakBadge streakLength={streakLength} />
      </div>
      <h1>[Streak : {streakLength} Day]</h1>
    </div>
  );
};
