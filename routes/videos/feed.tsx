import * as Layout from "../../components/Layout.tsx";
import { Head } from "$fresh/runtime.ts";
import Feed from "../../islands/Feed.tsx";

export default function VideoFeed() {
  return (
    <>
      <Head>
        <title>Feed</title>
      </Head>

      <Layout.Page>
        <Feed />
      </Layout.Page>
    </>
  );
}
