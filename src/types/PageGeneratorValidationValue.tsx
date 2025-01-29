import { PageGeneratorSelectOption } from './PageGeneratorSelectOption';
import { CalendarDate } from '@internationalized/date';

export type PageGeneratorValidationValue = string &
  PageGeneratorSelectOption &
  CalendarDate;
