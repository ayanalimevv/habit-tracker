import React from "react";

const Loading = ({ size }: { size: string }) => {
  return <span className={`loading loading-infinity loading-${size}`}></span>;
};

export default Loading;
