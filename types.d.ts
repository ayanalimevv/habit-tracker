type Habit = {
  streak: number;
  habitName: string;
  daysCompleted: { [date: string]: boolean };
  id?: string;
};
