import { Handlers } from "$fresh/server.ts";
import {
  BLOCK_SIZE,
  NUM_BLOCKS_PER_REQ,
  VIDEO_BLOCK_SIZE,
  VIDEO_PATH,
} from "../../global/constants.ts";

function getVideoSrc(req: Request): string {
  try {
    let videoId = null;
    if (req.url.includes("video")) {
      videoId = req.url.split("video=")[1];
    } else {
      videoId = "test" + Math.floor(Math.random() * 5);
    }
    return `${VIDEO_PATH}${videoId}.mp4`;
  } catch (e) {
    console.error(e);
    throw new Error("Error getting video source!");
  }
}

async function getVideo(video_src: string) {
  try {
    return await Deno.open(video_src, { read: true });
  } catch (e) {
    console.error(e);
    throw new Error("Error opening video file!");
  }
}

async function getVideoSize(video_src: string) {
  try {
    const fileInfo = await Deno.stat(video_src);
    return fileInfo.size;
  } catch (e) {
    console.error(e);
    throw new Error("Error getting video size!");
  }
}

function streamVideo(video: Deno.FsFile): ReadableStream<Uint8Array> {
  let blocksRead = NUM_BLOCKS_PER_REQ;
  return new ReadableStream({
    async pull(controller) {
      if (blocksRead > 0) {
        const block = new Uint8Array(BLOCK_SIZE);
        try {
          const nread = await video.read(block);
          // no more data to read, close stream
          if (nread === null) {
            console.log("No more data to read, closing stream");
            controller.close();
            video.close();
            return;
          }

          // decrement blocks read and push data to stream
          blocksRead--;
          controller.enqueue(block.subarray(0, nread));
          console.log(`Read ${nread} bytes from video`);
        } catch (e) {
          console.error(e);
          controller.error(e);
          video.close();
          return;
        }
      } else {
        // out of blocks to read, close stream early
        console.error("Out of blocks to read, closing stream early");
        controller.close();
        video.close();
      }
    },
  });
}

export const handler: Handlers<unknown, unknown> = {
  async GET(req, _ctx) {
    // get video source
    const video_src = getVideoSrc(req);

    // grab video size
    let videoSize = 0;
    try {
      videoSize = await getVideoSize(video_src);
    } catch (e) {
      return new Response(String(e), { status: 500 });
    }

    // try to get range header
    const range = req.headers.get("range")?.split("=")[1];
    if (!range) {
      return new Response("No range found in header!", { status: 400 });
    }

    // get start + end of video
    const start = parseInt(range.split("-")[0]);
    const end = Math.min(start + VIDEO_BLOCK_SIZE, videoSize - 1);
    console.log(
      `start: ${start}, end: ${end}. video is ${videoSize / BLOCK_SIZE} MB`,
    );

    // check if range is valid
    if (start >= videoSize || end >= videoSize) {
      // can't provide resource, code 416
      console.error(
        `Invalid range: start: ${start}, end: ${end}, video size: ${videoSize}`,
      );
      return new Response("Invalid range!", { status: 416 });
    }

    // read video file
    const video = await getVideo(video_src);

    // skip to start of video
    if (start > 0) {
      await video.seek(start, Deno.SeekMode.Start);
    }

    // return partial video stream, code 206
    return new Response(streamVideo(video), {
      status: 206,
      headers: {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": `${end - start + 1}`,
        "Content-Type": "video/mp4",
      },
    });
  },
};
