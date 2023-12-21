import { ChangeEventHandler } from "react";

interface ReWordCheckProps {
  name: string;
  isChecked: boolean;
  setIsChecked: React.ChangeEventHandler<HTMLInputElement>;
}

export default function ReWordCheck({name, isChecked, setIsChecked}: ReWordCheckProps){
  return (
    <main className="flex justify-center items-center bg-[#787DFF] rounded-lg p-2 gap-4 text-white">
      {name}
      <input className="mr-2 leading-tight" type="checkbox" checked={isChecked} onChange={setIsChecked}></input>
    </main>
  );
}