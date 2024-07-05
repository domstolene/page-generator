import { ScreenSize } from '@norges-domstoler/dds-components';
import { ddsBaseTokens } from '@norges-domstoler/dds-design-tokens';
import { PageGeneratorTokens as PageGeneratorTokensType } from '../types';

const { spacing } = ddsBaseTokens;

export const PageGeneratorTokens: PageGeneratorTokensType = {
  Stack: {
    [ScreenSize.XSmall]: 'x1',
    [ScreenSize.Small]: 'x1',
    [ScreenSize.Medium]: 'x1',
    [ScreenSize.Large]: 'x1',
    [ScreenSize.XLarge]: 'x1.5',
  },
  rowGaps: {
    xs: spacing.DdsSpacingX1,
    sm: spacing.DdsSpacingX1,
    md: spacing.DdsSpacingX1,
    lg: spacing.DdsSpacingX1,
    xl: spacing.DdsSpacingX15,
  },
};
