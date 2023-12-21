'use client'
import ReWordCheck from '@/components/rewordcheck'
import Synonym from '@/components/synonym';
import SynonymSelect from '@/components/synonymselect';
import Image from 'next/image'
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [is3Char, setIs3Char] = useState(false);
  useEffect(() => {
    console.log("is3Char:", is3Char);
  }, [is3Char]);
  const handle3CharChange = () => {
    setIs3Char(!is3Char);
  };
  let list: string[] = ["conrad", "sigmund"];
  return (
    <main className="flex flex-col justify-center items-center m-4 gap-4">
      <ReWordCheck name={"Only modify words greater than 3 characters"} isChecked={is3Char} setIsChecked={handle3CharChange}/>
      <Synonym word={"repeats"}/>
      <SynonymSelect word={"conrad"} synonyms={list}/>
    </main>
  )
}
