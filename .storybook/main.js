/** @type { import('@storybook/nextjs-vite').StorybookConfig } */
import svgr from "vite-plugin-svgr";

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
    {
      name: "@newhighsco/storybook-addon-svgr",
      options: {
        svgrOptions: {
          exportType: "default",
          ref: true,
          svgo: false,
          titleProp: true,
        },
        include: "**/*.svg",
      },
    },
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import("vite");
    console.log("viteFinal running...");

    const newConfig = mergeConfig(config, {
      plugins: [
        svgr({
          // svgr options: https://react-svgr.com/docs/options/
          svgrOptions: {
            exportType: "default",
            ref: true,
            svgo: false,
            titleProp: true,
          },
          include: "**/*.svg",
        }),
      ],
    });
    console.log("vite config: ", newConfig);
    return newConfig;
  },

  /*webpackFinal: async (config, { configType }) => {
    if (configType === "DEVELOPMENT") {
      // Modify config for development
    }
    if (configType === "PRODUCTION") {
      // Modify config for production
    }

    config.module.rules.push(
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        exclude: /node_modules/,
        include: /assets/,
        use: {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      }
    );

    return config;
  },
  */
};

export default config;
