import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  plugins: {
    "scrollbar-hide": {
      /* IE and Edge */
      "-ms-overflow-style": "none",

      /* Firefox */
      "scrollbar-width": "none",

      /* Safari and Chrome */
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  },
} as Options;
