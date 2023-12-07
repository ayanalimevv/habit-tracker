import Image from "next/image";
import React, { useEffect, useState } from "react";

const Toast = ({
  message = "Error",
  isOpen,
  setToast,
  success,
}: {
  message: string;
  isOpen: boolean;
  setToast: (message: string, value: boolean, success: boolean) => void;
  success: boolean;
}) => {
  useEffect(() => {
    // Auto-close the toast after 5 seconds when isOpen becomes true
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        setToast("", false, false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, setToast]);
  return isOpen ? (
    <div className="toast transition absolute top-0 left-0 w-fit z-50">
      <div className="alert overflow-hidden flex">
        <div
          className="bg-slate-800 rounded-full p-1 hover:cursor-pointer text-xs"
          onClick={() => setToast("", false, false)}
        >
          {success ? "✅" : "❌"}
        </div>
        <span className="text-sm">{message}</span>
      </div>
    </div>
  ) : null;
};

export default Toast;
