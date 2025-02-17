import * as Layout from "../components/Layout.tsx";
import * as Text from "../components/Text.tsx";
import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Videos</title>
      </Head>

      <Layout.Background>
        <Layout.Element>
          <Text.Title>
            Videos
          </Text.Title>
          <br />
        </Layout.Element>
      </Layout.Background>
    </>
  );
}
