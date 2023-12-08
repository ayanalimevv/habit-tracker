"use client";
import HabitInput from "./components/HabitInput";
import { useEffect, useState } from "react";
import HabitBox from "./components/HabitBox";
import { onSnapshot, collection, getDoc, doc } from "firebase/firestore";
import { app, db } from "./utils/firebase";
import Loader from "./components/Loader";
import Toast from "./components/Toast";
import Navbar from "./components/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Footer from "./components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [habitDocs, setHabitDocs] = useState<Habit[]>([]);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSucess, setToastSucess] = useState(false);
  const [uid, setUid] = useState("");

  const router = useRouter();
  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
        getHabitsData(uid);
      } else {
        router.push("/auth/login");
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    });
  }, []);

  const getHabitsData = async (uid: string) => {
    try {
      let res = await getDoc(doc(db, "users", `user_${uid}`));

      const habitPromises = (res.data() as any).habitsId.map(
        async (habitId: string) => {
          const habitDocRef = doc(collection(db, "habits"), habitId);
          const habitDoc = await getDoc(habitDocRef);

          if (habitDoc.exists()) {
            return { id: habitId, ...habitDoc.data() };
          } else {
            // Handle the case where the document doesn't exist
            return { id: habitId, data: null };
          }
        }
      );
      const userDataArray = await Promise.all(habitPromises);
      console.log(userDataArray.length);

      setHabitDocs(userDataArray);
    } catch (error: any) {
      console.error("Error fetching user data:", error.message);
      setToast(`${error.message}`, true, false);
      setHabitDocs([]);
    }
  };

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
          <Navbar uid={uid} navTitle={`HabitGPT`} setToast={setToast} />
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

              <HabitInput
                text={`Type New Habit`}
                setToast={setToast}
                uid={uid}
              />

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
          <Footer />
        </>
      )}
    </>
  );
}
