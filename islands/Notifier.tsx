import { useEffect } from "preact/hooks";
import { signal } from "@preact/signals";

export const showNotifier = signal(false);

export default function Notifier() {
  const shouldShow = showNotifier.value ? 1 : 0;

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
      class="bg-green-600 text-white rounded-2xl p-4 absolute right-2.5 top-2.5 opacity-0 transition-opacity duration-1000"
      style={{ opacity: shouldShow }}
    >
      You copied to clipboard
    </div>
  );
}
