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

export default {
  title: "App/Navigation/PortablePageHeader",
  component: PortablePageHeader,
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
