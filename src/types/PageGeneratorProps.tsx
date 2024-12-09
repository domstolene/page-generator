import { BaseComponentPropsWithChildren } from '@norges-domstoler/dds-components';
import { PageGeneratorField } from './PageGeneratorField';
import { PageGeneratorRow } from './PageGeneratorRow';
import {
  PageGeneratorSetState,
  PageGeneratorState,
} from './PageGeneratorState';
import { PageGeneratorFormData } from './PageGeneratorFormData';

export type PageGeneratorProps = BaseComponentPropsWithChildren<
  HTMLElement,
  {
    /** Definere liste med felt/komponenter og/eller rader med felt/komponenter */
    fields: (PageGeneratorField | PageGeneratorRow)[];
    /** For å hente ut formData etter endringer */
    formDataOnChange?: (formData: PageGeneratorFormData) => void;
    /** Setter form eller div på Grid-komponenten */
    as: 'div' | 'form';
    /** Sende inn state slik at verdier kan oppdateres. */
    state?: PageGeneratorState;
    /** Sende inn state slik at verdier kan oppdateres. */
    setState?: PageGeneratorSetState;
    /** Velge om man ønsker validering fra browser eller ikke. Bør kun brukes når `as` er satt til `form`. */
    noValidate?: boolean;
    /** Submit-metode som skal kalles onSubmit */
    onSubmit?: () => void;
  }
>;
