import { BaseComponentPropsWithChildren } from '@norges-domstoler/dds-components';
import { PageGeneratorField } from './PageGeneratorField';
import { SectionGeneratorRow } from './SectionGeneratorRow';
import {
  PageGeneratorSetState,
  PageGeneratorState,
} from './PageGeneratorState';
import { PageGeneratorFormData } from './PageGeneratorFormData';

export type SectionGeneratorProps = BaseComponentPropsWithChildren<
  HTMLElement,
  {
    /** Definere liste med felt/komponenter og/eller rader med felt/komponenter */
    fields: (PageGeneratorField | SectionGeneratorRow)[];
    /** For å hente ut formData etter endringer */
    formDataOnChange?: (formData: PageGeneratorFormData) => void;
    /** Setter form, div eller fragment som wrapper-element */
    as: 'div' | 'form' | 'fragment';
    /** Sende inn state slik at verdier kan oppdateres. */
    state?: PageGeneratorState;
    /** Sende inn state slik at verdier kan oppdateres. */
    setState?: PageGeneratorSetState;
  }
>;
