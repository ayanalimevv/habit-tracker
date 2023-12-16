import React from "react";
import HabitBox from "./HabitBox";
import { getYearMonthDate } from "../helpers/formattedDate";
import Loader from "./Loader";

const HabitSection = ({
  habitDocs,
  uid,
  isHideNotCompleted,
  loading,
}: {
  habitDocs: Habit[] | [];
  uid: string;
  isHideNotCompleted: boolean;
  loading: boolean;
}) => {
  const { year, month, date } = getYearMonthDate(new Date());
  return (
    <>
      {loading ? (
        <Loader />
      ) : habitDocs.length > 0 ? (
        <div
          className={`grid ${
            habitDocs.length < 2 ? "md:grid-cols-1" : "md:grid-cols-2"
          } justify-center gap-8`}
        >
          {habitDocs.map((habit: any, i: number) => {
            return (
              <HabitBox
                key={habit.id}
                isHidden={
                  !habit.daysCompleted[`${year}`][`${month}`][`${date - 1}`]
                    .isDone && isHideNotCompleted
                }
                uid={uid}
                habit={habit}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-center"> No Habit to Show!</p>
      )}
    </>
  );
};

export default HabitSection;
