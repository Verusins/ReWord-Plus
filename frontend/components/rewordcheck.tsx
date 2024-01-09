import { ChangeEventHandler } from "react";

interface ReWordCheckProps {
  name: string;
  isChecked: boolean;
  setIsChecked: React.ChangeEventHandler<HTMLInputElement>;
}

export default function ReWordCheck({
  name,
  isChecked,
  setIsChecked,
}: ReWordCheckProps) {
  return (
    <main className="flex justify-between items-center bg-[#787DFF] rounded-lg py-2 px-4 gap-16 text-white w-full">
      {name}
      <input
        className="mr-2 leading-tight"
        type="checkbox"
        checked={isChecked}
        onChange={setIsChecked}
      ></input>
    </main>
  );
}
