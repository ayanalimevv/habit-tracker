import { FormEventHandler, useState } from "react";
import { db } from "../utils/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { useToast } from "./ToastContext";

const HabitInput = ({ text, uid }: { text: string; uid: string }) => {
  const { setToast } = useToast();
  const [habitInput, setHabitInput] = useState("");

  function getLastDateOfMonth(year: number, month: number) {
    const firstDayOfNextMonth: any = new Date(year, month + 1, 1);
    const lastDayOfMonth = new Date(firstDayOfNextMonth - 1);
    return lastDayOfMonth.getDate();
  }

  // Function to create the daysCompleted object
  function createDaysCompletedObject() {
    const daysCompletedObject: any = {};

    for (
      let year = new Date().getFullYear();
      year <= new Date().getFullYear() + 1;
      year++
    ) {
      const yearObject: any = {};

      for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
        const lastDayOfMonth = getLastDateOfMonth(year, monthIndex);

        const monthObject: any = {};

        for (let dayIndex = 0; dayIndex < lastDayOfMonth; dayIndex++) {
          monthObject[dayIndex] = {
            isDone: false,
            note: "",
          };
        }

        yearObject[monthIndex] = monthObject;
      }

      daysCompletedObject[year] = yearObject;
    }
    return daysCompletedObject;
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (habitInput.trim() === "") {
      setToast("Please Enter a Habit Name", true, false);
      return;
    }
    try {
      let habitDoc = await addDoc(collection(db, "habits"), {
        habitName: habitInput,
        daysCompleted: createDaysCompletedObject(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await updateDoc(doc(db, "users", `user_${uid}`), {
        habitsId: arrayUnion(habitDoc.id),
      });
      setHabitInput("");
    } catch (error) {
      setToast(`${error}`, true, false);
    }
  };
  return (
    <form className="flex my-6" onSubmit={handleFormSubmit}>
      <div>
        <input
          type="text"
          placeholder={text}
          className="input input-bordered input-md w-full max-w-xs"
          value={habitInput}
          onChange={(e) => setHabitInput(e.target.value)}
        />
      </div>
      <button type="submit" className="btn ml-4">
        +
      </button>
    </form>
  );
};

export default HabitInput;
