import { useEffect } from "preact/hooks";
import { signal } from "@preact/signals";

export const showNotifier = signal(false);

export default function Notifier() {
  const shouldShow = showNotifier.value ? 100 : 0;

  useEffect(() => {
    if (shouldShow) {
      const fadeOut = setTimeout(() => {
        showNotifier.value = false;
      }, 5000);

      return () => clearTimeout(fadeOut);
    }
  }, [shouldShow]);

  return (
    <div
      class={`bg-green-600 w-auto inline-block text-white rounded-2xl p-4 fixed right-2.5 top-2.5 opacity-${shouldShow} transition-opacity duration-1000`}
    >
      You copied to clipboard
    </div>
  );
}
