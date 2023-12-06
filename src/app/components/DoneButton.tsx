import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { update } from "firebase/database";

const DoneButton = ({
  defaultText,
  completedText,
}: {
  defaultText: string;
  completedText: string;
}) => {
  const [status, setStatus] = useState("default");
  const [text, setText] = useState(defaultText);

  useEffect(() => {
    if (status === "loading") setText("");
    if (status === "completed") setText(completedText);
    else setText(defaultText);
  }, [status, defaultText, completedText]);

  useEffect(() => {
    let checkCompletionforToday = async () => {
      let todayDoc: any = (
        await getDoc(doc(db, "habits", "m4daaQdrWdRVqAz7dYAS"))
      ).data();
      let today = new Date().toISOString().split("T")[0];
      if (todayDoc.daysCompleted?.[`${today}`]) {
        setStatus("completed");
      }
    };
    checkCompletionforToday();
  }, []);

  const updateCompletion = async (habitId: string) => {
    try {
      // Fetch the habit document
      setStatus("loading");
      const habitDoc: any = doc(db, "habits", habitId);

      let today = new Date().toISOString().split("T")[0];
      console.log(today);

      if (habitDoc && !habitDoc.daysCompleted?.[`${today}`]) {
        await updateDoc(habitDoc, {
          [`daysCompleted.${today}`]: true,
        });
      }

      // await updateDoc(habitDoc, {
      //   daysCompleted: {},
      // });

      setStatus("completed");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <button
      onClick={() => updateCompletion("m4daaQdrWdRVqAz7dYAS")}
      className={`btn w-full mt-4 hover:scale-95`}
      disabled={status === "loading" || status === "completed"}
    >
      {status === "loading" ? "" : text}
      {status === "loading" ? (
        <span className="loading loading-infinity loading-sm"></span>
      ) : null}
    </button>
  );
};

export default DoneButton;
