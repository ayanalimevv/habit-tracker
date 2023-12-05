import React from "react";

const Divider = ({ text = "" }: { text?: string }) => {
  return <div className="divider">{text}</div>;
};

export default Divider;
