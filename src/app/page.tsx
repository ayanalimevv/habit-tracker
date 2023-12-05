"use client";
import Image from "next/image";
import HabitInput from "./components/HabitInput";
import { HabitHeading } from "./components/HabitHeading";
import { StreakBadge } from "./components/StreakBadge";
import { MonthHeading } from "./components/MonthHeading";
import BrownMonthBox from "./components/BrownMonthBox";
import GreenMonthBox from "./components/GreenMonthBox";
import DoneButton from "./components/DoneButton";
import MonthBox from "./components/MonthBox";
import { useState } from "react";
import Divider from "./components/Divider";
import HabitBox from "./components/HabitBox";

export default function Home() {
  const [loading, setLoading] = useState(false);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl uppercase text-center font-semibold">
          Habit Tracker
        </h1>

        <HabitInput text={`Type New Habit`} />

        <div className="grid grid-cols-2 justify-center gap-8">
          <HabitBox />
          <HabitBox />
          <HabitBox />
        </div>
      </div>
    </main>
  );
}
