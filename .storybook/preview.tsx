import '@norges-domstoler/dds-components/index.css';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
};

export default preview;
