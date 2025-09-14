/** @type { import('@storybook/nextjs-vite').StorybookConfig } */
import path from "path";

const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  logLevel: "debug",
  viteFinal: async (config) => {
    console.log("Running viteFinal");
    /*if (config.resolve) {
      const myPath = path.resolve(
        __dirname,
        "../app/_lib/tags/hooks/__mocks__/use-read-all-tags.vitest.js"
      );

      console.log("use-read-all-tags path: ", myPath);
      config.resolve.alias = {
        ...config.resolve?.alias,
        // 👇 Internal modules
        "@/app/_lib/tags/hooks/use-read-all-tags": myPath,
      };
    }*/

    const myPath = path.resolve(
      __dirname,
      "../app/_lib/tags/hooks/__mocks__/use-read-all-tags.vitest.js"
    );

    const { mergeConfig } = await import("vite");

    const newConfig = mergeConfig(config, {
      // Your environment configuration here
      resolve: {
        alias: {
          // 👇 Internal modules
          "../app/_lib/tags/hooks/use-read-all-tags.js": myPath,
        },
      },
    });

    console.log("config.resolve.alias: ", newConfig.resolve.alias);

    return newConfig;
  },
};
export default config;
