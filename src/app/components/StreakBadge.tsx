import React, { useEffect, useState } from "react";

export const StreakBadge = ({ streakLength }: { streakLength: number }) => {
  const [level, setLevel] = useState("");
  useEffect(() => {
    function generateNamesByStreakLength(streakLength: number) {
      let names = [];
      for (let i = 0; i < streakLength; i++) {
        const descriptor = getDescriptor(i);
        const fullName = `${descriptor}`;
        names.push(fullName);
      }

      return names;
    }

    function getDescriptor(index: number) {
      const descriptors = [
        "Newbie",
        "Growing",
        "Consistent",
        "Committed",
        "Alpha",
        "Chad",
      ];
      const descriptorIndex =
        index < 7
          ? 0 // Newbie for <7 days
          : index < 21
          ? 1 // Growing for >7 days but <21 days
          : index < 30
          ? 2 // Consistent for 21 days
          : index < 90
          ? 3 // Committed for 30 days
          : index < 180
          ? 4
          : 5; // Alpha for 3 months, Chad for 6 months
      return descriptors[descriptorIndex] || "Chad"; // Use 'Legend' for undefined cases
    }

    // Example usage:
    const streakLen = 180; // Example: 180 days
    const namesForStreak: string =
      generateNamesByStreakLength(streakLen)[streakLength];
    streakLength >= 180 ? setLevel("Chad") : setLevel(namesForStreak);
  }, []);

  return (
    <div
      className="tooltip"
      data-tip={`Level : ${level}`}
    >
      <div className="badge badge-neutral hover:bg-opacity-80 hover:cursor-pointer">{`${level}`}</div>
    </div>
  );
};
