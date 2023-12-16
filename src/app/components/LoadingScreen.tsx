import React from "react";
import Toast from "./Toast";
import Loader from "./Loader";

const LoadingScreen = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Toast />
      <Loader />
    </div>
  );
};

export default LoadingScreen;
