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
          <div className="form-control">
            <label className="label">
              <span className="label-text">UserName</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="john.doe@gmail.com"
              className="input input-bordered"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="1234567890"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute inset-y-0 right-1 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#b3b3b3"
                    className="bi bi-eye-slash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#b3b3b3"
                    className="bi bi-eye"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                  </svg>
                )}
              </div>
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="confirm password"
              placeholder="1234567890"
              className="input input-bordered"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          </div>
          <div className="form-control mt-6">
            <button
              className="btn"
              onClick={handleEmailRegister}
              disabled={loading}
            >
              {loading ? (
                <Loader />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-envelope-at-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                    <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z" />
                  </svg>
                  Register with Mail
                </>
              )}
            </button>
          </div>

          <div className="divider">OR</div>
          <button
            onClick={handleGoogleRegister}
            className="btn"
            disabled={loading}
          >
            {loading ? (
              <Loader />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-google"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>
                Register with Google
              </>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;