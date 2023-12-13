import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { app, db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

const Navbar = ({
  navTitle,
  setToast,
  uid,
}: {
  navTitle: string;
  setToast: (message: string, setToastOpen: boolean, success: boolean) => void;
  uid: string;
}) => {
  const [user, setUser] = useState<any>(null);
  const handleSignOut = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        router.push("/auth/login");
      })
      .catch((error) => {
        setToast(`${error}`, true, false);
      });
  };

  useEffect(() => {
    const getUserdata = async (uid: string) => {
      let res = await getDoc(doc(db, "users", `user_${uid}`));
      console.log(res.data());

      setUser(res.data());
    };
    getUserdata(uid);
  }, []);

  const router = useRouter();
  return (
    <div className="navbar bg-black z-50 border-b-[1px] border-[#414141] fixed">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-xl">
          {navTitle}
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar bg-[#1d1d1d] rounded-lg flex flex-row"
          >
            {/* <Image
              alt="Tailwind CSS Navbar component"
              src={
                "https://firebasestorage.googleapis.com/v0/b/habit-tracker-12666.appspot.com/o/Android%20Small%20-%208.png?alt=media&token=a73802f5-315f-46eb-8f1e-8994dd6c6d3d"
              }
              width={40}
              height={40}
              className="rounded-lg"
            /> */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-[#1d1d1d] rounded-lg w-52"
          >
            <h1 className="p-2">{`Hi, ${user?.username}`}</h1>
            <p className="p-2">{`Member Since ${user?.createdAt}`} </p>
            <li>
              <span onClick={handleSignOut} className="p-2">
                Logout
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="ml-[.5px] bi bi-box-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
                </svg>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
