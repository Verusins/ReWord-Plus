"use client";
import NavBar from "@/components/navbar";
import ReWordCheck from "@/components/rewordcheck";
import Synonym from "@/components/synonym";
import SynonymSelect from "@/components/synonymselect";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { League_Spartan } from "next/font/google";
import { Lato } from "next/font/google";
<<<<<<< Updated upstream
import axios from "axios";
=======
import { get } from "http";
>>>>>>> Stashed changes

const leagueSpartan = League_Spartan({
  weight: "400",
  subsets: ["latin"],
});

const lato = Lato({
  weight: "400",
  subsets: ["latin"],
});

export default function Home(this: any) {
  const [is3Char, setIs3Char] = useState(false);
  const [isQuotes, setIsQuotes] = useState(false);
  const [text, setText] = useState("");
<<<<<<< Updated upstream
  const [pokemonData, setPokemonData] = useState(null);
=======
  const [analyzedText, setAnalyzedText] = useState("");
>>>>>>> Stashed changes
  useEffect(() => {
    console.log("is3Char:", is3Char);
  }, [is3Char]);
  useEffect(() => {
    console.log("text:", text);
  }, [text]);
  useEffect(() => {
    console.log("isQuotes:", isQuotes);
  }, [isQuotes]);
  useEffect(() => {
    console.log("PokeAPI Data:", pokemonData);
  }, [pokemonData]);
  const handle3CharChange = () => {
    setIs3Char(!is3Char);
  };
  const handleQuoteChange = () => {
    setIsQuotes(!isQuotes);
  };
  const fetchPokemonData = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/ditto"
      );
      setPokemonData(response.data);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error.message);
    }
  };
  useEffect(() => {
    fetchPokemonData();
  }, []);
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
      // analyzePara();
      fetch("http://127.0.0.1:8000/split", { method: "GET" })
        .then((responce) => responce.json)
        .then((json) => setText(json))
        .catch((error) => console.log("error"));
    }, []);
    alert(text);
  }

  // const analyzePara = () => {
  //   fetch("http://127.0.0.1:8000/split", { method: "GET" })
  //     .then((responce) => responce.json)
  //     .then((json) => setText(json))
  //     .catch((err) => console.log("error"));
  //   alert(this.text);
  // };

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
<<<<<<< Updated upstream
              onClick={fetchPokemonData}
              className="sticky rounded-xl bg-[#C2DFF9] p-2 border border-black"
=======
              className="sticky rounded-xl bg-[#C2DFF9] p-2 border border-black"
              onClick={savenEvaluate}
>>>>>>> Stashed changes
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
            <SynonymSelect word={analyzedText} synonyms={list} />
            <SynonymSelect word={"conrad"} synonyms={list} />
          </div>
        </div>
      </div>
    </main>
  );
}
