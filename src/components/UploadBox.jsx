import { useState } from "react";
import { useDropzone } from "react-dropzone";

function isHeic(file) {
  const type = file?.type?.toLowerCase() || "";
  const name = file?.name?.toLowerCase() || "";
  return (
    type === "image/heic" ||
    type === "image/heif" ||
    name.endsWith(".heic") ||
    name.endsWith(".heif")
  );
}

export default function UploadBox({ builder, setBuilder }) {
  const [uploadError, setUploadError] = useState("");
  const [isConverting, setIsConverting] = useState(false);

  const onDrop = async (acceptedFiles, fileRejections) => {
    setUploadError("");

    if (fileRejections?.length) {
      setUploadError("That file type isn't supported. Please use JPG, PNG, or HEIC.");
      return;
    }

    const file = acceptedFiles[0];
    if (!file) return;

    if (isHeic(file)) {
      setIsConverting(true);
      try {
        const heic2any = (await import("heic2any")).default;
        const converted = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.9,
        });

        const jpegBlob = Array.isArray(converted) ? converted[0] : converted;
        const jpegFile = new File(
          [jpegBlob],
          file.name.replace(/\.(heic|heif)$/i, ".jpg"),
          { type: "image/jpeg" }
        );

        setBuilder((prev) => ({
          ...prev,
          image: URL.createObjectURL(jpegFile),
          imageFile: jpegFile,
        }));
      } catch (err) {
        console.error("HEIC conversion failed:", err);
        setUploadError(
          "We couldn't convert that HEIC photo. Please try a JPG or PNG instead."
        );
      } finally {
        setIsConverting(false);
      }
      return;
    }

    setBuilder((prev) => ({
      ...prev,
      image: URL.createObjectURL(file),
      imageFile: file,
    }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/heic": [],
      "image/heif": [],
    },
    multiple: false,
    onDrop,
  });

  return (
    <div>
      <label className="mb-2 block text-xs font-black uppercase tracking-widest text-[#087F4F]">
        Builder Photo
      </label>

      <div
        {...getRootProps()}
        role="button"
        aria-label="Upload your builder photo"
        className={`flex h-56 cursor-pointer flex-col items-center justify-center rounded-3xl border-[3px] border-dashed p-6 text-center transition
        ${
          isDragActive
            ? "border-[#FF3B8D] bg-[#FF3B8D]/10"
            : "border-[#087F4F]/50 bg-[#FFF4D6] hover:border-[#FFD83D] hover:bg-[#FFD83D]/10"
        }`}
      >
        <input {...getInputProps()} aria-label="Builder photo file input" />

        {isConverting ? (
          <>
            <p className="text-5xl">🔄</p>
            <h3 className="font-display mt-3 text-base text-[#063B2A]">
              CONVERTING YOUR PHOTO...
            </h3>
          </>
        ) : builder?.image ? (
          <img
            src={builder.image}
            alt="Your uploaded builder photo"
            className="h-full w-full rounded-2xl object-cover shadow-lg"
          />
        ) : (
          <>
            <p className="text-5xl">📸</p>
            <h3 className="font-display mt-3 text-base text-[#063B2A]">
              DROP YOUR BUILDER PHOTO
            </h3>
            <p className="mt-1 text-sm text-[#111111]/60">
              drag &amp; drop or click to browse
            </p>
            <p className="mt-2 text-[11px] font-bold tracking-widest text-[#087F4F]">
              JPG • PNG • HEIC
            </p>
          </>
        )}
      </div>

      {uploadError && (
        <p className="mt-2 text-xs font-semibold text-[#FF6B4A]">
          {uploadError}
        </p>
      )}
    </div>
  );
}