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
  const [habitDocs, setHabitDocs] = useState<Habit[] | []>([]);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSucess, setToastSucess] = useState(false);
  const [uid, setUid] = useState("");

  const router = useRouter();

  useEffect(() => {
    // const getHabitsData = async (uid: string) => {
    //   try {
    //     let res = await getDoc(doc(db, "users", `user_${uid}`));

    //     const habitPromises = (res.data() as any).habitsId.map(
    //       async (habitId: string) => {
    //         const habitDocRef = doc(collection(db, "habits"), habitId);
    //         const habitDoc = await getDoc(habitDocRef);

    //         if (habitDoc.exists()) {
    //           return { id: habitId, ...habitDoc.data() };
    //         } else {
    //           // Handle the case where the document doesn't exist
    //           return { id: habitId, data: null };
    //         }
    //       }
    //     );
    //     const userDataArray = await Promise.all(habitPromises);
    //     console.log(userDataArray);

    //     setHabitDocs(userDataArray);
    //   } catch (error: any) {
    //     console.error("Error fetching user data:", error.message);
    //     setToast(`${error.message}`, true, false);
    //     setHabitDocs([]);
    //   }
    // };
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
        // getHabitsData(uid);
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
          const habitPromises = querySnapshot
            .data()
            ?.habitsId.map(async (habitRef: string) => {
              const habitDoc: any = await getDoc(doc(db, "habits", habitRef));

              if (habitDoc.exists()) {
                return { ...habitDoc.data(), id: habitDoc.id } as Habit;
              } else {
                setToast(`id : ${habitRef} Not Found.`, true, false);
                return null;
              }
            });

          const allDocs: Habit[] = await Promise.all(habitPromises);

          // Filter out null values (docs where habit was not found)
          const validDocs = allDocs.filter((doc) => doc !== null);

          setHabitDocs(validDocs);
          setLoading(false);
        } catch (error: any) {
          setToast(`${error.message}`, true, false);
        }
      }
    );

    return () => unsubscribe();
  }, [uid]);

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
                  className={`grid ${
                    habitDocs.length < 2 ? "md:grid-cols-1" : "md:grid-cols-2"
                  } justify-center gap-8`}
                >
                  {habitDocs.map((habit: any) => {
                    return (
                      <HabitBox
                        uid={uid}
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
