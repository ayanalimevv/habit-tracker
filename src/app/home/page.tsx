"use client";
import HabitInput from "../components/HabitInput";
import { useEffect, useState } from "react";
import HabitBox from "../components/HabitBox";
import {
  onSnapshot,
  getDoc,
  doc,
  collection,
  DocumentSnapshot,
} from "firebase/firestore";
import { app, db } from "../utils/firebase";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import Navbar from "../components/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";
import Toggle from "../components/Toggle";
import DropDown from "../components/DropDown";
import { getYearMonthDate } from "../helpers/formattedDate";
import { Unsubscribe } from "firebase/database";
import Divider from "../components/Divider";
import { handleHabitSort } from "../helpers/habitsSort";
import { ToastProvider, useToast } from "../components/ToastContext";
import LoadingScreen from "../components/LoadingScreen";
import FilterSection from "../components/FilterSection";
import HabitSection from "../components/HabitSection";
import HabitModal from "../components/HabitModal";
import { HabitModalProvider } from "../components/HabitModalContext";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [habitDocs, setHabitDocs] = useState<Habit[] | []>([]);
  const [uid, setUid] = useState("");
  const [isHideNotCompleted, setIsHideNotCompleted] = useState(false);
  const [profileUrl, setProfileUrl] = useState<string | null>(null);

  const router = useRouter();

  const { year, month, date } = getYearMonthDate(new Date());

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
        setPageLoading(false);
      } else {
        router.push("/auth/login");
        setTimeout(() => {
          setPageLoading(false);
        }, 3000);
      }
    });
  }, [router]);

  useEffect(() => {
    const userDoc = doc(db, "users", `user_${uid}`);

    const unsubscribe = onSnapshot(
      userDoc,
      async (querySnapshot: any): Promise<any> => {
        try {
          setLoading(true);
          const profileUrl = querySnapshot.data()?.profileUrl || null;
          setProfileUrl(profileUrl);
          const habitsIdArray = querySnapshot.data()?.habitsId || [];

          const habitPromises = habitsIdArray.map(async (habitRef: string) => {
            try {
              const habitDoc: any = await getDoc(doc(db, "habits", habitRef));

              if (habitDoc.exists()) {
                return { ...habitDoc.data(), id: habitDoc.id } as Habit;
              } else {
                console.error(`id: ${habitRef} Not Found.`, true, false);
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
          setHabitDocs(allDocs);
        } catch (error: any) {
          console.error(`Error fetching habits: ${error.message}`);
          // setToast(`Error fetching habits`, true, false);
        } finally {
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, [uid]);

  useEffect(() => {
    const userDocRef = doc(db, "users", `user_${uid}`);
    let unsubscribeUser: Unsubscribe | undefined;
    const unsubscribeHabits: { [habitId: string]: Unsubscribe } = {};

    const fetchDataForHabit = async (habitId: string) => {
      const habitDocRef = doc(db, "habits", habitId);
      unsubscribeHabits[habitId] = onSnapshot(habitDocRef, (snapshot) => {
        try {
          if (snapshot.exists()) {
            const habitData = { id: snapshot.id, ...snapshot.data() } as Habit;
          } else {
            // setToast(`Habit no longer exists:`, true, true);
            console.error(`Habit ${habitId} no longer exists.`);
          }
        } catch (error: any) {
          console.error(`Error fetching habit ${habitId}: ${error.message}`);
          // setToast(`Error fetching habit: ${error.message}`, true, false);
        }
      });
    };

    const fetchDataForUser = async () => {
      try {
        setLoading(true);

        const userSnapshot: DocumentSnapshot<any> = await getDoc(userDocRef);
        const habitsIdArray: string[] = userSnapshot.data()?.habitsId || [];

        await Promise.all(habitsIdArray.map(fetchDataForHabit));
      } catch (error: any) {
        console.error(`Error fetching user data: ${error.message}`);
        // setToast(`Error fetching user data: ${error.message}`, true, false);
      } finally {
        setLoading(false);
      }
    };

    unsubscribeUser = onSnapshot(userDocRef, fetchDataForUser);

    return () => {
      if (unsubscribeUser) {
        unsubscribeUser();
      }

      Object.values(unsubscribeHabits).forEach((unsubscribe) => {
        if (unsubscribe) {
          unsubscribe();
        }
      });
    };
  }, [uid]);

  const habitsSort = (filterBy: string) => {
    setLoading(true);
    let arr = handleHabitSort(habitDocs, filterBy);
    setHabitDocs(arr);
    setLoading(false);
  };

  return (
    <ToastProvider>
      <HabitModalProvider>
        {pageLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <HabitModal id="show_habit" />
            <Navbar uid={uid} navTitle={`HabitGPT`} profileUrl={profileUrl} />
            <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 py-24 px-3 overflow-hidden">
              <Toast />
              <div className="flex flex-col z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <h1 className="text-4xl uppercase text-center font-semibold">
                  Habit Tracker
                </h1>
                <HabitInput text={`Type New Habit`} uid={uid} />
                <div className="lg:min-w-[832px] min-w-[290px]">
                  <Divider />
                  <FilterSection
                    habitsSort={habitsSort}
                    isHideNotCompleted={isHideNotCompleted}
                    setIsHideNotCompleted={setIsHideNotCompleted}
                  />
                  <HabitSection
                    habitDocs={habitDocs}
                    uid={uid}
                    isHideNotCompleted={isHideNotCompleted}
                    loading={loading}
                  />
                </div>
              </div>
            </main>
            <Footer />
          </>
        )}
      </HabitModalProvider>
    </ToastProvider>
  );
}
