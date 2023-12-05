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

export default function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(db);
    const habitsCollection = collection(db, "habits");

    // Subscribe to real-time updates using onSnapshot
    const unsubscribe = onSnapshot(habitsCollection, (querySnapshot) => {
      const allDocs:any = [];

      // Loop through the documents in the collection
      querySnapshot.forEach((doc) => {
        // Extract data and add document ID
        allDocs.push({ ...doc.data(), id: doc.id });
      });

      // Do something with the array of documents (allDocs)
      console.log(allDocs);
    });
    //     console.log(newItems);

    //   });
    //   return unsubscribe();
  }, []);

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
