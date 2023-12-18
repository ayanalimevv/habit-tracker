import { Timestamp } from "firebase/firestore";

type Habit = {
  streak: number;
  habitName: string;
  daysCompleted: {
    [date: string]: {
      [isDone: string]: boolean;
      [note: string]: string;
      [habitImage?: string]: string;
    };
  };
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

type User = {
  name: string;
  habitsId: [string];
};

type DayDetails = {
  [isDone: string]: boolean;
  [note: string]: string;
  [habitImage?: string]: string;
  [createdAt?: string]: Timestamp;
};
