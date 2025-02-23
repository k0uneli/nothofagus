import { useState } from "preact/hooks";
import Media from "../islands/Media.tsx";

export default function Feed() {
  const [videos, setVideos] = useState<number[]>([1]);
  const [videoIndex, setVideoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleWheel = (e: WheelEvent) => {
    // prevent normal scrolling
    e.preventDefault();

    // scroll video down
    if (e.deltaY > 0 && !isTransitioning) {
      setIsTransitioning(true);
      const newId = videos[videos.length - 1] + 1;
      setVideos([...videos, newId]);
      setVideoIndex(videoIndex + 1);

      // remove the old video after transition
      setTimeout(() => {
        setVideos((prev) => prev.slice(-1));
        setVideoIndex(0);
        setIsTransitioning(false);
      }, 500);
    }
  };

  return (
    <div
      onWheel={handleWheel}
      class="relative h-screen overflow-hidden overscroll-contain"
    >
      {videos.map((id, idx) => {
        const diff = idx - videoIndex;
        let translateClass = "";
        if (diff === 0) translateClass = "translate-y-0";
        else if (diff === -1) translateClass = "translate-y-[-100%]";

        return (
          <div
            key={id}
            class={`w-full h-full transition-transform duration-500 transform ${translateClass}`}
          >
            <Media/>
          </div>
        );
      })}
      
      {isTransitioning && (
        <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <svg class="animate-spin h-8 w-8 text-white" viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
              fill="none"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}