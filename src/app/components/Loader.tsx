import React from "react";

const Loader = ({ size }: { size: string }) => {
  return <span className={`loading loading-infinity loading-${size}`}></span>;
};

export default Loader;
