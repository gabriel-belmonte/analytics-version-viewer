import { useEffect, useRef, useState } from "preact/hooks";
import {
  getAnalyticsEnv,
  getFileUrl,
  getGithubUrl,
  getProvider,
  utagRegex,
  utf8Decoder,
  vtgRegex,
} from "../helpers.ts";
import { showNotifier } from "./Notifier.tsx";
import Error from "../components/Error.tsx";
import Loading from "./Loading.tsx";
import { asset } from "$fresh/runtime.ts";

const fileIcon = "/file-icon.svg";
const githubIcon = "/github-icon.svg";

export default function Card({ fileURL }: { fileURL: string }) {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [utagVersion, setUtagVersion] = useState("Not found");
  const [vtgVersion, setVtgVersion] = useState("Not found");

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(fileURL);
        if (!response.ok) {
          throw Error();
        }
        const parsedResponse = await response.json();

        setUtagVersion(parsedResponse?.utagVersion);
        setVtgVersion(parsedResponse?.vtgVersion);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFile();
  }, []);

  const onClick = (ev: any) => {
    navigator.clipboard.writeText(ev?.target?.innerHTML);
    showNotifier.value = true;
  };

  const textHandler = (versionText: string) => {
    if (isError) {
      return <Error />;
    } else if (isLoading) {
      return <Loading />;
    } else {
      return (
        <button
          class="inline-flex items-center w-48 bg-green-900 text-green-300 text-base font-medium px-2.5 py-0.5 rounded-full cursor-pointer hover:bg-green-800"
          onClick={onClick}
        >
          <span class="w-2 h-2 mr-2 bg-green-500 rounded-full" />

          {versionText}
        </button>
      );
    }
  };

  const cardHeader = () => {
    return (
      <div class="flex items-center justify-between">
        <a href={getGithubUrl(getProvider(fileURL))} target="_blank">
          <img
            class="hover:scale-110 transition-transform h-10"
            src={asset(githubIcon)}
            alt="github"
            title="Go to Github source code page"
          />
        </a>

        <h5 class="text-2xl font-bold text-white">
          {getAnalyticsEnv(fileURL)}
        </h5>

        <a
          href={getFileUrl(getProvider(fileURL), getAnalyticsEnv(fileURL))}
          target="_blank"
        >
          <img
            class="hover:scale-110 transition-transform h-10"
            src={fileIcon}
            alt="file"
            title="See source code"
          />
        </a>
      </div>
    );
  };

  const cardBody = () => {
    return (
      <>
        <div class="flex items-center justify-between p-2">
          <span class="bg-blue-900 text-blue-200 text-base font-medium mr-2 px-2.5 py-0.5 rounded -rotate-12">
            UTAG
          </span>
          {textHandler(utagVersion)}
        </div>

        <div class="flex items-center justify-between p-2">
          <span class="bg-indigo-900 text-indigo-200 text-base font-medium mr-2 px-2.5 py-0.5 rounded -rotate-12">
            VTG
          </span>
          {textHandler(vtgVersion)}
        </div>
      </>
    );
  };

  return (
    <div class="block max-w-sm p-6 m-2 border border-gray-800 bg-gray-800 rounded-lg shadow-md">
      {cardHeader()}
      <hr class="h-px my-8 bg-gray-700 border-0" />
      <div class="flex flex-col text-lg">{cardBody()}</div>
    </div>
  );
}
