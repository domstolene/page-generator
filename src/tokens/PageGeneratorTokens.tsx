import { ScreenSize } from '@norges-domstoler/dds-components';
import { ddsBaseTokens } from '@norges-domstoler/dds-design-tokens';
import { PageGeneratorTokens as PageGeneratorTokensType } from '../types';

const { spacing: Spacing } = ddsBaseTokens;

export const PageGeneratorTokens: PageGeneratorTokensType = {
  Stack: {
    [ScreenSize.XSmall]: 'x1',
    [ScreenSize.Small]: 'x1',
    [ScreenSize.Medium]: 'x1',
    [ScreenSize.Large]: 'x1',
    [ScreenSize.XLarge]: 'x1.5',
  },
  rowGaps: {
    xs: Spacing.SizesDdsSpacingX1,
    sm: Spacing.SizesDdsSpacingX1,
    md: Spacing.SizesDdsSpacingX1,
    lg: Spacing.SizesDdsSpacingX1,
    xl: Spacing.SizesDdsSpacingX15,
  },
};
