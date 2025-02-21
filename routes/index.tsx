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

      <Layout.Page
        footerProps={{
          disableButton: true,
          authorProps: { link: "", name: "William Spongberg and Lucas" },
        }}
      >
        <Layout.Element>
          <Text.Title>
            Nothofagus
          </Text.Title>
          <br />
          <Button href="/videos" text="Start Watching">
          </Button>
        </Layout.Element>
      </Layout.Page>
    </>
  );
}
