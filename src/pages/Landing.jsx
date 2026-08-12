import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  const navigate = useNavigate();

  const goToBuilder = () => navigate("/builder");

  return (
    <div className="min-h-screen grain-cream text-[#111111] overflow-hidden">
      {/* NAVBAR */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12">
        <h1 className="font-display text-2xl md:text-3xl tracking-tight">
          Frame<span className="text-[#FF3B8D]">InGoa</span>
        </h1>

        <button
          onClick={goToBuilder}
          className="sticker rounded-full bg-[#B7F000] px-5 py-3 text-sm md:text-base font-bold text-[#111111] transition hover:-translate-y-0.5 hover:scale-105 active:translate-y-0"
        >
          BUILD YOUR PASS →
        </button>
      </nav>

      {/* HERO */}
      <section className="relative z-10 px-6 pt-10 pb-20 md:px-12 md:pt-16">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -top-10 left-4 h-40 w-40 rounded-full bg-[#55D6FF]/30 blur-2xl md:h-64 md:w-64" />
        <div className="pointer-events-none absolute top-40 right-0 h-40 w-40 rounded-full bg-[#FFD83D]/40 blur-2xl md:h-72 md:w-72" />

        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <span className="hand-ring inline-block rotate-[-2deg] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#087F4F]">
              🌴 Live from Goa · Oct 2026
            </span>

            <h2 className="font-display mt-6 text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
              YOUR BUILDER
              <br />
              <span className="text-[#FF3B8D]">IDENTITY</span> STARTS
              <br />
              HERE.
            </h2>

            <p className="mx-auto mt-6 max-w-lg text-lg text-[#111111]/70 lg:mx-0">
              Not another conference badge. Create a Builder Pass you'll
              actually want to post.
            </p>

            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start lg:items-start">
              <button
                onClick={goToBuilder}
                className="sticker rounded-full bg-[#FFD83D] px-8 py-4 text-lg font-black text-[#111111] transition hover:-translate-y-0.5 hover:scale-105 active:translate-y-0"
              >
                BUILD MY IDENTITY →
              </button>

              <span className="rotate-2 rounded-xl bg-[#111111] px-4 py-2 font-mono text-xs text-[#39D353] sticker">
                $ npm run ship --goa
              </span>
            </div>
          </div>

          {/* Right: decorative pass mockup */}
          <div className="relative mx-auto h-[420px] w-full max-w-sm sm:h-[480px]">
            {/* stickers around the pass */}
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="sticker float-slow absolute -left-4 top-2 z-20 rotate-[-8deg] rounded-full bg-[#087F4F] px-3 py-1.5 text-[11px] font-bold text-[#FFF4D6] sm:-left-8"
            >
              GOA 2026
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="sticker float-slow absolute -right-2 top-16 z-20 rotate-6 rounded-xl bg-[#FF6B4A] px-3 py-1.5 text-[11px] font-bold text-white sm:-right-6"
              style={{ "--r": "6deg" }}
            >
              BUILD &gt; SLEEP
            </motion.span>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticker float-slow absolute -left-2 bottom-24 z-20 rotate-[-4deg] rounded-full bg-[#55D6FF] px-3 py-1.5 text-[11px] font-bold text-[#063B2A] sm:-left-6"
            >
              +1 BUILDER
            </motion.span>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="sticker float-slow absolute -right-3 bottom-6 z-20 rotate-[5deg] rounded-xl bg-[#FF3B8D] px-3 py-1.5 text-[11px] font-bold text-white sm:-right-8"
            >
              ✨ LIVE FROM GOA
            </motion.span>

            <span className="absolute left-1/2 -top-6 z-20 -translate-x-1/2 text-3xl">
              ☀️
            </span>

            {/* the pass itself */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: -3 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="sticker absolute inset-0 mx-auto flex w-[260px] flex-col rounded-[28px] border-4 border-[#063B2A] bg-gradient-to-br from-[#FFF4D6] to-[#FFEBAE] p-5 shadow-2xl sm:w-[290px]"
            >
              <div className="h-1.5 w-full stripe-accent rounded-full" />

              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-[#111111] px-3 py-1 text-[10px] font-black text-[#B7F000]">
                  HH GOA 2026
                </span>
                <span className="text-2xl">🌴</span>
              </div>

              <div className="mt-5 flex h-28 items-center justify-center rounded-2xl bg-[#dfe8d5] text-4xl">
                🧑‍💻
              </div>

              <div className="mt-4 text-center">
                <p className="font-display text-xl">YOU, BUILDER</p>
                <p className="mt-1 text-xs font-semibold text-[#087F4F]">
                  Full Stack Wizard
                </p>
              </div>

              <div className="mt-4 rounded-xl bg-[#063B2A] py-3 text-center">
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#B7F000]">
                  Builder Title
                </p>
                <p className="mt-1 font-display text-sm text-[#FFD83D]">
                  API ALCHEMIST
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EVENT ENERGY SECTION */}
      <section className="grain-jungle relative overflow-hidden px-6 py-20 text-[#FFF4D6] md:px-12">
        <div className="pointer-events-none absolute -bottom-16 -left-10 text-[10rem] opacity-10">
          🌴
        </div>
        <div className="pointer-events-none absolute -top-10 -right-10 text-[10rem] opacity-10">
          ☀️
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <h3 className="font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
            <span className="text-[#FFD83D]">BUILD.</span>{" "}
            <span className="text-[#39D353]">BREAK.</span>{" "}
            <span className="text-[#FF3B8D]">SHIP.</span>{" "}
            <span className="text-[#55D6FF]">REPEAT.</span>
          </h3>

          <p className="mt-8 font-mono text-sm tracking-widest text-[#B7F000] sm:text-base">
            GOA • 28–31 OCT 2026
          </p>

          <p className="font-poster mt-2 text-2xl sm:text-3xl">
            HACKER HOUSE <span className="text-[#FF3B8D]">GOA</span>
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="grain-cream px-6 py-24 text-center md:px-12">
        <h3 className="font-display mx-auto max-w-2xl text-3xl leading-tight sm:text-4xl md:text-5xl">
          READY TO GET YOUR
          <br />
          <span className="text-[#FF3B8D]">BUILDER PASS?</span>
        </h3>

        <button
          onClick={goToBuilder}
          className="sticker mt-10 rounded-full bg-[#B7F000] px-10 py-5 text-lg font-black text-[#111111] transition hover:-translate-y-0.5 hover:scale-105 active:translate-y-0"
        >
          BUILD MY IDENTITY →
        </button>

        <p className="mt-14 font-mono text-xs uppercase tracking-widest text-[#111111]/40">
          FrameInGoa · Hacker House Goa 2026
        </p>
      </section>
    </div>
  );
}
