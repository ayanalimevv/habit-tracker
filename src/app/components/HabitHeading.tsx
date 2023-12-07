import React from "react";

export const HabitHeading = ({
  habitName,
  streakLength,
}: {
  habitName: string;
  streakLength: number;
}) => {
  return (
    <div className="flex md:items-center flex-col md:flex-row">
      <h1 className="text-2xl capitalize flex items-center mr-auto">
        {habitName}
      </h1>
      <h1>[Streak : {streakLength} Day]</h1>
    </div>
  );
};
