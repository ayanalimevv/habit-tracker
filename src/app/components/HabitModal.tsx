import React, { useEffect, useState } from "react";
import { useHabitModal } from "./HabitModalContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { formattedDate } from "../helpers/formattedDate";
import Image from "next/image";

const HabitModal = ({ id }: { id: string }) => {
  const [habit, setHabit] = useState<any>(null);
  const { modalHabitDate, modalHabitId } = useHabitModal();
  let { year, month, date } = modalHabitDate;
  useEffect(() => {
    const getHabitData = async () => {
      if (!modalHabitId) return;
      try {
        let modalHabitDoc = await getDoc(doc(db, "habits", modalHabitId));

        setHabit(
          (modalHabitDoc.data() as any).daysCompleted[`${year}`][month][
            date
          ] as Habit
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
            {<h3 className="font-bold text-lg">{habit.note}</h3>}
            {/* <p>Created at: {formattedDate(habit.createdAt)}</p> */}
            <Image
              src={habit.habitImage}
              alt={"Profile-Pic"}
              width={120}
              height={80}
              layout="responsive"
              objectFit="cover" // or "contain", "fill", etc.
              objectPosition="center"
            />
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
