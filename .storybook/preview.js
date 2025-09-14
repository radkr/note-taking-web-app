/** @type { import('@storybook/nextjs-vite').Preview } */

import { Inter, Noto_Sans, Source_Code_Pro } from "next/font/google";
import "../app/globals.css";
import "./fonts.css";
import { sb } from "storybook/test";

sb.mock("../app/_lib/app/use-app-state.js");
//sb.mock("../app/_lib/tags/hooks/use-read-all-tags.js");

export const interSansSerif = Inter({
  variable: "--font-inter-sans-serif",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const sourceCodeProMono = Source_Code_Pro({
  variable: "--font-source-mono",
  subsets: ["latin"],
});

const preview = {
  parameters: {
    nextjs: { appDirectory: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },

  decorators: [
    (Story) => (
      <div
        style={{
          fontFamily: "var(--font-inter-sans-serif)",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;
