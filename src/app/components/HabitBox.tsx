import React, { useEffect, useState } from "react";
import { HabitHeading } from "./HabitHeading";
import { StreakBadge } from "./StreakBadge";
import MonthBox from "./MonthBox";
import DoneButton from "./DoneButton";
import Divider from "./Divider";
import Image from "next/image";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import DeleteButton from "./DeleteButton";
import Modal from "./Modal";

const HabitBox = ({
  habit,
  setToast,
  uid,
}: {
  habit: Habit;
  setToast: (message: string, value: boolean, success: boolean) => void;
  uid: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [streak, setStreak] = useState(0);

  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const day = new Date().getDate() - 1;

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "habits", habit.id), (doc: any): any => {
      const habitData = doc.data();

      if (
        habitData &&
        habitData.daysCompleted &&
        habitData.daysCompleted[year] &&
        habitData.daysCompleted[year][month]
      ) {
        const currMonthObj = habitData.daysCompleted[year][month];
        let streak = 0;

        for (let i = day - 1; i >= 0; i--) {
          if (currMonthObj[i] && !currMonthObj[i].isDone) break;
          else streak++;
        }

        currMonthObj && currMonthObj[day].isDone ? streak++ : null;
        setStreak(streak);
      } else {
        setToast("Unable Fetching Streak.", true, false);
      }
    });

    return () => unsub();
  }, [day, habit.id, month, year, setToast]);

  return (
    <div className="hover:cursor-pointer ease-linear relative p-4 max-w-[400px] rounded-lg border-[#414141] border">
      <HabitHeading habitName={habit.habitName} streakLength={streak} />
      <MonthBox
        month={new Date().getMonth()}
        habitId={habit.id}
        setToast={setToast}
      />
      <DoneButton
        completedText="↩️ Undo Completion!"
        defaultText="✅ Mark Today as Completed"
        habitId={habit.id}
        setToast={setToast}
      />
      <Divider />
      <div
        className="flex bg-[#191e24] rounded-lg p-3 items-center hover:cursor-pointer bg-opacity-50"
        onClick={() => setIsOpen((p) => !p)}
      >
        <h1 className="text-2xl mr-auto">Previous Months</h1>
        <svg
          className={`w-4 h-4 text-white ${
            isOpen && "rotate-180"
          } transition ease-linear`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 8"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
          />
        </svg>
      </div>
      {isOpen && (
        <>
          {Array.from({ length: 2 }, (_, index) => {
            return (
              <MonthBox
                //index start with 0 but we need from last month so -1
                month={new Date().getMonth() - index - 1}
                habitId={habit.id}
                key={habit.id}
                setToast={setToast}
              />
            );
          })}
        </>
      )}
      <DeleteButton
        uid={uid}
        defaultText="🗑️ Delete this Habit"
        habitId={habit.id}
        setToast={setToast}
      />
    </div>
  );
};

export default HabitBox;
