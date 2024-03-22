import { ScreenSize, StackProps } from '@norges-domstoler/dds-components';

export interface PageGeneratorTokens {
  Stack: {
    [ScreenSize.XSmall]: StackProps['gap'];
    [ScreenSize.Small]: StackProps['gap'];
    [ScreenSize.Medium]: StackProps['gap'];
    [ScreenSize.Large]: StackProps['gap'];
    [ScreenSize.XLarge]: StackProps['gap'];
  };
  rowGaps: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}
