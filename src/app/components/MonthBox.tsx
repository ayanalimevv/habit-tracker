import React, { useEffect, useState } from "react";
import { MonthHeading } from "./MonthHeading";
import BrownMonthBox from "./BrownMonthBox";
import GreenMonthBox from "./GreenMonthBox";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import Loader from "./Loader";

const MonthBox = ({
  habitId,
  month,
  setToast,
}: {
  habitId: string;
  month: number;
  setToast: (message: string, value: boolean, success: boolean) => void;
}) => {
  const [habitsData, setHabitsData] = useState<{
    [key: number]: { isDone: boolean; note: string };
  }>({});
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
      try {
        const habitDoc = doc(db, "habits", habitId);

        // Fetch habit data
        const habitSnapshot = await getDoc(habitDoc);
        const habitData = habitSnapshot.data();

        if (!habitData) {
          setToast("Habit not found", true, false);
          return;
        }

        // Check if necessary data is present
        if (
          !(
            habitData.daysCompleted &&
            habitData.daysCompleted[year] &&
            habitData.daysCompleted[year][month]
          )
        ) {
          setToast("Data not found for the habit", true, false);
          return;
        }

        // Fetch real-time updates
        const unsub = onSnapshot(habitDoc, (doc: any) => {
          const habitData = doc.data();

          // Check if necessary data is present
          if (
            !(
              habitData &&
              habitData.daysCompleted &&
              habitData.daysCompleted[year] &&
              habitData.daysCompleted[year][month]
            )
          ) {
            setToast("Something Went Wrong", true, false);
            return;
          }

          const currMonthObj = habitData.daysCompleted[year][month];

          // Calculate total and completed days
          let totalDays = 0;
          let completedDays = 0;

          Object.keys(currMonthObj).forEach((key: any) => {
            totalDays++;
            if (currMonthObj[key]?.isDone) completedDays++;
          });

          // Update state
          setCompletedDays(completedDays);
          setTotalDays(totalDays);
        });

        // Set habits data
        if (
          habitData.daysCompleted &&
          habitData.daysCompleted[year] &&
          habitData.daysCompleted[year][month]
        ) {
          setHabitsData(habitData.daysCompleted[year][month]);
        } else {
          setHabitsData({});
        }

        setLoading(false);
        return () => unsub();
      } catch (error) {
        console.error("Error fetching habit data:", error);
        setToast("Error fetching habit data", true, false);
      }
    };

    getHabitsData(habitId);
  }, [habitId, year, month, setToast]);

  return (
    <div className="mt-2 bg-[#191e24] bg-opacity-50 border border-white border-opacity-20 w-full p-2 rounded-lg  hover:cursor-pointer transition ease-out">
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
                  data-tip={
                    habitsData[key as any].note
                      ? `[${habitsData[key as any].note}] ${
                          parseInt(key) + 1
                        } ${getMonthName(month)} ${year}`
                      : `${parseInt(key) + 1} ${getMonthName(month)} ${year}`
                  }
                >
                  {habitsData[key as any].isDone ? (
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
