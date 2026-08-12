import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import UploadSection from "../components/UploadSection";
import { builderTitles } from "../constants/titles";
import { builderStatuses } from "../constants/statuses";
import generateBuilderId from "../utils/generateBuilderId";

function createInitialBuilder() {
  return {
    name: "",
    role: "",
    techStack: "",
    image: null,
    builderId: generateBuilderId(),
    title: builderTitles[Math.floor(Math.random() * builderTitles.length)],
    status:
      builderStatuses[Math.floor(Math.random() * builderStatuses.length)],
  };
}

export default function Builder() {
  const [builder, setBuilder] = useState(createInitialBuilder);

  return (
    <div className="min-h-screen grain-cream">
      <Navbar />

      <Hero />

      <UploadSection builder={builder} setBuilder={setBuilder} />
    </div>
  );
}
