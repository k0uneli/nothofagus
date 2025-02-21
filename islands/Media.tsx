export default function Media() {
  const src = "/api/video";

  return (
    <video class="max-w-md rounded-lg" controls autoPlay>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
