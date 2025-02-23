import * as Layout from "../components/Layout.tsx";
import { Head } from "$fresh/runtime.ts";
import Media from "../islands/Media.tsx";

export default function Videos() {
  return (
    <>
      <Head>
        <title>Videos</title>
      </Head>

      <Layout.Page>
        <Media />
      </Layout.Page>
    </>
  );
}
