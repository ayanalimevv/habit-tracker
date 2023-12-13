"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { app, db } from "../../utils/firebase";
import { useRouter } from "next/navigation";
import Toast from "@/app/components/Toast";
import Loader from "@/app/components/Loader";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSucess, setToastSucess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
        setTimeout(() => {
          setPageLoading(false);
        }, 2000);
      } else {
        setPageLoading(false);
      }
    });
  }, [router]);

  const setToast = (
    message: string,
    setToastOpen: boolean,
    success: boolean
  ) => {
    setIsToastOpen(setToastOpen);
    setToastMessage(message);
    setToastSucess(success);
  };

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

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;

      const user = result.user;

      let userDoc = await getDoc(doc(db, "users", `user_${user.uid}`));
      if (userDoc.exists()) {
        setLoading(false);
        router.push("/");
        return;
      }

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

  return (
    <>
      {pageLoading ? (
        <Loader size="lg" />
      ) : (
        <>
          <Toast
            message={toastMessage}
            isOpen={isToastOpen}
            success={toastSucess}
            setToast={setToast}
          />
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
                <input
                  type="password"
                  placeholder="1234567890"
                  className="input input-bordered"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="label">
                  <Link
                    href="/auth/register"
                    className="label-text-alt link link-hover"
                  >
                    {`Didn't Have an Account Yet?`}
                  </Link>
                </label>
              </div>

              <div className="form-control mt-6">
                <button
                  className="btn"
                  onClick={handleMailLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader size="lg" />
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
                      Login with Mail
                    </>
                  )}
                </button>
              </div>

              <div className="divider">OR</div>
              <button
                onClick={handleGoogleLogin}
                className="btn"
                disabled={loading}
              >
                {loading ? (
                  <Loader size="lg" />
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
                    Login with Google
                  </>
                )}
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
