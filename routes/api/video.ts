import { Handlers } from "$fresh/server.ts";
import { VIDEO_SRC, NUM_BLOCKS_PER_REQ, BLOCK_SIZE, VIDEO_BLOCK_SIZE } from "../../global/constants.ts";

async function getVideoSize() {
  try {
    const fileInfo = await Deno.stat(VIDEO_SRC);
    return fileInfo.size;
  } catch (e) {
    console.error(e);
    throw new Error("Error getting video size!");
  }
}
 
export const handler: Handlers<null> = {
  async GET(req, _ctx) {
    console.log(req);
    console.log(req.headers.get("range"));

    // grab video size
    let videoSize = 0;
    try {
      videoSize = await getVideoSize();
    } catch (e) {
      return new Response(String(e), { status: 500 });
    }

    // try to get range header
    const range = req.headers.get("range")?.split("=")[1];
    if (!range) {
      return new Response("No range found in header!", { status: 400 });
    }

    const start = parseInt(range.split("-")[0]);
    const end = Math.min(start + VIDEO_BLOCK_SIZE, videoSize);

    console.log(`start: ${start}, end: ${end}`);

    const video = await Deno.readFile(VIDEO_SRC);
    return new Response(video, { status: 200 });
  }
};