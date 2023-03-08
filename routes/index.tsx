import { Head } from "$fresh/runtime.ts";
import Notifier from "../islands/Notifier.tsx";
import CardGroup from "../components/CardGroup.tsx";
import Nav from "../components/Nav.tsx";
import { providerUrls } from "../helpers.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <main class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <Notifier />
        <Nav />
        {Object.entries(providerUrls).map((urlMapping) => (
          <CardGroup urlMapping={urlMapping} />
        ))}
      </main>
    </>
  );
}
