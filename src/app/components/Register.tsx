import Link from "next/link";
import React, { useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app, db } from "../utils/firebase";
import { useRouter } from "next/navigation";
import Toast from "@/app/components/Toast";
import Loader from "@/app/components/Loader";
import { doc, setDoc } from "firebase/firestore";
import { useToast } from "./ToastContext";
import PasswordInput from "./PasswordInput";
import FormInput from "./FormInput";
import Divider from "./Divider";
import AuthButton from "./AuthButton";

const Register = ({
  setLoggedIn,
}: {
  setLoggedIn: (loginValue: boolean) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const { setToast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    password !== "" && setShowPassword(!showPassword);
  };

  const handleGoogleRegister = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      GoogleAuthProvider.credentialFromResult(result);

      const user = result.user;
      const options: any = { day: "numeric", month: "short", year: "numeric" };
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

  const handleEmailRegister = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
      const auth = getAuth(app);
      if (email.trim() === "" || password === "" || username.trim() === "") {
        setToast("Enter value in all fields!", true, false);
        setLoading(false);
        return;
      } else if (password !== confirmPassword) {
        setToast("Password and Confirm Password is Different!", true, false);
        setLoading(false);
        return;
      }
      let { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const options: any = { day: "numeric", month: "short", year: "numeric" };
      const formattedDate = new Date().toLocaleDateString("en-US", options);

      await setDoc(doc(db, "users", `user_${user.uid}`), {
        username,
        email,
        habitsId: [],
        createdAt: formattedDate,
      });

      setToast("Successfully Registered!", true, true);
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
      onChangeHandler: setUsername,
      value: username,
    },
    {
      id: "2",
      type: "email",
      label: "Email",
      placeholder: "john.doe@gmail.com",
      required: true,
      onChangeHandler: setEmail,
      value: email,
    },
  ];
  return (
    <>
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Register now!</h1>
        <p className="py-6">
          Shape Your Destiny: Take the First Step by Habit Tracking
        </p>
      </div>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl border-[#414141] border rounded-lg">
        <form className="card-body">
          <h1 className="text-2xl capitalize flex items-center mr-auto">
            Register Now!
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
          <PasswordInput
            label="Confirm Password"
            setPassword={setConfirmPassword}
            password={confirmPassword}
          />
          <label className="label">
            <Link
              href="/auth"
              onClick={() => setLoggedIn(true)}
              className="label-text-alt link link-hover"
            >
              {`Already have a account?`}
            </Link>
          </label>
          <AuthButton
            onClickHandler={handleEmailRegister}
            loading={loading}
            type="mail"
          />
          <Divider text="OR" />
          <AuthButton
            onClickHandler={handleGoogleRegister}
            loading={loading}
            type="google"
          />
        </form>
      </div>
    </>
  );
};

export default Register;
