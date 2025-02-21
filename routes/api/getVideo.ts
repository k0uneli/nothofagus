import { Handlers } from "$fresh/server.ts";
 
export const handler: Handlers<null> = {
  async GET(_req, _ctx) {
    const video = await Deno.readFile("static/videos/test.mp4");
    return new Response(video, { status: 200 });
  }
};