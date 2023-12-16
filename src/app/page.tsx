"use client";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { app } from "./utils/firebase";
import Auth from "./auth/page";
import Home from "./home/page";

const App = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState<string | null>(null);
  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
        setLoading(false);
        router.push("/home");
      } else {
        router.push("/auth/");
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    });
  }, [router]);
  return <>{uid ? <Home /> : <Auth />}</>;
};

export default App;
