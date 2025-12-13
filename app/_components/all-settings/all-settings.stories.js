import AllSettings from "./all-settings";

const parentDesktop = {
  widthType: "fixed",
  fixedWidth: 290,
  heightType: "parent",
  parentVPadding: 0,
};

const parentPortable = {
  widthType: "parent",
  parentHPadding: 0,
  heightType: "parent",
  parentVPadding: 0,
};

export default {
  title: "App/AllSettings",
  component: AllSettings,
  parameters: {
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

export const Default = {};
