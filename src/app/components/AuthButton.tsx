import React from "react";
import Loader from "./Loader";
import Image from "next/image";

const AuthButton = ({
  loading,
  onClickHandler,
  type,
  authType = "Register",
}: {
  loading: boolean;
  onClickHandler: React.Dispatch<React.SetStateAction<any>>;
  type: "mail" | "google";
  authType?: "Login" | "Register";
}) => {
  return (
    <div className="form-control">
      <button className="btn" onClick={onClickHandler} disabled={loading}>
        {loading ? (
          <Loader />
        ) : type === "mail" ? (
          <>
            <Image
              alt="Google Image"
              src="/mail.svg"
              width={16}
              height={16}
            ></Image>
            {authType} with Mail
          </>
        ) : (
          <>
            <Image
              alt="Google Image"
              src="/google.svg"
              width={16}
              height={16}
            ></Image>
            {authType} with Google
          </>
        )}
      </button>
    </div>
  );
};

export default AuthButton;
