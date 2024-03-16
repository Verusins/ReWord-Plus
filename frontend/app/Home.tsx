"use client";
import NavBar from "@/components/navbar";
import ReWordCheck from "@/components/rewordcheck";
import SynonymSelect from "@/components/synonymselect";
import React, { useState, useEffect } from "react";
import { leagueSpartan, lato } from "./page";

export default function Home(this: any) {
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

  // save and analyze text
  function savenEvaluate() {
    // alert("test");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      analyzePara();
    }, []);
  }

  const analyzePara = () => {
    fetch("http://127.0.0.1:8000/split", { method: "GET" })
      .then((responce) => responce.json)
      .then((json) => setText(json))
      .then(alert("this is an alert"))
      .catch((err) => console.log("error"));
  };

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
            <button
              className="sticky rounded-xl bg-[#C2DFF9] p-2 border border-black"
              onClick={savenEvaluate}
            >
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
