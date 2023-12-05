import React, { useState } from "react";

const DoneButton = ({ text }: { text: string }) => {
  const [loading, setLoading] = useState(false);
  return (
    <button
      onClick={() => setLoading((p) => !p)}
      className={`btn w-full mt-4 hover:scale-95`}
      disabled={loading}
    >
      {loading ? "" : text}
      {loading ? (
        <span className="loading loading-infinity loading-sm"></span>
      ) : null}
    </button>
  );
};

export default DoneButton;
