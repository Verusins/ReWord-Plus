interface SynonymProps {
  word: string;
}

export default function Synonym({word}: SynonymProps){
  return (
    <main className="flex justify-center items-center bg-[#787DFF] rounded-lg px-3 py-1">
      {word}
    </main>
  );
}