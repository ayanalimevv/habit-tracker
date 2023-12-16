import React, { useEffect, useState } from "react";
import FileInput from "./FileInput";
import Loader from "./Loader";
import { useHabitModal } from "./HabitModalContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

const HabitModal = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const { modalHabitDate, modalHabitId } = useHabitModal();
  let { year, month, date } = modalHabitDate;
  useEffect(() => {
    const getHabitData = async () => {
      if (!modalHabitId) return;
      let modalHabitDoc = await getDoc(doc(db, "habits", modalHabitId));
      console.log(
        (modalHabitDoc.data() as any).daysCompleted[year][month][date]
      );
    };
    getHabitData();
  }, [modalHabitId, date, month, year]);

  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        {<h3 className="font-bold text-lg">{modalHabitId}!</h3>}
        <p>{`${modalHabitDate.year} ${modalHabitDate.month} ${modalHabitDate.date}`}</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default HabitModal;
