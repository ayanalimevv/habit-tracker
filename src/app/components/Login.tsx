import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { app, db } from "../utils/firebase";
import { useRouter } from "next/navigation";
import Toast from "@/app/components/Toast";
import Loader from "@/app/components/Loader";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useToast } from "./ToastContext";
import PasswordInput from "./PasswordInput";
import AuthButton from "./AuthButton";
import Divider from "./Divider";
import FormInput from "./FormInput";

const Login = ({
  setLoggedIn,
}: {
  setLoggedIn: (loginValue: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setToast } = useToast();

  const router = useRouter();

  const handleMailLogin = (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (email.trim() === "" || password === "") {
      setToast("Enter value in all fields!", true, false);
      setLoading(false);
      return;
    }
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setToast("Logged In Successfully!", true, true);
        setLoading(false);
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode && errorCode.includes("/")) {
          const parts = errorCode.split("/");
          const subParts = parts[1].split("-");
          const formattedMessage = subParts
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          formattedMessage.trim() !== ""
            ? setToast(formattedMessage, true, false)
            : setToast(errorMessage, true, false);
        } else {
          // Handle the case where errorCode is undefined or doesn't contain a "/"
          setToast(errorMessage, true, false);
        }
        setLoading(false);
      });
  };

  const handleGoogleLogin = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    console.log("inside func");

    try {
      console.log("inside try");

      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      GoogleAuthProvider.credentialFromResult(result);

      const user = result.user;

      const options: Object = {
        day: "numeric",
        month: "short",
        year: "numeric",
      };
      const formattedDate = new Date().toLocaleDateString("en-US", options);

      await setDoc(doc(db, "users", `user_${user.uid}`), {
        username: user.displayName,
        email: user.email,
        habitsId: [],
        createdAt: formattedDate,
      });

      setLoading(false);
      router.push("/");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode && errorCode.includes("/")) {
        const parts = errorCode.split("/");
        const subParts = parts[1].split("-");
        const formattedMessage = subParts
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        formattedMessage.trim() !== ""
          ? setToast(formattedMessage, true, false)
          : setToast(errorMessage, true, false);
      } else {
        // Handle the case where errorCode is undefined or doesn't contain a "/"
        setToast(errorMessage, true, false);
      }

      setLoading(false);
    }
  };
  let inputs = [
    {
      id: "1",
      type: "text",
      label: "Username",
      placeholder: "John Doe",
      required: true,
      onChangeHandler: setEmail,
      value: email,
    },
  ];
  return (
    <>
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <p className="py-6">
          Shape Your Destiny: Take the First Step by Habit Tracking
        </p>
      </div>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl border-[#414141] border rounded-lg">
        <form className="card-body">
          <h1 className="text-2xl capitalize flex items-center mr-auto">
            Login Now!
          </h1>
          {inputs.map((el) => {
            return (
              <FormInput
                key={el.id}
                type={el.type}
                placeholder={el.placeholder}
                label="Username"
                required={el.required}
                onChangeHandler={el.onChangeHandler}
                value={el.value}
              />
            );
          })}

          <PasswordInput
            label="Password"
            password={password}
            setPassword={setPassword}
          />
          <label className="label">
            <Link
              href="/auth"
              onClick={() => setLoggedIn(false)}
              className="label-text-alt link link-hover"
            >
              {`Didn't Have an Account Yet?`}
            </Link>
          </label>

          <AuthButton
            onClickHandler={handleMailLogin}
            loading={loading}
            type="mail"
          />
          <Divider text="OR" />
          <AuthButton
            onClickHandler={handleGoogleLogin}
            loading={loading}
            type="google"
          />
        </form>
      </div>
    </>
  );
};

export default Login;
