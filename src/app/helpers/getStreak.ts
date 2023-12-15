import { getYearMonthDate } from "./formattedDate";

export const getStreak = (habit: Habit): number => {
  let { year, month, date } = getYearMonthDate(new Date());
  date--;
  const currMonthObj: any = habit.daysCompleted[year][month];
  let streak = 0;

  for (let i = date - 1; i >= 0; i--) {
    if (currMonthObj[i] && !currMonthObj[i].isDone) break;
    else streak++;
  }

  currMonthObj && currMonthObj[date].isDone ? streak++ : null;
  return streak;
};
