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

export default function Decorator(Story, { args, parameters, globals }) {
  const viewport = globals.viewport?.value || "default";
  const parent = parameters.parent?.[viewport];
  const widthType = args.widthType || parent?.widthType || "child";
  const fixedWidth = args.fixedWidth || parent?.fixedWidth || 100;
  const parentHPadding =
    (parent?.parentHPadding || 0) + (args.parentHPadding || 0);
  const heightType = args.heightType || parent?.heightType || "child";
  const fixedHeight = args.fixedHeight || parent?.fixedHeight || 100;
  const parentVPadding =
    (parent?.parentVPadding || 0) + (args.parentVPadding || 0);

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
      <div />
      <div />
      <div />
      <div />
      <Story />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}

export const decoratorArgTypes = {
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
};
