import React from "react";
import { useHabitModal } from "./HabitModalContext";

const GreenMonthBox = ({
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
      className="h-4 w-4 bg-[#15fd00b8] rounded hover:cursor-pointer hover:opacity-80 hover:scale-110"
    ></div>
  );
};

export default GreenMonthBox;
