type Habit = {
  streak: number;
  habitName: string;
  daysCompleted: { [date: string]: boolean };
  id: string;
};

type HabitwId = {
  streak: number;
  habitName: string;
  daysCompleted: { [date: string]: boolean };
  id?: string;
};

type User = {
  name: string;
  habitsId: [string];
};
