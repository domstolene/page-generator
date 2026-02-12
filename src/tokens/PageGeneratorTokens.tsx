import { ScreenSize } from '@norges-domstoler/dds-components';
import { ddsTokens } from '@norges-domstoler/dds-design-tokens';
import { PageGeneratorTokens as PageGeneratorTokensType } from '../types';

export const PageGeneratorTokens: PageGeneratorTokensType = {
  Stack: {
    [ScreenSize.XSmall]: 'x1',
    [ScreenSize.Small]: 'x1',
    [ScreenSize.Medium]: 'x1',
    [ScreenSize.Large]: 'x1',
    [ScreenSize.XLarge]: 'x1.5',
  },
  rowGaps: {
    xs: ddsTokens['core-light'].ddsSpacingX1,
    sm: ddsTokens['core-light'].ddsSpacingX1,
    md: ddsTokens['core-light'].ddsSpacingX1,
    lg: ddsTokens['core-light'].ddsSpacingX1,
    xl: ddsTokens['core-light'].ddsSpacingX15,
  },
};
