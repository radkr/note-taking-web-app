import { fn } from "storybook/test";

import PortablePageHeader from "./portable-page-header";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "App/Navigation/PortablePageHeader",
  component: PortablePageHeader,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  decorators: [
    (Story, { args }) => {
      const paddingLeft = Math.round(args.horizontalPadding / 2);
      const paddingRight = args.horizontalPadding - paddingLeft;
      const paddingTop = Math.round(args.verticalPadding / 2);
      const paddingBottom = args.verticalPadding - paddingTop;
      return (
        <div
          style={{
            display: "grid",
            width: "100vw",
            height: "100vh",
            gridTemplateRows: `${paddingTop}px 1fr ${paddingBottom}px`,
            gridTemplateColumns: `${paddingLeft}px 1fr ${paddingRight}px`,
          }}
        >
          <div style={{ backgroundColor: "#f7dfdc" }} />
          <div style={{ backgroundColor: "#f7dfdc" }} />
          <div style={{ backgroundColor: "#f7dfdc" }} />
          <div style={{ backgroundColor: "#f7dfdc" }} />
          <Story />
          <div style={{ backgroundColor: "#f7dfdc" }} />
          <div style={{ backgroundColor: "#f7dfdc" }} />
          <div style={{ backgroundColor: "#f7dfdc" }} />
          <div style={{ backgroundColor: "#f7dfdc" }} />
        </div>
      );
    },
  ],
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
    horizontalPadding: 0,
    verticalPadding: 0,
  },
  argTypes: {
    horizontalPadding: {
      control: {
        type: "range",
        min: 0,
        max: 1440,
        step: 1,
      },
    },
    verticalPadding: {
      control: {
        type: "range",
        min: 0,
        max: 1024,
        step: 1,
      },
    },
  },
};
