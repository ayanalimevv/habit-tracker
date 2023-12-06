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
import Loader from "./components/Loader";
import Toast from "./components/Toast";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [habitDocs, setHabitDocs] = useState<Habit[]>([]);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSucess, setToastSucess] = useState(false);

  const setToast = (message: string, setToastOpen: boolean, success: boolean) => {
    setIsToastOpen(setToastOpen);
    setToastMessage(message);
    setToastSucess(success);
  };

  useEffect(() => {
    setLoading(true);
    const habitsCollection = collection(db, "habits");

    // Subscribe to real-time updates using onSnapshot
    const unsubscribe: any = onSnapshot(habitsCollection, (querySnapshot) => {
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
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 py-16 px-3">
      <Toast
        success={toastSucess}
        isOpen={isToastOpen}
        message={toastMessage}
        setToast={setToast}
      />
      <div className="flex flex-col z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl uppercase text-center font-semibold">
          Habit Tracker
        </h1>

        <HabitInput text={`Type New Habit`} setToast={setToast} />

        {loading ? (
          <Loader size="lg" />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-center gap-8">
            {habitDocs.map((habit: any) => {
              return (
                <HabitBox setToast={setToast} key={habit.id} habit={habit} />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
