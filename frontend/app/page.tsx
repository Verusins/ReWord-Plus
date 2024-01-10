"use client";
import NavBar from "@/components/navbar";
import ReWordCheck from "@/components/rewordcheck";
import Synonym from "@/components/synonym";
import SynonymSelect from "@/components/synonymselect";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { League_Spartan } from "next/font/google";
import { Lato } from "next/font/google";

const leagueSpartan = League_Spartan({
  weight: "400",
  subsets: ["latin"],
});

const lato = Lato({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const [is3Char, setIs3Char] = useState(false);
  const [isQuotes, setIsQuotes] = useState(false);
  const [text, setText] = useState("");
  useEffect(() => {
    console.log("is3Char:", is3Char);
  }, [is3Char]);
  useEffect(() => {
    console.log("text:", text);
  }, [text]);
  useEffect(() => {
    console.log("isQuotes:", isQuotes);
  }, [isQuotes]);
  const handle3CharChange = () => {
    setIs3Char(!is3Char);
  };
  const handleQuoteChange = () => {
    setIsQuotes(!isQuotes);
  };
  let list: string[] = [
    "conrad",
    "sigmund",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
  ];
  return (
    <main className="flex flex-col h-screen">
      <NavBar />
      <div
        className={`flex justify-between flex-grow my-6 mx-8 ${leagueSpartan.className}`}
      >
        <div className="flex flex-col flex-grow w-1/2">
          <form className={`p-4 h-full ${lato.className}`}>
            <textarea
              placeholder="Paste your content here"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border rounded-md p-2 h-full w-full resize-none"
            />
          </form>
          <div className="flex gap-4 m-4">
            <button className="sticky rounded-xl bg-[#C2DFF9] p-2 border border-black">
              Save & Evaluate
            </button>
            <button className="sticky rounded-xl bg-[#C2DFF9] p-2 border border-black">
              New Paragraph
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center m-4 gap-4 w-1/2">
          <ReWordCheck
            name={"Only modify words greater than 3 characters"}
            isChecked={is3Char}
            setIsChecked={handle3CharChange}
          />
          <ReWordCheck
            name={"Overlook Quotations"}
            isChecked={isQuotes}
            setIsChecked={handleQuoteChange}
          />
          <div className="flex flex-col gap-4 rounded-lg bg-[#C2DFF9] p-4 items-center w-full">
            <div>Here are duplications to be fixed:</div>
            <SynonymSelect word={"conrad"} synonyms={list} />
            <SynonymSelect word={"conrad"} synonyms={list} />
          </div>
        </div>
      </div>
    </main>
  );
}
