import { Handlers } from "$fresh/server.ts";

const utagRegex = /utag.loader.*?,/;
const vtgRegex = /getVersion\(\)\{(.*?)\}/;

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

    const convivaVersion = await fetchConvivaFile(parsedResponse, fileURL);

    return {
      utagVersion,
      vtgVersion,
      convivaVersion,
    };
  } catch (error) {
    console.error(error);
  }
}

async function fetchConvivaFile(utagFileText: string, fileURL: string) {
  try {
    const scriptUtagVersion = utagFileText
      ?.split('"6":{')
      ?.pop()
      ?.split("v:")
      ?.pop()
      ?.split(",")[0];

    if (scriptUtagVersion) {
      const targetUrl = fileURL.replace(
        "/utag.js",
        `/utag.6.js?utv=ut4.48.${scriptUtagVersion}`
      );

      const rawResponse = await fetch(targetUrl);

      if (!rawResponse?.ok) {
        throw new Error("Error");
      }

      const parsedResponse = await rawResponse.text();

      const convivaVersion = parsedResponse?.match(
        /T\.version="([^"]*)",/
      )?.[1];

      return convivaVersion;
    }
  } catch (error) {
    console.error(error);
  }
}
