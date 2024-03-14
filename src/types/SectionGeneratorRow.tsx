import { BaseComponentPropsWithChildren } from '@norges-domstoler/dds-components';
import { PageGeneratorField } from './PageGeneratorField';

export type SectionGeneratorRow = BaseComponentPropsWithChildren<
  HTMLElement,
  {
    fields: PageGeneratorField[];
    hide?: boolean;
    as?: 'div' | 'fragment';
  }
>;
