import * as Layout from "../components/Layout.tsx";
import { Head } from "$fresh/runtime.ts";
import Media from "../islands/Media.tsx";

export default function Videos() {
  return (
    <>
      <Head>
        <title>Videos</title>
      </Head>

      <Layout.Page
        footerProps={{
          authorProps: { link: "", name: "William Spongberg and Lucas" },
        }}
      >
        <Media />
      </Layout.Page>
    </>
  );
}
