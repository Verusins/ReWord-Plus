import { League_Spartan } from "next/font/google";
import { Lato } from "next/font/google";

const leagueSpartan = League_Spartan({
  weight: "500",
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

export default function NavBar() {
  return (
    <main className="flex justify-between items-center flex-wrap bg-white px-14 py-4 text-black">
      <div className="flex text-3xl">
        <div className={`text-[#63ADF2] ${latoBold.className}`}>Re</div>
        <div className={lato.className}>Word+</div>
      </div>
      <div
        className={`flex jusitfy-between gap-8 items-center text-xl ${leagueSpartan.className}`}
      >
        <button>Home</button>
        <button>History</button>
        <button>Statistics</button>
        <button>Settings</button>
      </div>
    </main>
  );
}
