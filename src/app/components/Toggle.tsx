import React, { useState } from "react";

const Toggle = ({
  isHideNotCompleted,
  setIsHideNotCompleted,
}: {
  isHideNotCompleted: boolean;
  setIsHideNotCompleted: any;
}) => {
  return (
    <div className="form-control mb-4 ml-auto">
      <label className="label cursor-pointer flex justify-end">
        <span className="label-text mr-2">
          Show {!isHideNotCompleted ? "Completed" : "All"}
        </span>
        <input
          type="checkbox"
          className="toggle"
          checked={isHideNotCompleted}
          onChange={() => setIsHideNotCompleted(!isHideNotCompleted)}
        />
      </label>
    </div>
  );
};

export default Toggle;
