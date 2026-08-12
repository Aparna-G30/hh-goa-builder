import { useEffect, useRef, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import BuilderCard from "../components/BuilderCard";
import PassActions from "../components/PassActions";
import { getBuilderPass, BuilderApiError } from "../lib/builderApi";

function toCardBuilder(record) {
  if (!record) return null;
  return {
    name: record.name,
    role: record.role,
    techStack: record.tech_stack,
    title: record.title,
    status: record.status,
    image: record.image_url,
    builderId: record.builder_id,
  };
}

export default function SharedPass() {
  const { builderId } = useParams();
  const location = useLocation();
  const justCreated = Boolean(location.state?.justCreated);

  const [status, setStatus] = useState("loading"); // loading | ready | not-found | error
  const [builder, setBuilder] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const passRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");
      try {
        const record = await getBuilderPass(builderId);

        if (cancelled) return;

        if (!record) {
          setStatus("not-found");
          return;
        }

        setBuilder(toCardBuilder(record));
        setStatus("ready");
      } catch (err) {
        if (cancelled) return;
        console.error("Failed to load builder pass:", err);
        setErrorMessage(
          err instanceof BuilderApiError
            ? err.message
            : "Something went wrong loading this pass."
        );
        setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [builderId]);

  return (
    <div className="min-h-screen grain-cream">
      <Navbar />

      <section className="px-6 pb-24 pt-12 text-center md:px-12">
        {status === "loading" && (
          <p className="font-display text-2xl text-[#063B2A]">
            Loading pass...
          </p>
        )}

        {status === "not-found" && (
          <div className="mx-auto max-w-md">
            <p className="text-5xl">🌴</p>
            <h1 className="font-display mt-4 text-3xl text-[#063B2A]">
              PASS NOT FOUND
            </h1>
            <p className="mt-3 text-[#111111]/70">
              We couldn't find a Builder Pass with the ID{" "}
              <span className="font-mono font-bold">{builderId}</span>.
            </p>
            <Link
              to="/builder"
              className="sticker mt-8 inline-block rounded-full bg-[#B7F000] px-6 py-3.5 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 hover:scale-105"
            >
              BUILD YOUR OWN PASS →
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="mx-auto max-w-md">
            <h1 className="font-display text-3xl text-[#063B2A]">
              SOMETHING WENT WRONG
            </h1>
            <p className="mt-3 text-[#111111]/70">{errorMessage}</p>
          </div>
        )}

        {status === "ready" && builder && (
          <div className="mx-auto max-w-lg">
            <h1 className="font-display text-3xl text-[#063B2A] sm:text-4xl">
              {justCreated ? "YOUR BUILDER PASS IS READY." : "BUILDER PASS"}
            </h1>

            <div className="mt-10 flex justify-center">
              <BuilderCard builder={builder} ref={passRef} />
            </div>

            <div className="mt-10">
              <PassActions passRef={passRef} builder={builder} />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}