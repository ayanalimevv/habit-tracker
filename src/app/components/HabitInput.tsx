import { FormEventHandler, useState } from "react";
import { db } from "../utils/firebase";
import { collection, addDoc } from "firebase/firestore";

const HabitInput = ({
  text,
  setToast,
}: {
  text: string;
  setToast: (message: string, value: boolean, success: boolean) => void;
}) => {
  const [habitInput, setHabitInput] = useState("");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (habitInput.trim() === "") {
      setToast("Please Enter a Habit Name", true, false);
      return;
    }
    try {
      await addDoc(collection(db, "habits"), {
        habitName: habitInput,
        streak: 0,
        daysCompleted: {},
      });

      setHabitInput("");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <form className="flex my-6" onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder={text}
        className="input input-bordered input-md w-full max-w-xs"
        value={habitInput}
        onChange={(e) => setHabitInput(e.target.value)}
      />
      <button type="submit" className="btn ml-4">
        +
      </button>
    </form>
  );
};

export default HabitInput;
