import React, { useState } from "react";
import { StreakBadge } from "./StreakBadge";
import Modal from "./Modal";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

export const HabitHeading = ({
  habitName,
  streakLength,
  habitId,
}: {
  habitName: string;
  streakLength: number;
  habitId: string;
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [updatedHabitName, setUpdatedHabitName] = useState(habitName);

  const updateHabitName = async (habitId: string) => {
    try {
      let docRef = doc(db, "habits", habitId);

      let habitDoc = await getDoc(docRef);

      if (!habitDoc || !habitDoc.exists()) {
        console.error(`Habit Doesn't Exist`);
      } else {
        await updateDoc(docRef, {
          habitName: updatedHabitName,
        });
      }
    } catch (error) {
      console.error(`${error}`);
    }
  };

  const handleSetHabitName = (habitName: string) => {
    setUpdatedHabitName(habitName);
  };

  return (
    <div className="flex flex-col ">
      <div className="flex">
        <h1
          className="text-2xl capitalize flex items-center mr-auto"
          onMouseOver={() => setShowEdit(true)}
          onMouseLeave={() => setShowEdit(false)}
        >
          {habitName}
          {showEdit && (
            <div
              onClick={() => {
                (
                  document.getElementById(`edit_name_${habitId}`) as any
                ).showModal();
              }}
              className="ml-2 bg-[#0d0f12] p-2 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-fill h-3 w-3"
                viewBox="0 0 16 16"
              >
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
              </svg>
            </div>
          )}
        </h1>
        <StreakBadge streakLength={streakLength} />
      </div>
      <h1>[Streak : {streakLength} Day]</h1>
      <Modal
        id={`edit_name_${habitId}`}
        btnColor="accent"
        btnText="Confirm Name Update"
        paragraphText="Enter the Name You Want to Update."
        topHeading="Are you Sure?"
        handleOnConfirm={() => updateHabitName(habitId)}
        isTextArea={true}
        handleTextArea={handleSetHabitName}
        textAreaText={habitName}
      />
    </div>
  );
};
