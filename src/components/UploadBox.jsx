import { useDropzone } from "react-dropzone";

export default function UploadBox({ builder, setBuilder }) {
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file) return;

    setBuilder((prev) => ({
      ...prev,
      image: URL.createObjectURL(file),
    }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
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

        {builder?.image ? (
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
    </div>
  );
}
