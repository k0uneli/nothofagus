# Nothofagus

Nothofagus is a proof-of-concept clone of Vine featuring a TikTok-inspired recommendation system, with unique [r/place](https://www.reddit.com/r/place/)-style user interaction.

## Specifications

- **Video Limit:** Up to 5000 videos (subject to change).
- **Video Duration:** Each MP4 video is limited to 6 seconds.
- **File Size:** Approximately 4MB per video, resulting in a maximum storage requirement of around 20GB for 5000 videos (stored in one big circular linked list!).
- **Users:** Users can only post one video per day. Can like unlimited(?) posts per day.
- **Reporting:** Videos will be deleted after 5 reports.
- **Recommendation Engine:** Utilizes the open source [TikTok algorithm](https://github.com/bytedance/monolith).

## Architecture

- **Frontend/Backend:** Built with Deno and the Fresh framework.
- **Deployment:** Deployed to Deno Deploy. Optionally, if want to scale, deploy in a Docker container to Google Cloud Run <https://docs.deno.com/examples/google_cloud_run_tutorial/>.
- **User Authentication:** Implemented via [GitHub OAuth Apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps). See [Deno KV OAuth](https://deno.land/x/deno_kv_oauth@v0.10.0). Note per user max 5000 requests per hour - unlikely to matter, only using to authenticate.
- **Databases:**
  - Users: Stored in KV. Storage and general usage handled entirely by [Deno KV OAuth](https://deno.land/x/deno_kv_oauth@v0.10.0).
  - Videos: Hosted in a filesystem either locally. Costs could become high due to large bandwidth, but total storage remains low. Can buy a cheap server to run this. Interact with using REST API (normal HTTP requests).
  - Video metadata: This will be a small file attached to each video that contains stats about each video e.g. number of likes, number of reports, user who posted, position in video array, etc. This is best stored in the Deno KV due to its small size and high bandwidth. Might need to turn this into a proper database for better use and querying by the recommendation system.
- **Machine Learning:** A Python service processes TikTok-style recommendations. This is intended to be run by some external server, but will likely be run locally until production is ready.

``` typescript
interface VideoData {
  id: string         // UUID attached to video
  userID: string     // user that published video
  published: Date    // date published, use Date object
  likes: number      // number of likes
  reports: number    // number of reports - once over 5, DELETE video
}
```

## Future Development + Scaling
- **Comments:** Add comments to videos. Again, limiting the number of comments somehow.
- **Compression:** Might be helpful for costs to compress/decompress information, especially videos, once a certain scale is hit. Not sure if worthwhile yet.
- **Payments:** Switch to Lemon Squeezy or Polar for payment systems if eventually plan to add paid tiers for e.g. being able to post more videos per day.
- **Captcha:** Currently making this invite-only, but will need some sort of captcha in the future to avoid bots.
- **User Authentication:** Not many people will have GitHub accounts - will need to add support for at minimum Google. Will also need to expire session tokens, etc (more security). Not sure if GitHub OAuth supports this.
- **Reporting:** Use some algorithm to balance users who report everything vs users who don't report anything (want to avoid people trolling and reporting every video). Videos getting deleted after 5 reports WILL be abused by a large user base.
- **Databases:** Should store user videos in some high-performance external server if enough traffic picks up, to allow streaming to users around the world.

## Developers

For a more detailed guide on using Fresh, please refer to the [Fresh Getting Started Guide](https://fresh.deno.dev/docs/getting-started).

### Prerequisites

Ensure that Deno is installed by following the instructions on the [Deno Getting Started Guide](https://deno.land/manual/getting_started/installation).

### Running the Project

To start the project with file watching enabled, execute the following command:

```bash
deno task start
```
