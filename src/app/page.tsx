"use client";
import HabitInput from "./components/HabitInput";
import { useEffect, useRef, useState } from "react";
import HabitBox from "./components/HabitBox";
import { onSnapshot, getDoc, doc, collection } from "firebase/firestore";
import { app, db } from "./utils/firebase";
import Loader from "./components/Loader";
import Toast from "./components/Toast";
import Navbar from "./components/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Footer from "./components/Footer";
import { motion, useInView } from "framer-motion";
import Toggle from "./components/Toggle";
import DropDown from "./components/DropDown";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [habitDocs, setHabitDocs] = useState<Habit[] | []>([]);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSucess, setToastSucess] = useState(false);
  const [uid, setUid] = useState("");
  const [isHideNotCompleted, setIsHideNotCompleted] = useState(true);
  const [fallBackArray, setFallBackArray] = useState<Habit[] | []>([]);

  const router = useRouter();

  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const date = dateObj.getDate();

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
      } else {
        router.push("/auth/login");
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    });
  }, [router]);

  const setToast = (
    message: string,
    setToastOpen: boolean,
    success: boolean
  ) => {
    console.log(message);
    setIsToastOpen(setToastOpen);
    setToastMessage(message);
    setToastSucess(success);
  };

  useEffect(() => {
    const userDoc = doc(db, "users", `user_${uid}`);

    const unsubscribe = onSnapshot(
      userDoc,
      async (querySnapshot: any): Promise<any> => {
        try {
          setLoading(true);

          const habitsIdArray = querySnapshot.data()?.habitsId || [];

          const habitPromises = habitsIdArray.map(async (habitRef: string) => {
            try {
              const habitDoc: any = await getDoc(doc(db, "habits", habitRef));

              if (habitDoc.exists()) {
                return { ...habitDoc.data(), id: habitDoc.id } as Habit;
              } else {
                setToast(`id: ${habitRef} Not Found.`, true, false);
                return null;
              }
            } catch (error: any) {
              console.error(
                `Error fetching habit with id ${habitRef}: ${error.message}`
              );
              return null;
            }
          });

          const allDocs: Habit[] = (await Promise.all(habitPromises)).filter(
            (doc) => doc !== null
          );
          setFallBackArray(allDocs);
          setHabitDocs(allDocs);
        } catch (error: any) {
          console.error(`Error fetching habits: ${error.message}`);
          setToast(`Error fetching habits: ${error.message}`, true, false);
        } finally {
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, [uid]);

  console.log(habitDocs);

  useEffect(() => {
    const habitCollection = collection(db, "habits");

    const unsubscribe = onSnapshot(
      habitCollection,
      async (querySnapshot: any): Promise<any> => {
        try {
          setLoading(true);

          // Extract data from the query snapshot and update state
          const habitsData = querySnapshot.docs.map((habitDoc: any) => ({
            id: habitDoc.id,
            ...habitDoc.data(),
          }));

          // Update your component state with the fetched data
          setFallBackArray(habitsData);
          setHabitDocs(habitsData);
        } catch (error: any) {
          console.error(`Error fetching habits: ${error.message}`);
          setToast(`Error fetching habits: ${error.message}`, true, false);
        } finally {
          setLoading(false);
        }
      }
    );

    // Unsubscribe when the component is unmounted
    return () => unsubscribe();
  }, []);

  const habitsSort = (filterBy: string) => {
    let arr = [...habitDocs].sort((a: Habit, b: Habit) =>
      b.habitName.localeCompare(a.habitName)
    );

    setHabitDocs(arr);
  };

  return (
    <>
      {loading ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <Toast
            success={toastSucess}
            isOpen={isToastOpen}
            message={toastMessage}
            setToast={setToast}
          />
          <Loader size="lg" />
        </div>
      ) : (
        <>
          <Navbar uid={uid} navTitle={`HabitGPT`} setToast={setToast} />
          <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 py-24 px-3 overflow-hidden">
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

              <HabitInput
                text={`Type New Habit`}
                setToast={setToast}
                uid={uid}
              />
              <div>
                <div className="flex items-center mb-4 lg:min-w-[400px]">
                  <DropDown habitsSort={habitsSort} />
                  <Toggle
                    isHideNotCompleted={isHideNotCompleted}
                    setIsHideNotCompleted={setIsHideNotCompleted}
                  />
                </div>

                {loading ? (
                  <Loader size="lg" />
                ) : habitDocs.length > 0 ? (
                  <div
                    className={`grid ${
                      habitDocs.length < 2 ? "md:grid-cols-1" : "md:grid-cols-2"
                    } justify-center gap-8`}
                  >
                    {habitDocs.map((habit: any, i: number) => {
                      return (
                        <HabitBox
                          key={habit.id}
                          isHidden={
                            !habit.daysCompleted[`${year}`][`${month}`][
                              `${date - 1}`
                            ].isDone && isHideNotCompleted
                          }
                          uid={uid}
                          setToast={setToast}
                          habit={habit}
                        />
                      );
                    })}
                  </div>
                ) : (
                  "No Habit to Show!"
                )}
              </div>
            </div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
