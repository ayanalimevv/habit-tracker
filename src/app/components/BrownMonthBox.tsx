import React from "react";
import { useHabitModal } from "./HabitModalContext";

const BrownMonthBox = ({
  habitId,
  year,
  month,
  date,
}: {
  habitId: string;
  year: number;
  month: number;
  date: number;
}) => {
  const { openHabitModal } = useHabitModal();
  return (
    <div
      onClick={() => openHabitModal(habitId, { year, month, date })}
      className="h-4 w-4 bg-[#606060] rounded hover:cursor-pointer hover:scale-110"
    ></div>
  );
};

export default BrownMonthBox;
