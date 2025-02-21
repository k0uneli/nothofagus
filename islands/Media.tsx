
export default function Media() {
  const src = "/api/video";

  return (
    <video width="480" height="720" controls>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
