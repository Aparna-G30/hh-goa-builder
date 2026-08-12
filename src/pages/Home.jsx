import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import UploadSection from "../components/UploadSection";
import { builderTitles } from "../constants/titles";
import { builderStatuses } from "../constants/statuses";
import generateBuilderId from "../utils/generateBuilderId";

export default function Home() {
  const [builder, setBuilder] = useState({
  name: "",
  role: "",
  techStack: "",
  github: "",
  image: null,
  builderId: generateBuilderId(),

  title:
    builderTitles[Math.floor(Math.random() * builderTitles.length)],

  status:
    builderStatuses[Math.floor(Math.random() * builderStatuses.length)],
});

  return (
    <div className="min-h-screen bg-[#090909] text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6">
        <Hero />

        <UploadSection
          builder={builder}
          setBuilder={setBuilder}
        />
      </main>
    </div>
  );
}