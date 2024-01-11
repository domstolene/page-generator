import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/*.mdx'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-storysource'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => {
        if (
          prop.declarations === undefined ||
          prop.declarations === null ||
          prop.declarations.every(dec =>
            /node_modules\/@types\/react(-dom)?/.test(dec.fileName),
          )
        ) {
          return false;
        }

        return true;
      },
    },
  },
};

export default config;
