import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../utils/firebase";

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
  const deleteHabit = async (habitId: string) => {
    try {
      await deleteDoc(doc(db, "habits", habitId));
      await updateDoc(doc(db, "users", `user_${uid}`), {
        habitsId: arrayRemove(habitId),
      });
      setToast("Habit Deleted Successfully!", true, true);
    } catch (error) {
      setToast(`${error}`, true, false);
    }
  };

  return (
    <button
      onClick={() => {
        (document.getElementById(`my_modal_${habitId}`) as any).showModal();
        // setToast(habitId, true, true)
      }}
      // onClick={() => setToast(habitId, true, true)}
      className={`btn w-full mt-4 hover:scale-95`}
    >
      {defaultText}
      <dialog id={`my_modal_${habitId}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you Sure?</h3>
          <p className="py-4">
            You will not be able to retrieve this habit once deleted.
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-outline mr-2">Close</button>
              <button
                onClick={() => deleteHabit(habitId)}
                className="btn btn-error btn-outline"
              >
                Confirm Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </button>
  );
};

export default DeleteButton;
