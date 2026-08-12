import BuilderForm from "./BuilderForm";
import BuilderCard from "./BuilderCard";

export default function UploadSection({ builder, setBuilder }) {
  return (
    <section className="grain-cream px-6 pb-24 pt-6 md:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="sticker rounded-[28px] border-4 border-[#063B2A] bg-[#FFF4D6] p-6 md:p-8 order-2 lg:order-1">
          <h2 className="font-display mb-6 text-2xl text-[#063B2A] md:text-3xl">
            BUILDER DETAILS
          </h2>

          <BuilderForm builder={builder} setBuilder={setBuilder} />
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:sticky lg:top-10">
          <BuilderCard builder={builder} />
        </div>
      </div>
    </section>
  );
}
