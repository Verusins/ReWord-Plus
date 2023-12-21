import Synonym from "./synonym";

interface SynonymSelectProps {
  word: string;
  synonyms: string[];
}

export default function SynonymSelect({ word, synonyms }: SynonymSelectProps) {
  return (
    <main className="flex flex-col justify-center bg-inherit bg-white items-start rounded-lg gap-4 p-4">
      <div className="text-4xl font-medium">{word}</div>
      <div className="h-[2px] w-[100%] bg-[#CCCCCC]"></div>
      <div className="flex gap-2 flex-wrap">
      {synonyms.map((synonym, index) => (
        <Synonym word={synonym}/>
      ))}
      </div>
    </main>
  );
}