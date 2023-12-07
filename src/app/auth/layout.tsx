"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Toast from "../components/Toast";
import { useState } from "react";
// import '../globals.css'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="hero min-h-screen bg-black">
          <div className="hero-content flex-col lg:flex-row">{children}</div>
        </div>
      </body>
    </html>
  );
}
