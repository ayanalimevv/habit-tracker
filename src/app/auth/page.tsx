"use client";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

 
  useEffect(() => {
    (!isLoggedIn) ? redirect("/auth/login") : redirect("/");
  }, []);

  return <></>;
};

export default Home;
