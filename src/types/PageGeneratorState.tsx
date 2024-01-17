import { SelectOption } from '@norges-domstoler/dds-components';
import { PropsValue } from 'react-select';
import { CalendarDate } from '@internationalized/date';

export type PageGeneratorStateOptionTypes =
  | string
  | number
  | boolean
  | readonly string[]
  | undefined
  | CalendarDate
  | PropsValue<SelectOption<unknown>>;

export type PageGeneratorState<StateOptionTypes> = Record<
  string,
  StateOptionTypes
>;
