# Nothofagus

Nothofagus is a proof-of-concept clone of Vine featuring a TikTok-inspired recommendation system.

## Specifications

- **Video Limit:** Up to 5000 videos (subject to change).
- **Video Duration:** Each MP4 video is limited to 6 seconds.
- **File Size:** Approximately 4MB per video, resulting in a maximum storage requirement of around 20GB for 5000 videos.
- **Recommendation Engine:** Utilizes the open source [TikTok algorithm](https://github.com/bytedance/monolith).
- **User Authentication:** Powered by Auth0 with an initial invite-only system.
- **Database:** Options include SQL, JSON, or CSV. The choice will depend on the ease of querying video data.
- **Machine Learning:** A Python-based module handles TikTok-inspired machine learning requests from the backend.

## Architecture

- **Frontend/Backend:** Built with Deno and the Fresh framework.
- **Deployment:** Deployed to Deno Deploy. Optionally, if want to scale, deploy in Docker container to Google Cloud Run <https://docs.deno.com/examples/google_cloud_run_tutorial/>.
- **User Authentication:** Implemented via Github OAuth, with user data stored in Deno KV. See <https://deno.land/x/deno_kv_oauth@v0.10.0>.
- **Database:** Evaluating options for optimal video query performance.
- **Machine Learning:** A Python service processes TikTok-style recommendations.

## Getting Started

For a more detailed guide on using Fresh, please refer to the [Fresh Getting Started Guide](https://fresh.deno.dev/docs/getting-started).

### Prerequisites

Ensure that Deno is installed by following the instructions on the [Deno Getting Started Guide](https://deno.land/manual/getting_started/installation).

### Running the Project

To start the project with file watching enabled, execute the following command:

```bash
deno task start
```
