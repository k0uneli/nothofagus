import { useRef, useState } from "preact/hooks";
import * as Icons from "../components/Icons.tsx";

export default function Media() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const src = "/api/video";
  const [isPlaying, setIsPlaying] = useState(true);

  const handleToggle = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleLike = (e: MouseEvent) => {
    e.stopPropagation();
    // TODO: send api POST call
    console.log("Video liked!");
  };

  const handleShare = (e: MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(globalThis.location.href)
      .then(() => {
        console.log("URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy URL:", err);
      });
  };

  const handleReport = (e: MouseEvent) => {
    e.stopPropagation();
    // TODO: send api POST call
    console.log("Video reported!");
  };

  return (
    <section class="relative inline-block">
      <button type="button" class="relative z-[1]" onClick={handleToggle}>
        <video ref={videoRef} autoPlay loop class="max-w-md rounded-lg">
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </button>

      <div class="absolute bottom-0 right-0 p-4 z-[2]">
        <div class="flex flex-col space-y-4">
          <button
            type="button"
            title="Like"
            onClick={handleLike}
            class="px-4 py-2  text-white rounded"
          >
            <Icons.Like />
          </button>
          <button
            type="button"
            title="Share"
            onClick={handleShare}
            class="px-4 py-2  text-white rounded"
          >
            <Icons.Share />
          </button>
          <button
            type="button"
            title="Report"
            onClick={handleReport}
            class="px-4 py-2  text-white rounded"
          >
            <Icons.Report />
          </button>
        </div>
      </div>
    </section>
  );
}
