import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

const habitdb = "habits";
const userdb = "users";
export const updateStreak = async (streak: number, habitId: string) => {
  try {
    await updateDoc(doc(db, habitdb, habitId), {
      streak,
    });
  } catch (error: any) {
    console.error(error.message, error.stack);
  }
};
