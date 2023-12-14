import React, { useState } from "react";

const Toggle = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="form-control w-full mb-4">
      <label className="label cursor-pointer flex justify-end">
        <span className="label-text mr-2">
          {isChecked ? "Hide" : "Show"} Completed
        </span>
        <input
          type="checkbox"
          className="toggle"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
      </label>
    </div>
  );
};

export default Toggle;
