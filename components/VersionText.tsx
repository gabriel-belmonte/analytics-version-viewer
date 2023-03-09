import type { JSXInternal } from "https://esm.sh/v107/preact@10.11.0/src/jsx";
import { showNotifier } from "../islands/Notifier.tsx";

const onClick = (ev: JSXInternal.TargetedMouseEvent<HTMLButtonElement>) => {
  const info = ev?.target?.textContent;
  navigator.clipboard.writeText(info);
  showNotifier.value = true;
};

export default function VersionText({ text }: { text: string }) {
  return (
    <button
      class="inline-flex items-center w-48 bg-green-900 text-green-300 text-base font-medium px-2.5 py-0.5 rounded-full cursor-pointer hover:bg-green-800 focus:outline-none"
      onClick={onClick}
    >
      <span class="relative flex h-2 w-2  mr-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75">
        </span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500">
        </span>
      </span>
      {text}
    </button>
  );
}
