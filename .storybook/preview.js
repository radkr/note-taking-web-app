/** @type { import('@storybook/nextjs-vite').Preview } */

import { Inter, Noto_Sans, Source_Code_Pro } from "next/font/google";
import "../app/globals.css";
import "./fonts.css";
import { sb } from "storybook/test";

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

function getTemplate(size, fixedSize, padding) {
  let template;
  // The size is dynamicly adjusted to the child
  if (size == "child") {
    template = "1fr auto 1fr";
  }
  // The size is fixed
  if (size == "fixed") {
    template = `1fr ${fixedSize}px 1fr`;
  }
  // The size is dynamicly adjusted to the parent
  if (size == "parent") {
    const paddingBefore = Math.round(padding / 2);
    const paddingAfter = padding - paddingBefore;
    template = `${paddingBefore}px 1fr ${paddingAfter}px`;
  }
  return template;
}

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
    (Story, { args, parameters, globals }) => {
      const viewport = globals.viewport?.value || "default";
      const parent = parameters.parent[viewport];
      const widthType = args.widthType || parent?.widthType || "child";
      const fixedWidth = args.fixedWidth || parent?.fixedWidth || 100;
      const parentHPadding =
        (parent?.parentHPadding || 0) + (args.parentHPadding || 0);
      const heightType = args.heightType || parent?.heightType || "child";
      const fixedHeight = args.fixedHeight || parent?.fixedHeight || 100;
      const parentVPadding =
        (parent?.parentVPadding || 0) + (args.parentVPadding || 0);
      const paddingColor = args.paddingColor || "white";

      let cssGridTemplateColumns = getTemplate(
        widthType,
        fixedWidth,
        parentHPadding
      );
      let cssGridTemplateRows = getTemplate(
        heightType,
        fixedHeight,
        parentVPadding
      );
      let cssHeight = heightType == "parent" ? "100vh" : "auto";
      let cssPadding = heightType == "parent" ? "0" : "32px 0";
      return (
        <div
          style={{
            display: "grid",
            width: "100vw",
            height: cssHeight,
            margin: "auto",
            padding: cssPadding,
            gridTemplateRows: cssGridTemplateRows,
            gridTemplateColumns: cssGridTemplateColumns,
          }}
        >
          <div style={{ backgroundColor: paddingColor }} />
          <div style={{ backgroundColor: paddingColor }} />
          <div style={{ backgroundColor: paddingColor }} />
          <div style={{ backgroundColor: paddingColor }} />
          <Story />
          <div style={{ backgroundColor: paddingColor }} />
          <div style={{ backgroundColor: paddingColor }} />
          <div style={{ backgroundColor: paddingColor }} />
          <div style={{ backgroundColor: paddingColor }} />
        </div>
      );
    },
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
  args: {},
  argTypes: {
    widthType: {
      control: "select",
      options: ["child", "fixed", "parent"],
      if: { arg: "widthType", exists: true },
    },
    heightType: {
      control: "select",
      options: ["child", "fixed", "parent"],
      if: { arg: "heightType", exists: true },
    },
    parentHPadding: {
      control: {
        type: "range",
        min: 0,
        max: 1440,
        step: 1,
      },
      if: { arg: "parentHPadding", exists: true },
    },
    parentVPadding: {
      control: {
        type: "range",
        min: 0,
        max: 1024,
        step: 1,
      },
      if: { arg: "parentVPadding", exists: true },
    },
  },
};

export default preview;
