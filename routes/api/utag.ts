import { Handlers } from "$fresh/server.ts";

const utagRegex = /utag.loader.*?,/g;
const vtgRegex = /getVersion\(\)\{(.*?)\}/g;

export const handler: Handlers = {
  async GET(req: Request) {
    try {
      const params = new URLSearchParams(
        new URL(decodeURIComponent(req.url)).search
      );

      const provider = params.get("provider");
      const env = params.get("env");
      const targetUrl = `https://tags.tiqcdn.com/utag/cbsi/pplusintl-${provider}/${env}/utag.js`;

      if (provider && env) {
        const response = await fetchFile(targetUrl);
        return new Response(JSON.stringify(response), {
          headers: { "Content-Type": "application/json" },
        });
      }

      throw new Error("Error");
    } catch (error) {
      return new Response(JSON.stringify({ error: true, message: error }), {
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};

async function fetchFile(fileURL: string) {
  try {
    const response = await fetch(fileURL);

    if (!response?.ok) {
      throw new Error("Error");
    }
    const parsedResponse = await response.text();

    const utagVersion = parsedResponse
      ?.match(utagRegex)?.[0]
      .split(" ")
      .pop()
      ?.replace(",", "");

    const vtgVersion = parsedResponse
      ?.match(vtgRegex)?.[0]
      .split('return"')
      .pop()
      ?.slice(0, -2);

    return {
      utagVersion,
      vtgVersion,
    };
  } catch (error) {
    console.error(error);
  }
}
