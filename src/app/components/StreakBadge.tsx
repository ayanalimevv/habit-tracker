import React from "react";

export const StreakBadge = ({
  dataTip,
  levelName,
}: {
  dataTip: string;
  levelName: string;
}) => {
  return (
    <div
      className="tooltip absolute right-0 top-0 translate-x-[50%] translate-y-[-50%]"
      data-tip={`Current Level : ${dataTip}`}
    >
      <div className="badge badge-neutral mx-3">{levelName}</div>
    </div>
  );
};
