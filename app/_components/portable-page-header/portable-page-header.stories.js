import { fn } from "storybook/test";

import PortablePageHeader from "./portable-page-header";

const parentDesktop = {
  widthType: "fixed",
  fixedWidth: 768,
  heightType: "child",
};

const parentPortable = {
  widthType: "parent",
  parentHPadding: 0,
  heightType: "child",
  parentVPadding: 0,
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "App/Navigation/PortablePageHeader",
  component: PortablePageHeader,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    parent: {
      default: parentDesktop,
      mobile1: parentPortable,
      mobile2: parentPortable,
      tablet1: parentPortable,
      tablet2: parentPortable,
      desktop: parentDesktop,
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {};
