"use client";
import HabitInput from "./components/HabitInput";
import { useEffect, useState } from "react";
import HabitBox from "./components/HabitBox";
import {
  doc,
  onSnapshot,
  orderBy,
  query,
  collection,
} from "firebase/firestore";
import { db } from "./utils/firebase";
import Loading from "./components/Loading";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [habitDocs, setHabitDocs] = useState<Habit[]>([]);

  useEffect(() => {
    setLoading(true);
    const habitsCollection = collection(db, "habits");

    // Subscribe to real-time updates using onSnapshot
    const unsubscribe:any = onSnapshot(habitsCollection, (querySnapshot) => {
      const allDocs: any = [];

      querySnapshot.forEach((doc) => {
        allDocs.push({ ...doc.data(), id: doc.id } as Habit);
      });

      setHabitDocs(allDocs);
      setLoading(false);

      return unsubscribe();
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl uppercase text-center font-semibold">
          Habit Tracker
        </h1>

        <HabitInput text={`Type New Habit`} />

        {loading ? (
          <Loading size="lg" />
        ) : (
          <div className="grid grid-cols-2 justify-center gap-8">
            {habitDocs.map((habit: any) => {
              return <HabitBox key={habit.id} habit={habit} />;
            })}
            {/* <HabitBox />
          <HabitBox />
          <HabitBox /> */}
          </div>
        )}
      </div>
    </main>
  );
}
