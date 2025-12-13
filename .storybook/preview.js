/** @type { import('@storybook/nextjs-vite').Preview } */

import { Inter, Noto_Sans, Source_Code_Pro } from "next/font/google";
import "../app/globals.css";
import "./fonts.css";
import { sb } from "storybook/test";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import Decorator from "./decorator";
import { decoratorArgTypes } from "./decorator";

sb.mock("../app/_lib/app/use-app-state.js");
sb.mock("../app/_lib/tags/hooks/use-read-all-tags.js");
sb.mock("../app/_lib/notes/hooks/use-create-note.js");
sb.mock("../app/_lib/notes/hooks/use-delete-note.js");
sb.mock("../app/_lib/notes/hooks/use-update-note.js");
sb.mock("../app/_lib/notes/hooks/use-add-tag.js");
sb.mock("../app/_lib/notes/hooks/use-remove-tag.js");
sb.mock("../app/_lib/notes/hooks/use-restore-note.js");
sb.mock("../app/_lib/notes/hooks/use-archive-note.js");
sb.mock("../app/_lib/database/database.js");
sb.mock("../app/_lib/notes/all-notes-model.js");
sb.mock("../app/_lib/tags/all-tags-model.js");
sb.mock("../app/_lib/auth/user-model.js");
sb.mock("../app/_lib/auth/auth-actions");
sb.mock("bcrypt");

/*
Layout breakpoints:
- desktop: 1440 - 1024px x 900px
- tablet: 1023px - 576px x 1024px
- mobile: 575px - 375px x 812px 
*/
const customViewports = {
  mobile1: {
    name: "mobile",
    styles: {
      width: "375px",
      height: "812px",
    },
  },
  mobile2: {
    name: "mobile max",
    styles: {
      width: "575px",
      height: "812px",
    },
  },
  tablet1: {
    name: "tablet",
    styles: {
      width: "768px",
      height: "1024px",
    },
  },
  tablet2: {
    name: "tablet max",
    styles: {
      width: "1023px",
      height: "1024px",
    },
  },
  desktop: {
    name: "desktop",
    styles: {
      width: "1440px",
      height: "900px",
    },
  },
};

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

    viewport: {
      options: customViewports,
    },
  },

  decorators: [
    (Story, context) => Decorator(Story, context),
    (Story) => (
      <div
        style={{
          fontFamily: "var(--font-inter-sans-serif)",
        }}
      >
        <Story />
      </div>
    ),
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
  ],
  args: {},
  argTypes: { ...decoratorArgTypes },
};

export default preview;
