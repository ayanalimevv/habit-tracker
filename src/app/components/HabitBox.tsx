import React, { useState } from "react";
import { HabitHeading } from "./HabitHeading";
import { StreakBadge } from "./StreakBadge";
import MonthBox from "./MonthBox";
import DoneButton from "./DoneButton";
import Divider from "./Divider";
import Image from "next/image";

const HabitBox = () => {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDivVisibility = () => {
    setIsDivVisible(!isDivVisible);
  };
  return (
    <div className="relative p-4 max-w-[400px] rounded-lg border-[#414141] border">
      <HabitHeading habitName={`Habit`} streakLength={20} />

      <StreakBadge dataTip="Chad [Streak > 7 Days]" levelName={`chad`} />
      <MonthBox
        daysDone={27}
        totalDays={30}
        monthName={`Month`}
        dataTip={`22 July 2002`}
      />
      <DoneButton text={"Mark Done for Today"} />
      <Divider />

      <div
        className="flex bg-[#191e24] rounded-lg p-3 items-center hover:cursor-pointer"
        onClick={() => setIsOpen((p) => !p)}
      >
        <h1 className="text-2xl mr-auto">Previous Months</h1>
        {/* <svg
          className={`w-4 h-4 text-white ${isOpen && "rotate-180"} transition ease-linear`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 8"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
          />
        </svg> */}
      </div>

      {isOpen && (
        <>
          <MonthBox
            daysDone={27}
            totalDays={30}
            monthName={`Month`}
            dataTip={`22 July 2002`}
          />
          <MonthBox
            daysDone={27}
            totalDays={30}
            monthName={`Month`}
            dataTip={`22 July 2002`}
          />
        </>
      )}
    </div>
  );
};

export default HabitBox;
