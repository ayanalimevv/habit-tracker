// ToastContext.js
import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext<any>(undefined);

export const ToastProvider = ({ children }: { children: any }) => {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSucess, setToastSucess] = useState(false);

  const setToast = (
    message: string,
    setToastOpen: boolean,
    success: boolean
  ) => {
    setIsToastOpen(setToastOpen);
    setToastMessage(message);
    setToastSucess(success);
  };

  return (
    <ToastContext.Provider
      value={{ setToast, isToastOpen, toastMessage, toastSucess }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
