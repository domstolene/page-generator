import { SelectOption } from '@norges-domstoler/dds-components';
import { PropsValue } from 'react-select';
import { CalendarDate } from '@internationalized/date';
import { Dispatch, SetStateAction } from 'react';

export type PageGeneratorStateOptionTypes =
  | string
  | number
  | boolean
  | readonly string[]
  | undefined
  | CalendarDate
  | PropsValue<SelectOption<unknown>>;

export type PageGeneratorState = Record<string, PageGeneratorStateOptionTypes>;

export type PageGeneratorSetState = Dispatch<
  SetStateAction<PageGeneratorState>
>;
