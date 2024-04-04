import {
  GridChild,
  ScreenSize,
  useScreenSize,
} from '@norges-domstoler/dds-components';
import { isPageGeneratorRow } from '../../helpers';
import { PageGeneratorField, PageGeneratorRow } from '../../types';
import { GenerateComponent } from './GenerateComponent';
import { GenerateRow } from './GenerateRow';
import { useContext } from 'react';
import {
  PageGeneratorContext,
  PageGeneratorContextModel,
} from '../PageGenerator/PageGeneratorContext';

export interface GenerateGridChildProperties {
  fieldOnChange: PageGeneratorContextModel['fieldOnChange'];
  selectOnChange: PageGeneratorContextModel['selectOnChange'];
  datePickerOnChange: PageGeneratorContextModel['datePickerOnChange'];
  onBlur: PageGeneratorContextModel['onBlur'];
  screenSize: ScreenSize;
}

export const GenerateGridChild = (
  obj: PageGeneratorField | PageGeneratorRow,
  index: number,
) => {
  const isRow = isPageGeneratorRow(obj);
  const { fieldOnChange, selectOnChange, datePickerOnChange, onBlur } =
    useContext(PageGeneratorContext);
  const screenSize = useScreenSize();

  const props: GenerateGridChildProperties = {
    fieldOnChange,
    selectOnChange,
    datePickerOnChange,
    onBlur,
    screenSize,
  };
  return (
    !obj.hide && (
      <GridChild columnsOccupied="all" key={index}>
        {isRow && GenerateRow(index, obj.fields, props)}
        {!isRow && GenerateComponent(index, obj, props)}
      </GridChild>
    )
  );
};
