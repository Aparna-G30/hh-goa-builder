import { motion } from "framer-motion";

export default function BuilderCard({ builder }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      whileHover={{ rotate: 0, scale: 1.02 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticker relative flex w-[320px] flex-col overflow-hidden rounded-[32px] border-4 border-[#063B2A] bg-gradient-to-br from-[#FFF4D6] via-[#FFF4D6] to-[#FFE8AE] p-6 text-[#111111] shadow-2xl sm:w-[360px]"
      style={{ aspectRatio: "2 / 3" }}
    >
      {/* diagonal stripe accent along the top */}
      <div className="absolute inset-x-0 top-0 h-2 stripe-accent" />

      {/* decorative corner stickers */}
      <span className="absolute -right-3 -top-3 rotate-12 text-3xl">☀️</span>
      <span className="absolute -left-2 bottom-24 -rotate-12 text-2xl opacity-90">
        🌴
      </span>

      <div className="mt-3 flex items-center justify-between">
        <span className="rounded-full bg-[#111111] px-3 py-1.5 text-[11px] font-black text-[#B7F000]">
          HH GOA 2026
        </span>
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#087F4F]">
          LIVE PREVIEW
        </span>
      </div>

      <div className="mt-6 flex justify-center">
        {builder?.image ? (
          <img
            src={builder.image}
            alt={builder?.name ? `Photo of ${builder.name}` : "Builder photo"}
            className="h-40 w-32 rounded-[20px] border-2 border-[#063B2A]/20 object-cover shadow-lg sm:h-44 sm:w-36"
          />
        ) : (
          <div className="flex h-40 w-32 items-center justify-center rounded-[20px] border-2 border-dashed border-[#087F4F]/40 bg-[#dfe8d5] text-sm text-[#087F4F]/70 shadow-inner sm:h-44 sm:w-36">
            Photo
          </div>
        )}
      </div>

      <div className="mt-5 text-center">
        <h2 className="font-display text-xl text-[#063B2A] sm:text-2xl">
          {builder?.name || "Your Name"}
        </h2>

        <p className="mt-1 text-sm font-bold text-[#FF3B8D]">
          {builder?.role || "Backend Engineer"}
        </p>

        <p className="mt-2 text-[11px] font-semibold tracking-wide text-[#111111]/60">
          {builder?.techStack || "Python • FastAPI • React"}
        </p>
      </div>

      <div className="mt-auto space-y-3 pt-5">
        <div className="rounded-2xl bg-[#063B2A] px-4 py-3.5 text-center shadow-lg">
          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#B7F000]">
            Builder Title
          </p>
          <h3 className="font-display mt-1.5 text-lg text-[#FFD83D] sm:text-xl">
            {builder?.title || "API Alchemist"}
          </h3>
        </div>

        <div className="flex items-center justify-between rounded-xl border-2 border-dashed border-[#087F4F]/40 px-3 py-2">
          <span className="font-mono text-[11px] font-bold tracking-widest text-[#087F4F]">
            {builder?.builderId || "HH26-XXXXX"}
          </span>
          <span className="text-[11px] font-bold text-[#FF6B4A]">
            {builder?.status || "Building."}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
