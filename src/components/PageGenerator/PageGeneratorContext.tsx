import { ChangeEvent, FocusEvent, createContext } from 'react';
import { PageGeneratorProps } from '../../types/PageGeneratorProps';
import { SelectOption } from '@norges-domstoler/dds-components';
import { SingleValue, MultiValue } from 'react-select';
import { CalendarDate } from '@internationalized/date';
import { PageGeneratorErrorMessages } from '../../types';

export interface PageGeneratorContextModel {
  fields: PageGeneratorProps['fields'];
  state?: PageGeneratorProps['state'];
  fieldOnChange: <T extends HTMLInputElement | HTMLTextAreaElement>(
    event: ChangeEvent<T>,
  ) => void;
  selectOnChange: (
    chosen:
      | SingleValue<SelectOption<unknown>>
      | MultiValue<SelectOption<unknown>>,
    name: string,
  ) => void;
  datePickerOnChange: (value: CalendarDate, name: string) => void;
  onBlur: <T extends HTMLInputElement | HTMLTextAreaElement>(
    event: FocusEvent<T>,
  ) => void;
  onBlurSelect: (name: string) => void;
  errorMessages: PageGeneratorErrorMessages;
}

export const PageGeneratorContext = createContext<PageGeneratorContextModel>({
  fields: [],
  state: {},
  fieldOnChange: () => {},
  selectOnChange: () => {},
  datePickerOnChange: () => {},
  onBlur: () => {},
  onBlurSelect: () => {},
  errorMessages: {},
});
