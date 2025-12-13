/** @type { import('@storybook/nextjs-vite').StorybookConfig } */

const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../app/_components/**/*.stories.@(js|jsx|ts|tsx)",
    "../app/_components/**/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
};

export default config;
