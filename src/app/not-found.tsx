"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "./components/Loader";

const NotFound = () => {
  // const [loading, setLoading] = useState(true);
  const router = useRouter();
  // setLoading(false);
  useEffect(() => {
    router.push("/");
  }, []);

  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    </>
  );
};

export default NotFound;
