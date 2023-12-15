type Habit = {
  streak: number;
  habitName: string;
  daysCompleted: {
    [date: string]: {
      [isDone: string]: boolean;
      [note: string]: string;
    };
  };
  id: string;
};

type User = {
  name: string;
  habitsId: [string];
};
