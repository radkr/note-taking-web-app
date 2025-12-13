import InfoBox from "./info-box";

export default {
  title: "Common/InfoBox",
  component: InfoBox,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export const Default = {
  args: {
    children: (
      <p className="text-preset-5 text-color-neutral-950">
        No notes have been archived yet. Move notes here for safekeeping, or{" "}
        <a href="#">create a new note</a>.
      </p>
    ),
    widthType: "child",
    heightType: "child",
  },
};
