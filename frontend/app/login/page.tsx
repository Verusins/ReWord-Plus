"use client";
import "./login.css";
import { League_Spartan } from "next/font/google";
import { Lato } from "next/font/google";
import React, { useState, useEffect } from "react";

const leagueSpartan = League_Spartan({
  weight: "400",
  subsets: ["latin"],
});

const latoBold = Lato({
  weight: "900",
  subsets: ["latin"],
});

const lato = Lato({
  weight: "400",
  subsets: ["latin"],
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <main className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center rounded-lg min-w-max p-8 gap-4 shadow-xl">
        <div className="flex text-4xl">
          <div className={`text-[#63ADF2] ${latoBold.className}`}>Re</div>
          <div className={lato.className}>Word+</div>
        </div>
        <form className={`p-4 h-full ${lato.className}`}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 h-full w-full"
          />
        </form>
        <form className={`p-4 h-full ${lato.className}`}>
          <input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 h-full w-full"
          />
        </form>
      </div>
    </main>
  );
}
