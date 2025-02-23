import { useRef, useState } from "preact/hooks";
import * as Icons from "../components/Icons.tsx";

export default function Media() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const src = "/api/video";
  const [isPlaying, setIsPlaying] = useState(false);

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
    // TODO: copy video link to clipboard
    console.log("Video shared!");
  };

  const handleReport = (e: MouseEvent) => {
    e.stopPropagation();
    // TODO: send api POST call
    console.log("Video reported!");
  };

  return (
    <section class="relative inline-block">
      <button type="button" class="relative z-[1]" onClick={handleToggle}>
        <video ref={videoRef} autoPlay class="max-w-md rounded-lg">
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </button>

      <div class="absolute bottom-0 right-0 p-4 z-[2]">
        <div class="flex flex-col space-y-4">
          <button
            type="button"
            onClick={handleLike}
            class="px-4 py-2  text-white rounded"
          >
            <Icons.Like />
          </button>
          <button
            type="button"
            onClick={handleShare}
            class="px-4 py-2  text-white rounded"
          >
            <Icons.Share />
          </button>
          <button
            type="button"
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
