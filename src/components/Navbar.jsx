import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="grain-cream flex items-center justify-between border-b-4 border-[#063B2A] px-6 py-5 md:px-12">
      <h1 className="font-display text-2xl md:text-3xl">
        Frame<span className="text-[#FF3B8D]">InGoa</span>
      </h1>

      <button
        onClick={() => navigate("/")}
        className="sticker rounded-full bg-[#B7F000] px-5 py-2.5 text-sm font-bold text-[#111111] transition hover:-translate-y-0.5 hover:scale-105 active:translate-y-0"
      >
        HOME
      </button>
    </nav>
  );
}
