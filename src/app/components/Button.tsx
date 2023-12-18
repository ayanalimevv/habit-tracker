import React from "react";

const Button = ({
  children,
  extraClass = "",
  onClickFn,
  disabled = false,
}: {
  children?: any;
  extraClass?: string;
  onClickFn?: any;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`btn hover:scale-[.98] ${extraClass}`}
      onClick={onClickFn}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
