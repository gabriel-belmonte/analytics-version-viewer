import { asset } from "https://deno.land/x/fresh@1.1.4/runtime.ts";
import {
  getAnalyticsEnv,
  getFileUrl,
  getGithubUrl,
  getProvider,
} from "../helpers.ts";

const fileIcon = "/file-icon.svg";
const githubIcon = "/github-icon.svg";

export default function cardHeader({ fileURL }: { fileURL: string }) {
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
          src={asset(fileIcon)}
          alt="file"
          title="See source code"
        />
      </a>
    </div>
  );
}
