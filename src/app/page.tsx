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
import { app, db } from "./utils/firebase";
import Loader from "./components/Loader";
import Toast from "./components/Toast";
import Navbar from "./components/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [habitDocs, setHabitDocs] = useState<Habit[]>([]);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSucess, setToastSucess] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
      } else {
        router.push("/auth/login");
      }
    });
  }, [router]);
  const setToast = (
    message: string,
    setToastOpen: boolean,
    success: boolean
  ) => {
    setIsToastOpen(setToastOpen);
    setToastMessage(message);
    setToastSucess(success);
  };

  useEffect(() => {
    const habitsCollection = collection(db, "habits");

    // Subscribe to real-time updates using onSnapshot
    const unsubscribe: any = onSnapshot(habitsCollection, (querySnapshot) => {
      const allDocs: any = [];

      querySnapshot.forEach((doc) => {
        allDocs.push({ ...doc.data(), id: doc.id } as Habit);
      });

      setHabitDocs(allDocs);
      setLoading(false);

      return () => unsubscribe();
    });
  }, []);

  return (
    <>
      {loading ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <Loader size="lg" />
        </div>
      ) : (
        <>
          <Navbar
            navTitle={`HabitGPT`}
            imageUrl={`https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg`}
          />
          <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 py-24 px-3">
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
              ) : habitDocs.length > 0 ? (
                <div
                  className={`grid grid-cols-1 lg:grid-cols-${
                    habitDocs.length < 2 ? "1" : "2"
                  } justify-center gap-8`}
                >
                  {habitDocs.map((habit: any) => {
                    return (
                      <HabitBox
                        setToast={setToast}
                        key={habit.id}
                        habit={habit}
                      />
                    );
                  })}
                </div>
              ) : (
                "No Habit to Show!"
              )}
            </div>
          </main>
        </>
      )}
    </>
  );
}
