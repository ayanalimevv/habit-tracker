import React, { Dispatch, SetStateAction } from "react";
import DropDown from "./DropDown";
import Toggle from "./Toggle";

const FilterSection = ({
  habitsSort,
  isHideNotCompleted,
  setIsHideNotCompleted,
}: {
  habitsSort: (filterBy: string) => void;
  isHideNotCompleted: boolean;
  setIsHideNotCompleted: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex items-center mb-4 justify-start w-full">
      <DropDown habitsSort={habitsSort} />
      <Toggle
        isHideNotCompleted={isHideNotCompleted}
        setIsHideNotCompleted={setIsHideNotCompleted}
      />
    </div>
  );
};

export default FilterSection;
