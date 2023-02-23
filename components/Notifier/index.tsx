import { useEffect } from 'preact/hooks';
import styles from './styles.module.css';
import { signal } from '@preact/signals';

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
    <div class={styles.notifier} style={{ opacity: shouldShow }}>
      You copied to clipboard
    </div>
  );
}
