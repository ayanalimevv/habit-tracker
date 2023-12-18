import { doc, updateDoc } from "firebase/firestore";
import { app, db } from "../utils/firebase";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

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
export const uploadProfilePic = async (
  selectedFile: File | null,
  uid: string,
  setValue: any
) => {
  if (selectedFile && uid) {
    // Get the reference to the storage
    const storage = getStorage(app);

    // Create a reference to the file in Firebase Storage
    const storageRef = ref(storage, `images/users/${uid}`);

    // Upload the file
    try {
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setValue(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error(`Upload Failed`);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadURL: string) => {
              updateProfilePicInDb(downloadURL, uid);
              setValue(0);
            }
          );
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }
};

export const uploadHabitPic = async (
  selectedFile: File | null,
  habitId: string,
  year: number,
  month: number,
  day: number
) => {
  if (selectedFile && habitId) {
    // Get the reference to the storage
    const storage = getStorage(app);

    // Create a reference to the file in Firebase Storage
    const storageRef = ref(storage, `images/habit/${habitId}`);

    // Upload the file
    try {
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          // setValue(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error(`Upload Failed`);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadURL: string) => {
              updateHabitPicInDb(downloadURL, habitId, year, month, day);
              // setValue(0);
            }
          );
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }
};

const updateProfilePicInDb = async (downloadURL: string, uid: string) => {
  await updateDoc(doc(db, "users", `user_${uid}`), {
    profileUrl: downloadURL,
  });
};

const updateHabitPicInDb = async (
  downloadURL: string,
  habitId: string,
  year: number,
  month: number,
  day: number
) => {
  await updateDoc(doc(db, "habits", `${habitId}`), {
    [`daysCompleted.${year}.${month}.${day}.habitImage`]: downloadURL,
  });
};

export const removeProfilePic = async (uid: string) => {
  try {
    await updateDoc(doc(db, "users", `user_${uid}`), {
      profileUrl: "",
    });
    return { success: true, message: "Profile Pic Updated Successfully" };
  } catch (error: any) {
    return {
      success: false,
      message: error.stack,
    };
  }
};
