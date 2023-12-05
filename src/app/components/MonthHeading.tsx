import React from "react";

export const MonthHeading = ({
  monthName,
  daysDone,
  totalDays,
}: {
  monthName: string;
  daysDone: number;
  totalDays: number;
}) => {
  return (
    <div className="flex items-center mb-1">
      <h1 className="text-2xl text-white mb-2 mr-auto">{monthName}</h1>
      <p>
        [{daysDone}/{totalDays}]
      </p>
    </div>
  );
};
