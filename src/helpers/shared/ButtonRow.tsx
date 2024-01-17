import {
  GridChild,
  HStack,
  ScreenSize,
  SelectOption,
} from '@norges-domstoler/dds-components';
import '../../styles/main.css';
import { PageGeneratorRow } from '../../types';
import { MultiValue, SingleValue } from 'react-select';
import { ChangeEvent } from 'react';
import { getComponent } from '..';
import { CalendarDate } from '@internationalized/date';

export const ButtonRow = (
  index: number,
  obj: PageGeneratorRow,
  fieldOnChange: (
    event: ChangeEvent<
      (HTMLInputElement | HTMLTextAreaElement) & Record<string, never>
    >,
  ) => void,
  selectOnChange: (
    chosen:
      | SingleValue<SelectOption<unknown>>
      | MultiValue<SelectOption<unknown>>,
    name: string,
  ) => void,
  datePickerOnChange: (value: CalendarDate, name: string) => void,
  screenSize: ScreenSize,
) => {
  return (
    <GridChild className="small-top-margin" columnsOccupied="all" key={index}>
      <HStack gap="x1" className="button-row">
        {obj.fields.map((field, groupedIndex) => {
          return (
            !field.hide &&
            getComponent(
              field,
              groupedIndex,
              fieldOnChange,
              selectOnChange,
              datePickerOnChange,
              screenSize,
            )
          );
        })}
      </HStack>
    </GridChild>
  );
};
