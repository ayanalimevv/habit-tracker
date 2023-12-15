type timeStamp = {
  seconds: number;
  nanoseconds: number;
};

export const formattedDate = (timestamp: any): string => {
  const timestampCombined: number =
    timestamp.seconds + timestamp.nanoseconds / 1e9;

  // Convert to date
  const date: Date = new Date(timestampCombined * 1000); // Convert to milliseconds

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getMonthName = (monthIndex: number): string => {
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (monthIndex >= 0 && monthIndex <= 11) {
    return months[monthIndex];
  } else {
    throw new Error(
      "Invalid month index. Month index should be between 0 and 11."
    );
  }
};

export const getYearMonthDate = (
  date: Date
): {
  year: number;
  date: number;
  month: number;
} => {
  return {
    year: date.getFullYear(),
    date: date.getDate(),
    month: date.getMonth(),
  };
};
