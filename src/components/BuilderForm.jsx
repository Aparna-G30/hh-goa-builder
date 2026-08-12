import UploadBox from "./UploadBox";
import { builderTitles } from "../constants/titles";

function fieldClass(hasError, focusColorClass) {
  return `w-full rounded-2xl border-2 bg-white px-4 py-3.5 font-semibold text-[#111111] placeholder:text-[#111111]/30 outline-none transition focus:ring-4 ${
    hasError
      ? "border-[#FF6B4A] focus:border-[#FF6B4A] focus:ring-[#FF6B4A]/20"
      : `border-[#063B2A]/20 ${focusColorClass}`
  }`;
}

export default function BuilderForm({ builder, setBuilder, fieldErrors = {} }) {
  const shuffleTitle = () => {
    const options = builderTitles.filter((t) => t !== builder?.title);
    const next = options[Math.floor(Math.random() * options.length)] || builderTitles[0];
    setBuilder((prev) => ({ ...prev, title: next }));
  };

  return (
    <div className="space-y-6">
      <div>
        <UploadBox builder={builder} setBuilder={setBuilder} />
        {fieldErrors.image && (
          <p className="mt-2 text-xs font-semibold text-[#FF6B4A]">
            {fieldErrors.image}
          </p>
        )}
      </div>

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
          className={fieldClass(!!fieldErrors.name, "focus:border-[#FF3B8D] focus:ring-[#FF3B8D]/20")}
        />
        {fieldErrors.name && (
          <p className="mt-2 text-xs font-semibold text-[#FF6B4A]">
            {fieldErrors.name}
          </p>
        )}
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
          className={fieldClass(!!fieldErrors.role, "focus:border-[#FFD83D] focus:ring-[#FFD83D]/30")}
        />
        {fieldErrors.role && (
          <p className="mt-2 text-xs font-semibold text-[#FF6B4A]">
            {fieldErrors.role}
          </p>
        )}
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
          className={fieldClass(!!fieldErrors.techStack, "focus:border-[#55D6FF] focus:ring-[#55D6FF]/30")}
        />
        {fieldErrors.techStack && (
          <p className="mt-2 text-xs font-semibold text-[#FF6B4A]">
            {fieldErrors.techStack}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="builder-title"
          className="mb-2 block text-xs font-black uppercase tracking-widest text-[#087F4F]"
        >
          Builder Title
        </label>
        <div className="flex gap-2">
          <select
            id="builder-title"
            value={builder?.title || ""}
            onChange={(e) =>
              setBuilder((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            className={fieldClass(!!fieldErrors.title, "focus:border-[#B7F000] focus:ring-[#B7F000]/30")}
          >
            {builderTitles.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={shuffleTitle}
            aria-label="Shuffle builder title"
            title="Shuffle builder title"
            className="sticker shrink-0 rounded-2xl bg-[#111111] px-4 text-lg text-[#B7F000] transition hover:-translate-y-0.5 active:translate-y-0"
          >
            🎲
          </button>
        </div>
        {fieldErrors.title && (
          <p className="mt-2 text-xs font-semibold text-[#FF6B4A]">
            {fieldErrors.title}
          </p>
        )}
      </div>
    </div>
  );
}