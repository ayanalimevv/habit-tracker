import {
  deleteDoc,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { update } from "firebase/database";

const DeleteButton = ({
  defaultText,
  habitId,
  setToast,
}: {
  defaultText: string;
  habitId: string;
  setToast: (message: string, value: boolean, success: boolean) => void;
}) => {
  const deleteHabit = async (habitId: string) => {
    try {
      await deleteDoc(doc(db, "habits", habitId));
      setToast("Habit Deleted Successfully!", true, true);
    } catch (error) {
      setToast(`${error}`, true, false);
    }
  };

  return (
    <button
      onClick={() => (document.getElementById("my_modal_1") as any).showModal()}
      //   onClick={() => deleteHabit(habitId)}
      className={`btn w-full mt-4 hover:scale-95`}
    >
      {defaultText}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you Sure?</h3>
          <p className="py-4">
            You will not be able to retrieve this habit once deleted.
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-outline mr-2">Close</button>
              <button onClick={() => deleteHabit(habitId)} className="btn btn-error btn-outline">Confirm Delete</button>
            </form>
          </div>
        </div>
      </dialog>
    </button>
  );
};

export default DeleteButton;
