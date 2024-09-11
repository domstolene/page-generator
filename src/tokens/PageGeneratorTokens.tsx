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
    xs: ddsTokens.DdsSpacingX1,
    sm: ddsTokens.DdsSpacingX1,
    md: ddsTokens.DdsSpacingX1,
    lg: ddsTokens.DdsSpacingX1,
    xl: ddsTokens.DdsSpacingX15,
  },
};
