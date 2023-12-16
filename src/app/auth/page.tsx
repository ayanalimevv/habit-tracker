"use client";
import React, { useEffect, useState } from "react";
import { ToastProvider } from "../components/ToastContext";
import { useRouter } from "next/navigation";
import Register from "../components/Register";
import Login from "../components/Login";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const setLoggedIn = (loginValue: boolean) => {
    setIsLoggedIn(loginValue);
  };
  return (
    <ToastProvider>
      {isLoggedIn ? (
        <Login setLoggedIn={setLoggedIn} />
      ) : (
        <Register setLoggedIn={setLoggedIn} />
      )}
    </ToastProvider>
  );
};

export default Home;
