import React, { useEffect, useState } from "react";
import { HabitHeading } from "./HabitHeading";
import { StreakBadge } from "./StreakBadge";
import MonthBox from "./MonthBox";
import DoneButton from "./DoneButton";
import Divider from "./Divider";
import Image from "next/image";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const HabitBox = ({
  habit,
  setToast,
}: {
  habit: Habit;
  setToast: (message: string, value: boolean, success: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [streak, setStreak] = useState(0);

  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const day = new Date().getDate() - 1;

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "habits", habit.id), (doc: any): any => {
      let currMonthObj: any = doc.data().daysCompleted[year][month];
      let streak = 0;
      for (let i = day - 1; i >= 0; i--) {
        if (!currMonthObj[i]) break;
        streak++;
      }
      currMonthObj[day] ? streak++ : null;
      setStreak(streak);
    });

    return () => unsub();
  }, [day, habit.id, month, year]);

  return (
    <div className="transition ease-linear relative p-4 max-w-[400px] rounded-lg border-[#414141] border">
      <HabitHeading habitName={habit.habitName} streakLength={streak} />

      <StreakBadge streakLength={streak} />
      <MonthBox month={new Date().getMonth()} habitId={habit.id} />
      <DoneButton
        completedText="✅ Marked as Completed!"
        defaultText="Mark Today as Completed"
        habitId={habit.id}
        setToast={setToast}
      />
      <Divider />

      <div
        className="flex bg-[#191e24] rounded-lg p-3 items-center hover:cursor-pointer"
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
          <MonthBox month={new Date().getMonth() - 1} habitId={habit.id} />
          <MonthBox month={new Date().getMonth() - 2} habitId={habit.id} />
        </>
      )}
    </div>
  );
};

export default HabitBox;
