import React, { useState } from "react";
import { HabitHeading } from "./HabitHeading";
import { StreakBadge } from "./StreakBadge";
import MonthBox from "./MonthBox";
import DoneButton from "./DoneButton";
import Divider from "./Divider";

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
      {/* <h1 className="text-2xl">Previous Months</h1> */}

      <div className="collapse collapse-arrow bg-base-200">
        <input
          placeholder="adfs"
          type="radio"
          name="my-accordion-2"
          checked={true}
        />
        <div
          className="collapse-title text-xl font-medium"
          onClick={() => setIsOpen(true)}
        >
          Previous Months
        </div>
        <div className="collapse-content">
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
        </div>
      </div>
    </div>
  );
};

export default HabitBox;
