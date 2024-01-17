import { ScreenSize } from '@norges-domstoler/dds-components';
import { ddsBaseTokens } from '@norges-domstoler/dds-design-tokens';

const { spacing: Spacing } = ddsBaseTokens;

export const PageGeneratorTokens = {
  columnGaps: {
    [ScreenSize.XSmall]: Spacing.SizesDdsSpacingX1,
    [ScreenSize.Small]: Spacing.SizesDdsSpacingX1,
    [ScreenSize.Medium]: Spacing.SizesDdsSpacingX1,
    [ScreenSize.Large]: Spacing.SizesDdsSpacingX1,
    [ScreenSize.XLarge]: Spacing.SizesDdsSpacingX15,
  },
  rowGaps: {
    xs: Spacing.SizesDdsSpacingX1,
    sm: Spacing.SizesDdsSpacingX1,
    md: Spacing.SizesDdsSpacingX1,
    lg: Spacing.SizesDdsSpacingX1,
    xl: Spacing.SizesDdsSpacingX15,
  },
};
