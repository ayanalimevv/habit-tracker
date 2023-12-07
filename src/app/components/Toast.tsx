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
          className="bg-slate-800 rounded-full p-1 hover:cursor-pointer"
          onClick={() => setToast("", false, false)}
        >
          {success ? (
            "✅"
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="16px"
              height="16px"
            >
              <path
                fill="#F44336"
                d="M21.5 4.5H26.501V43.5H21.5z"
                transform="rotate(45.001 24 24)"
              />
              <path
                fill="#F44336"
                d="M21.5 4.5H26.5V43.501H21.5z"
                transform="rotate(135.008 24 24)"
              />
            </svg>
          )}
        </div>
        <span className="text-sm">{message}</span>
      </div>
    </div>
  ) : null;
};

export default Toast;
