"use client";
import NavBar from "@/components/navbar";
import ReWordCheck from "@/components/rewordcheck";
import Synonym from "@/components/synonym";
import SynonymSelect from "@/components/synonymselect";
import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [is3Char, setIs3Char] = useState(false);
  const [text, setText] = useState("");
  useEffect(() => {
    console.log("is3Char:", is3Char);
  }, [is3Char]);
  useEffect(() => {
    console.log("text:", text);
  }, [text]);
  const handle3CharChange = () => {
    setIs3Char(!is3Char);
  };
  let list: string[] = ["conrad", "sigmund"];
  return (
    <main className="flex flex-col h-screen">
      <NavBar />
      <div className="flex justify-between flex-grow">
        <div className="flex flex-col flex-grow px-8">
          <form className="p-4 h-full">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border rounded-md p-2 h-full resize-none"
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
        <div className="flex flex-col justify-center items-center m-4 gap-4">
          <ReWordCheck
            name={"Only modify words greater than 3 characters"}
            isChecked={is3Char}
            setIsChecked={handle3CharChange}
          />
          <Synonym word={"repeats"} />
          <SynonymSelect word={"conrad"} synonyms={list} />
        </div>
      </div>
    </main>
  );
}
