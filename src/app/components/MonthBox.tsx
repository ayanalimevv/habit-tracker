import React, { useEffect, useState } from "react";
import { MonthHeading } from "./MonthHeading";
import BrownMonthBox from "./BrownMonthBox";
import GreenMonthBox from "./GreenMonthBox";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import Loader from "./Loader";

const MonthBox = ({ habitId, month }: { habitId: string; month: number }) => {
  const [habitsData, setHabitsData] = useState<{ [key: number]: boolean }>({});
  const [loading, setLoading] = useState(true);
  const [completedDays, setCompletedDays] = useState(0);
  const [totalDays, setTotalDays] = useState(0);

  const getMonthName = (monthIndex: number): string => {
    const months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    if (monthIndex >= 0 && monthIndex <= 11) {
      return months[monthIndex];
    } else {
      throw new Error(
        "Invalid month index. Month index should be between 0 and 11."
      );
    }
  };

  let year = new Date().getFullYear();

  useEffect(() => {
    const getHabitsData = async (habitId: string) => {
      const habit: any = (await getDoc(doc(db, "habits", habitId))).data();

      // Check if habitsData is not null or undefined before accessing properties
      const unsub = onSnapshot(doc(db, "habits", habitId), (doc: any): any => {
        let currMonthObj: any = doc.data().daysCompleted[year][month];

        let totalDays = 0;
        let completedDays = 0;
        Object.entries(currMonthObj).forEach((entry: any) => {
          if (entry[1]) completedDays++;
          totalDays++;
        });
        setCompletedDays(completedDays);
        setTotalDays(totalDays)
      });

      // return unsub();
      if (
        habit &&
        habit.daysCompleted &&
        habit.daysCompleted[year] &&
        habit.daysCompleted[year][month]
      ) {
        setHabitsData(habit.daysCompleted[year][month]);
      } else {
        setHabitsData({});
      }
      setLoading(false);
    };
    getHabitsData(habitId);
  }, []);

  return (
    <div className="mt-2 bg-[#1D1D1D] w-full p-2 rounded-lg hover:bg-[#0f0f0f] hover:cursor-pointer border border-black hover:border-white transition ease-out">
      <MonthHeading
        daysDone={completedDays}
        totalDays={totalDays}
        monthName={getMonthName(month)}
      />

      {loading ? (
        <Loader size="lg" />
      ) : (
        <div className="flex flex-wrap gap-2">
          {!(Object.keys(habitsData).length === 0) &&
            Object.keys(habitsData).map((key: string) => {
              return (
                <div
                  key={key}
                  className="tooltip"
                  data-tip={`${parseInt(key) + 1} ${getMonthName(
                    month
                  )} ${year}`}
                >
                  {(habitsData[key as any] as boolean) ? (
                    <GreenMonthBox />
                  ) : (
                    <BrownMonthBox />
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default MonthBox;
