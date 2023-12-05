import React from "react";
import { MonthHeading } from "./MonthHeading";
import BrownMonthBox from "./BrownMonthBox";
import GreenMonthBox from "./GreenMonthBox";

const MonthBox = ({
  monthName,
  totalDays,
  daysDone,
  dataTip,
}: {
  monthName: string;
  totalDays: number;
  daysDone: number;
  dataTip: string;
}) => {
  return (
    <div className="mt-2 bg-[#1D1D1D] w-full p-2 rounded-lg hover:bg-[#0f0f0f] hover:cursor-pointer border border-black hover:border-white transition ease-out">
      <MonthHeading daysDone={27} totalDays={30} monthName={monthName} />

      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 31 }, (_, index) => index + 1).map(
          (item, ind) => {
            return (
              <div key={ind} className="tooltip" data-tip={dataTip}>
                {ind % 3 === 0 ? <BrownMonthBox /> : <GreenMonthBox />}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default MonthBox;
