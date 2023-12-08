import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer items-center justify-center p-4 bg-black text-white border-t border-[#414141]">
      <p className="flex">
        Made with ❤️ by
        <Link
          href={`https://linktr.ee/alpha2207`}
          target="_blank"
          className="underline text-slate-200 hover:text-slate-300"
        >
          @alpha2207
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
