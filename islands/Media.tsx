import { useRef, useState } from "preact/hooks";
import * as Icons from "../components/Icons.tsx";

interface MediaProps {
  videoId?: string;
}

export default function Media({ videoId }: MediaProps) {
  // get video element
  const videoRef = useRef<HTMLVideoElement>(null);

  // set up states
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isReported, setIsReported] = useState(false);

  // set up video source
  if (!videoId) {
    videoId = "test" + Math.floor(Math.random() * 5);
  }
  const src = "/api/stream?video=" + videoId;

  // toggle video play/pause
  const handleToggle = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  // like video
  const handleLike = (e: MouseEvent) => {
    e.stopPropagation();
    if (isLiked) return;

    setIsLiked(true);
    // TODO: send api POST call
    console.log("Video liked!");
  };

  // copy URL to clipboard
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

  // report video
  const handleReport = (e: MouseEvent) => {
    e.stopPropagation();
    if (isReported) return;

    setIsReported(true);
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
