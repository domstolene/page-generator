import { SelectOption } from '@norges-domstoler/dds-components';
import { SingleValue, MultiValue } from 'react-select';

export type PageGeneratorSelectOption =
  | SingleValue<SelectOption<unknown>>
  | MultiValue<SelectOption<unknown>>;
