import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { update } from "firebase/database";

const DoneButton = ({
  defaultText,
  completedText,
  habitId,
  setToast,
}: {
  defaultText: string;
  completedText: string;
  habitId: string;
  setToast: (message: string, value: boolean, success: boolean) => void;
}) => {
  const [status, setStatus] = useState("default");
  const [text, setText] = useState(defaultText);

  useEffect(() => {
    if (status === "loading") setText("");
    if (status === "completed") setText(completedText);
    else setText(defaultText);
  }, [status, defaultText, completedText]);

  useEffect(() => {
    const getHabitStatus = async (habitId: string) => {
      let year = new Date().getFullYear();
      let month = new Date().getMonth();
      let day = new Date().getDate() - 1;

      const habit: any = (await getDoc(doc(db, "habits", habitId))).data();

      habit.daysCompleted[year][month][day]
        ? setStatus("completed")
        : setStatus("default");
    };
    getHabitStatus(habitId);
  }),
    [];

  const updateCompletion = async (habitId: string) => {
    try {
      setStatus("loading");
      const habitDoc: any = doc(db, "habits", habitId);

      let year = new Date().getFullYear();
      let month = new Date().getMonth();
      let day = new Date().getDate() - 1;

      await updateDoc(habitDoc, {
        [`daysCompleted.${year}.${month}.${day}`]: true,
      });

      setStatus("completed");
      setToast("Marked Completed Successfully!", true, true);
    } catch (error) {
      setToast(`${error}`, true, false);
      setStatus("default");
    }
  };
  return (
    <button
      onClick={() => updateCompletion(habitId)}
      className={`btn w-full mt-4 hover:scale-95`}
      disabled={status === "loading" || status === "completed"}
    >
      {status === "loading" ? "" : text}
      {status === "loading" ? (
        <span className="loading loading-infinity loading-sm"></span>
      ) : null}
    </button>
  );
};

export default DoneButton;
