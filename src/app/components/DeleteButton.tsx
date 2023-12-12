import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../utils/firebase";
import Modal from "./Modal";

const DeleteButton = ({
  defaultText,
  habitId,
  setToast,
  uid,
}: {
  defaultText: string;
  habitId: string;
  setToast: (message: string, value: boolean, success: boolean) => void;
  uid: string;
}) => {
  const deleteHabit = async (habitId: string, attempt = 1) => {
    try {
      await deleteDoc(doc(db, "habits", habitId));
      await updateDoc(doc(db, "users", `user_${uid}`), {
        habitsId: arrayRemove(habitId),
      });
      setToast("Habit Deleted Successfully!", true, true);
    } catch (error) {
      if (attempt < 3) {
        setTimeout(() => deleteHabit(habitId, attempt + 1), 1000);
      } else {
        setToast(`${error}`, true, false);
      }
    }
  };

  return (
    <button
      onClick={() => {
        (document.getElementById(`delete_modal_${habitId}`) as any).showModal();
      }}
      className={`btn w-full mt-4 hover:scale-95`}
    >
      {defaultText}

      <Modal
        id={`delete_modal_${habitId}`}
        btnColor="error"
        btnText="Confirm Delete"
        paragraphText="You will not be able to retrieve this habit once deleted."
        topHeading="Are you Sure?"
        handleOnConfirm={() => deleteHabit(habitId)}
        isTextArea={false}
      />
    </button>
  );
};

export default DeleteButton;
