import UploadBox from "./UploadBox";

export default function BuilderForm({ builder, setBuilder }) {
  return (
    <div className="space-y-6">
      <UploadBox builder={builder} setBuilder={setBuilder} />

      <div>
        <label
          htmlFor="builder-name"
          className="mb-2 block text-xs font-black uppercase tracking-widest text-[#087F4F]"
        >
          Your Name
        </label>
        <input
          id="builder-name"
          type="text"
          placeholder="Your Name"
          value={builder?.name || ""}
          onChange={(e) =>
            setBuilder((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          className="w-full rounded-2xl border-2 border-[#063B2A]/20 bg-white px-4 py-3.5 font-semibold text-[#111111] placeholder:text-[#111111]/30 outline-none transition focus:border-[#FF3B8D] focus:ring-4 focus:ring-[#FF3B8D]/20"
        />
      </div>

      <div>
        <label
          htmlFor="builder-role"
          className="mb-2 block text-xs font-black uppercase tracking-widest text-[#087F4F]"
        >
          Role
        </label>
        <input
          id="builder-role"
          type="text"
          placeholder="builder-role"
          value={builder?.role || ""}
          onChange={(e) =>
            setBuilder((prev) => ({
              ...prev,
              role: e.target.value,
            }))
          }
          className="w-full rounded-2xl border-2 border-[#063B2A]/20 bg-white px-4 py-3.5 font-semibold text-[#111111] placeholder:text-[#111111]/30 outline-none transition focus:border-[#FFD83D] focus:ring-4 focus:ring-[#FFD83D]/30"
        />
      </div>

      <div>
        <label
          htmlFor="builder-stack"
          className="mb-2 block text-xs font-black uppercase tracking-widest text-[#087F4F]"
        >
          Tech Stack
        </label>
        <input
          id="builder-stack"
          type="text"
          placeholder="builder-stack"
          value={builder?.techStack || ""}
          onChange={(e) =>
            setBuilder((prev) => ({
              ...prev,
              techStack: e.target.value,
            }))
          }
          className="w-full rounded-2xl border-2 border-[#063B2A]/20 bg-white px-4 py-3.5 font-semibold text-[#111111] placeholder:text-[#111111]/30 outline-none transition focus:border-[#55D6FF] focus:ring-4 focus:ring-[#55D6FF]/30"
        />
      </div>
    </div>
  );
}
