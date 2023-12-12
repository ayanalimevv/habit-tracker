import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { update } from "firebase/database";
import Modal from "./Modal";

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
  const [note, setNote] = useState("");

  const handleSetNote = (text: string) => {
    setNote(text);
  };

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
      if (
        habit &&
        habit.daysCompleted &&
        habit.daysCompleted[year] &&
        habit.daysCompleted[year][month] &&
        habit.daysCompleted[year][month][day]
      ) {
        setStatus("completed");
      } else {
        // Either habit or some nested property is undefined
        setStatus("default");
      }
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
        [`daysCompleted.${year}.${month}.${day}.isDone`]: true,
        [`daysCompleted.${year}.${month}.${day}.note`]: note,
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
      onClick={() =>
        (document.getElementById(`done_modal_${habitId}`) as any).showModal()
      }
      className={`btn w-full mt-4 hover:scale-95`}
      disabled={status === "loading" || status === "completed"}
    >
      {status === "loading" ? "" : text}
      {status === "loading" ? (
        <span className="loading loading-infinity loading-sm"></span>
      ) : null}
      <Modal
        id={`done_modal_${habitId}`}
        btnColor="accent"
        isTextArea={true}
        btnText="Mark as Completed"
        paragraphText="Add a Note with Habit [Optional]"
        topHeading="Are you Sure?"
        handleOnConfirm={() => updateCompletion(habitId)}
        handleSetNote={handleSetNote}
      />
    </button>
  );
};

export default DoneButton;
