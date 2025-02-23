import Button from "../components/Button.tsx";
import * as Layout from "../components/Layout.tsx";
import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Nothofagus</title>
      </Head>

      <Layout.Page>
        <Layout.Element>
          <Button href="/videos" text="Start Watching">
          </Button>
        </Layout.Element>
      </Layout.Page>
    </>
  );
}
