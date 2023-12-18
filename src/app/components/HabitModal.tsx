import React, { useEffect, useState } from "react";
import { useHabitModal } from "./HabitModalContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import Image from "next/image";
import { formattedDate, formattedDateWithTime } from "../helpers/formattedDate";
import { DayDetails, Habit } from "../../../types";

const HabitModal = ({ id }: { id: string }) => {
  const [habit, setHabit] = useState<any>(null);
  const [parentHabit, setParentHabit] = useState<any>(null);
  const { modalHabitDate, modalHabitId } = useHabitModal();
  let { year, month, date } = modalHabitDate;
  useEffect(() => {
    const getHabitData = async () => {
      if (!modalHabitId) return;
      try {
        let modalHabitDoc = await getDoc(doc(db, "habits", modalHabitId));

        setParentHabit(modalHabitDoc.data() as Habit);

        setHabit(
          (modalHabitDoc.data() as any).daysCompleted[`${year}`][month][
            date
          ] as DayDetails
        );
      } catch (error) {
        console.log(error);
      }
    };
    getHabitData();
  }, [modalHabitId, date, month, year]);

  return (
    <>
      {habit && (
        <dialog id={id} className="modal">
          <div className="modal-box">
            {/* <div className="badge badge-outline">{parentHabit.habitName}</div> */}
            {/* <div className="badge badge-accent">{parentHabit.habitName}</div> */}
            <div className="badge badge-ghost p-3">{parentHabit.habitName}</div>
            {/* <div className="badge badge-neutral">{parentHabit.habitName}</div> */}
            {habit.note ? <h3 className="font-bold text-lg my-2">{habit.note}</h3> : <h3 className="font-bold text-sm my-4">No Note was Added.</h3> }
            {habit.doneAt && (
              <p className="text-sm mb-4 text-slate-400">
                Done at: {formattedDateWithTime(habit?.doneAt)}
              </p>
            )}
            {habit.habitImage && (
              <Image
                src={habit.habitImage}
                alt={"Profile-Pic"}
                width={120}
                height={80}
                layout="responsive"
                objectFit="cover" // or "contain", "fill", etc.
                objectPosition="center"
                className="rounded-lg"
              />
            )}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      )}
    </>
  );
};

export default HabitModal;
