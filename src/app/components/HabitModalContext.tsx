// ToastContext.js
import React, { createContext, useContext, useState } from "react";
import { openModalById } from "../helpers/openModalById";
import { getYearMonthDate } from "../helpers/formattedDate";

const HabitModalContext = createContext<any>(undefined);

export const HabitModalProvider = ({ children }: { children: any }) => {
  const { year, month, date } = getYearMonthDate(new Date());
  const [modalHabitId, setModalHabitId] = useState<string | null>(null);
  const [modalHabitDate, setModalHabitDate] = useState({
    year,
    month,
    date: date - 1,
  });

  const openHabitModal = (
    habitId: string,
    habitDate: {
      year: number;
      month: number;
      date: number;
    }
  ) => {
    setModalHabitId(habitId);
    setModalHabitDate(habitDate);
    openModalById("show_habit");
  };

  return (
    <HabitModalContext.Provider
      value={{ openHabitModal, modalHabitDate, modalHabitId }}
    >
      {children}
    </HabitModalContext.Provider>
  );
};

export const useHabitModal = () => {
  const context = useContext(HabitModalContext);
  if (!context) {
    throw new Error("useHabitModal must be used within a ToastProvider");
  }
  return context;
};
