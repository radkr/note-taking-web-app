import { fn } from "storybook/test";

import Textinput from "./text-input";
import { IconSearch } from "@/app/_components/icons";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Common/Fields/Textinput",
  component: Textinput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
    Icon: IconSearch,
    label: "Label",
    ariaLabel: "ariaLabel",
    id: "inputId",
    name: "inputName",
    placeholder: "Placeholder",
    hint: "This is a hint",
    type: "text",
    disabled: false,
    error: "",
    onFocus: fn(),
    onBlur: fn(),
    widthType: "child",
    heightType: "child",
  },
};

export const Search = {
  args: {
    Icon: IconSearch,
    ariaLabel: "ariaLabel",
    id: "inputId",
    name: "inputName",
    placeholder: "Search by title or content...",
    type: "text",
    disabled: false,
    error: "",
    onFocus: fn(),
    onBlur: fn(),
  },
};

export const Email = {
  args: {
    label: "Email Address",
    ariaLabel: "ariaLabel",
    id: "email",
    name: "email",
    placeholder: "email@example.com",
    type: "email",
    disabled: false,
    error: "",
    onFocus: fn(),
    onBlur: fn(),
  },
};

export const EmailInvalid = {
  args: {
    label: "Email Address",
    ariaLabel: "ariaLabel",
    id: "email",
    name: "email",
    placeholder: "email@example.com",
    type: "email",
    disabled: false,
    error: "Please enter a valid email address",
    onFocus: fn(),
    onBlur: fn(),
  },
};

export const EmailDisabled = {
  args: {
    label: "Email Address",
    ariaLabel: "ariaLabel",
    id: "email",
    name: "email",
    placeholder: "email@example.com",
    type: "email",
    disabled: true,
    error: "",
    onFocus: fn(),
    onBlur: fn(),
  },
};

export const Password = {
  args: {
    label: "Password",
    ariaLabel: "ariaLabel",
    id: "inputId",
    name: "password",
    hint: "At least 8 characters",
    type: "password",
    disabled: false,
    error: "",
    onFocus: fn(),
    onBlur: fn(),
  },
};
