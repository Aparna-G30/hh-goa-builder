import { useState } from "react";
import { toPng } from "html-to-image";

function slugify(name) {
  return (name || "builder")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function PassActions({ passRef, builder }) {
  const [copyState, setCopyState] = useState("idle"); // idle | copied | error
  const [downloadState, setDownloadState] = useState("idle"); // idle | downloading | error

  const shareUrl = `${window.location.origin}/pass/${builder?.builderId || ""}`;

  const handleDownload = async () => {
    if (!passRef?.current) return;

    setDownloadState("downloading");
    try {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      const dataUrl = await toPng(passRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      });
      
      const link = document.createElement("a");
      const filename = builder?.name
        ? `frameingoa-${slugify(builder.name)}.png`
        : `builder-pass-${builder?.builderId || "pass"}.png`;

      link.href = dataUrl;
      link.download = filename;
      link.click();
      setDownloadState("idle");
    } catch (err) {
      console.error("Download failed:", err);
      setDownloadState("error");
      setTimeout(() => setDownloadState("idle"), 2500);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyState("copied");
    } catch (err) {
      console.error("Clipboard write failed:", err);
      setCopyState("error");
    }
    setTimeout(() => setCopyState("idle"), 2000);
  };

  const handleShareOnX = () => {
    const text = `I just built my Hacker House Goa Builder identity \u26a1\n\nMeet me at Hacker House Goa.\n\n${shareUrl}\n\n#FrameInGoa`;
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}`;
    window.open(intentUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <button
        onClick={handleDownload}
        disabled={downloadState === "downloading"}
        className="sticker w-full rounded-full bg-[#FFD83D] px-6 py-3.5 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 disabled:opacity-60 sm:w-auto"
      >
        {downloadState === "downloading"
          ? "PREPARING..."
          : downloadState === "error"
          ? "TRY AGAIN"
          : "DOWNLOAD PASS"}
      </button>

      <button
        onClick={handleCopyLink}
        className="sticker w-full rounded-full bg-[#55D6FF] px-6 py-3.5 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 sm:w-auto"
      >
        {copyState === "copied"
          ? "COPIED!"
          : copyState === "error"
          ? "COPY FAILED"
          : "COPY SHARE LINK"}
      </button>

      <button
        onClick={handleShareOnX}
        className="sticker w-full rounded-full bg-[#111111] px-6 py-3.5 text-sm font-black text-[#B7F000] transition hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 sm:w-auto"
      >
        SHARE ON X
      </button>
    </div>
  );
}