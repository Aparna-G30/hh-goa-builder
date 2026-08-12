import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import UploadSection from "../components/UploadSection";
import { builderTitles } from "../constants/titles";
import { builderStatuses } from "../constants/statuses";
import generateBuilderId from "../utils/generateBuilderId";
import { createBuilderPass, BuilderApiError } from "../lib/builderApi";

function createInitialBuilder() {
  return {
    name: "",
    role: "",
    techStack: "",
    image: null,
    imageFile: null,
    builderId: generateBuilderId(),
    title: builderTitles[Math.floor(Math.random() * builderTitles.length)],
    status:
      builderStatuses[Math.floor(Math.random() * builderStatuses.length)],
  };
}

function validateBuilder(builder) {
  const errors = {};

  if (!builder.imageFile) errors.image = "Add a photo for your pass.";
  if (!builder.name?.trim()) errors.name = "Tell us your name.";
  if (!builder.role?.trim()) errors.role = "Add your role.";
  if (!builder.techStack?.trim()) errors.techStack = "Add your tech stack.";
  if (!builder.title?.trim()) errors.title = "Pick a builder title.";

  return errors;
}

export default function Builder() {
  const [builder, setBuilder] = useState(createInitialBuilder);
  const [fieldErrors, setFieldErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const passRef = useRef(null);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    setErrorMessage("");

    const errors = validateBuilder(builder);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setErrorMessage("Fill in the highlighted fields to generate your pass.");
      return;
    }

    setIsGenerating(true);

    try {
      const saved = await createBuilderPass({
        name: builder.name.trim(),
        role: builder.role.trim(),
        techStack: builder.techStack.trim(),
        title: builder.title.trim(),
        status: builder.status,
        photoFile: builder.imageFile,
      });

      navigate(`/pass/${saved.builder_id}`, { state: { justCreated: true } });
    } catch (err) {
      console.error("Failed to generate builder pass:", err);
      setErrorMessage(
        err instanceof BuilderApiError
          ? err.message
          : "Something went wrong generating your pass. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen grain-cream">
      <Navbar />

      <Hero />

      <UploadSection
        builder={builder}
        setBuilder={setBuilder}
        passRef={passRef}
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
        errorMessage={errorMessage}
        fieldErrors={fieldErrors}
      />
    </div>
  );
}