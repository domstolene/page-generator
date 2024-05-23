import { BaseComponentPropsWithChildren } from '@norges-domstoler/dds-components';
import { PageGeneratorField } from './PageGeneratorField';
import { SectionGeneratorRow } from './SectionGeneratorRow';
import { PageGeneratorErrors } from './PageGeneratorErrors';

export type SectionGeneratorProps = BaseComponentPropsWithChildren<
  HTMLElement,
  {
    /** Definere liste med felt/komponenter og/eller rader med felt/komponenter */
    fields: (PageGeneratorField | SectionGeneratorRow)[];
    /** For å hente ut eventuelle errors etter endringer */
    errorsOnChange?: (errors: PageGeneratorErrors) => void;
    /** Setter form, div eller fragment som wrapper-element */
    as: 'div' | 'form' | 'fragment';
  }
>;
