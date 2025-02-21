import * as Layout from "../components/Layout.tsx";
import { Head } from "$fresh/runtime.ts";
import Media from "../islands/Media.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Videos</title>
      </Head>

      <Layout.Page>
        <Layout.Element>
          <Media />
        </Layout.Element>
      </Layout.Page>
    </>
  );
}
