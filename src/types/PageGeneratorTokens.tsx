import { ScreenSize, HStackProps } from '@norges-domstoler/dds-components';

export interface PageGeneratorTokens {
  Stack: {
    [ScreenSize.XSmall]: HStackProps['gap'];
    [ScreenSize.Small]: HStackProps['gap'];
    [ScreenSize.Medium]: HStackProps['gap'];
    [ScreenSize.Large]: HStackProps['gap'];
    [ScreenSize.XLarge]: HStackProps['gap'];
  };
  rowGaps: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}
