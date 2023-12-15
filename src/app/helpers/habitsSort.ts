export const handleHabitSort = (
  habitDocs: Habit[] | [],
  filterBy: string
): Habit[] | [] => {
  if (habitDocs.length < 1) return [];
  let arr: Habit[] = [];
  switch (filterBy) {
    case "newest":
      arr = [...habitDocs].sort((a: any, b: any) => b.createdAt - a.createdAt);
      break;

    case "a-z":
      // Sorting logic for alphabetical order
      arr = [...habitDocs].sort((a: Habit, b: Habit) =>
        a.habitName.localeCompare(b.habitName)
      );
      break;

    case "streak":
      // Sorting logic for streak
      arr = [...habitDocs].sort(
        (a: Habit, b: Habit) =>
          // Add your sorting logic for streak here
          b.streak - a.streak
      );
      break;

    case "oldest":
      // Sorting logic for oldest
      arr = [...habitDocs].sort(
        (a: any, b: any) =>
          // Add your sorting logic for oldest here
          a.createdAt - b.createdAt
      );
      break;

    default:
      arr = [...habitDocs].sort((a: Habit, b: Habit) =>
        a.habitName.localeCompare(b.habitName)
      );
      break;
  }

  return arr;
};
