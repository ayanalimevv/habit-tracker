"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { app, auth } from "../utils/firebase";
import { getAuth, signOut } from "firebase/auth";
import Router from "next/router";

const Navbar = ({ navTitle }: { navTitle: string }) => {
  const router = Router;
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        router.push("/auth/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
                src={imageUrl}
                width={40}
                height={40}
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
            {/* <li> */}
            {/* <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li> */}
            <li>
              <span onClick={handleSignOut}>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
