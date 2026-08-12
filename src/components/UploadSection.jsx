import BuilderForm from "./BuilderForm";
import BuilderCard from "./BuilderCard";

export default function UploadSection({
  builder,
  setBuilder,
  passRef,
  onGenerate,
  isGenerating,
  errorMessage,
  fieldErrors,
}) {
  return (
    <section className="grain-cream px-6 pb-24 pt-6 md:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="sticker rounded-[28px] border-4 border-[#063B2A] bg-[#FFF4D6] p-6 md:p-8 order-2 lg:order-1">
          <h2 className="font-display mb-6 text-2xl text-[#063B2A] md:text-3xl">
            BUILDER DETAILS
          </h2>

          <BuilderForm
            builder={builder}
            setBuilder={setBuilder}
            fieldErrors={fieldErrors}
          />

          {errorMessage && (
            <p className="mt-4 rounded-xl bg-[#FF6B4A]/10 px-4 py-3 text-sm font-semibold text-[#FF6B4A]">
              {errorMessage}
            </p>
          )}

          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="sticker mt-6 w-full rounded-full bg-[#FF3B8D] px-6 py-4 text-base font-black text-white transition hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:scale-100"
          >
            {isGenerating ? "GENERATING YOUR PASS..." : "GENERATE MY PASS →"}
          </button>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:sticky lg:top-10">
          <BuilderCard builder={builder} ref={passRef} />
        </div>
      </div>
    </section>
  );
}