import Button from "../components/Button.tsx";
import * as Layout from "../components/Layout.tsx";
import * as Text from "../components/Text.tsx";
import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Nothofagus</title>
      </Head>

      <Layout.Background disableFooter={true}>
        <Layout.Element>
          <Text.Title>
            Nothofagus
          </Text.Title>
          <br />
          <Button href="/videos" text="Start Watching">
          </Button>
        </Layout.Element>
      </Layout.Background>
    </>
  );
}
