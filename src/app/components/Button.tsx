import React from "react";

const Button = ({
  children,
  extraClass = "",
  onClickFn,
}: {
  children?: any;
  extraClass?: string;
  onClickFn?: any;
}) => {
  return (
    <button
      className={`btn hover:scale-[.98] bg-opacity-50 hover:bg-opacity-70 ${extraClass}`}
      onClick={onClickFn}
    >
      {children}
    </button>
  );
};

export default Button;
