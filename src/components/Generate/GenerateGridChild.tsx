import {
  GridChild,
  ScreenSize,
  useScreenSize,
} from '@norges-domstoler/dds-components';
import { isFieldWithValidations, isPageGeneratorRow } from '../../helpers';
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
  onBlurSelect: PageGeneratorContextModel['onBlurSelect'];
  screenSize: ScreenSize;
}

interface GenerateGridChildProps {
  obj: PageGeneratorField | PageGeneratorRow;
  index: number;
}

export const GenerateGridChild = (props: GenerateGridChildProps) => {
  const isRow = isPageGeneratorRow(props.obj);
  const {
    fieldOnChange,
    selectOnChange,
    datePickerOnChange,
    onBlur,
    onBlurSelect,
    errorMessages,
  } = useContext(PageGeneratorContext);
  const screenSize = useScreenSize();
  const { obj, index } = props;

  const gridChildProps: GenerateGridChildProperties = {
    fieldOnChange,
    selectOnChange,
    datePickerOnChange,
    onBlur,
    onBlurSelect,
    screenSize,
  };
  if (isFieldWithValidations(obj) && obj.props.name) {
    obj.props = {
      ...obj.props,
      errorMessage: errorMessages[obj.props.name],
    };
  }
  return (
    !obj.hide && (
      <GridChild columnsOccupied="all" key={index}>
        {isRow && (
          <GenerateRow
            index={index}
            fields={(obj as PageGeneratorRow).fields}
            gridChildProps={gridChildProps}
          />
        )}
        {!isRow && (
          <GenerateComponent
            index={index}
            field={obj as PageGeneratorField}
            gridChildProps={gridChildProps}
          />
        )}
      </GridChild>
    )
  );
};
