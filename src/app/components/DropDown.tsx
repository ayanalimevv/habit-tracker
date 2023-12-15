import React, { useState } from "react";

const DropDown = ({ habitsSort }: { habitsSort: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortingHeading, setSortingHeading] = useState("Sort By");
  const handleSortChange = (e: any) => {
    let sortMethod = e.target.getAttribute("sort-var");
    setSortingHeading(e.target.innerText);

    habitsSort(sortMethod);
    setIsOpen(false);
  };
  return (
    <div className="dropdown mr-auto">
      <div
        tabIndex={0}
        role="button"
        className="btn m-1"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {sortingHeading}
        <svg
          className={`w-3 h-3 ml-2 ${
            isOpen && "rotate-180"
          } text-white transition ease-linear`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 8"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
          />
        </svg>
      </div>
      {isOpen && (
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-[#191e24] rounded-lg w-52"
        >
          <li
            className="p-2 hover:cursor-pointer"
            onClick={handleSortChange}
            sort-var="newest"
          >
            Newest
          </li>
          <li
            className="p-2 hover:cursor-pointer"
            onClick={handleSortChange}
            sort-var="a-z"
          >
            Alphabetic
          </li>
          <li
            className="p-2 hover:cursor-pointer"
            onClick={handleSortChange}
            sort-var="streak"
          >
            Streak
          </li>
          <li
            className="p-2 hover:cursor-pointer"
            onClick={handleSortChange}
            sort-var="completions"
          >
            Total Completions
          </li>
          <li
            className="p-2 hover:cursor-pointer"
            onClick={handleSortChange}
            sort-var="oldest"
          >
            Oldest
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropDown;
