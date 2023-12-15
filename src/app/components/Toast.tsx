import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useToast } from "./ToastContext";

const Toast = () => {
  const { setToast, isToastOpen, toastMessage, toastSucess } = useToast();
  useEffect(() => {
    if (isToastOpen) {
      const timeoutId = setTimeout(() => {
        setToast("", false, false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [isToastOpen, setToast]);
  return isToastOpen ? (
    <div className="toast transition absolute top-0 left-0 w-fit z-50">
      <div className="alert overflow-hidden flex">
        <div
          className="bg-slate-800 rounded-full p-1 hover:cursor-pointer text-xs"
          onClick={() => setToast("", false, false)}
        >
          {toastSucess ? "✅" : "❌"}
        </div>
        <span className="text-sm">{toastMessage}</span>
      </div>
    </div>
  ) : null;
};

export default Toast;
