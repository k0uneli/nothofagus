# nothofagus
Proof of concept vine clone with tiktok reccomendation system

## Specifications

- max 5000 (? subject to change) videos
- max 6 second mp4 video (4MB each, meaning only 20GB needed for 5000 vids)
- using open source tiktok algorithm <https://github.com/bytedance/monolith>
- using auth0 for users, with initial invite-only
- populate db at start with some random favourite tiktoks - limit to 6 seconds <https://chromewebstore.google.com/detail/myfavett-download-all-tik/gmajiifkcmjkehmngbopoobeplhoegad?hl=en>

## Architecture

- frontend/backend: Deno + Fresh
- user auth: auth0, store users in Deno KV
- database: SQL? store as JSON or CSV? what's easier to query videos for?
- titkok ml: Python, takes requests from backend
