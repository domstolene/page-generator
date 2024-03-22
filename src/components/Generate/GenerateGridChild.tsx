import { GridChild } from '@norges-domstoler/dds-components';
import { isPageGeneratorRow } from '../../helpers';
import { PageGeneratorField, PageGeneratorRow } from '../../types';
import { GenerateComponent } from './GenerateComponent';
import { GenerateRow } from './GenerateRow';

export const GenerateGridChild = (
  obj: PageGeneratorField | PageGeneratorRow,
  index: number,
) => {
  const isRow = isPageGeneratorRow(obj);
  return (
    !obj.hide && (
      <GridChild columnsOccupied="all" key={index}>
        {isRow && GenerateRow(index, obj.fields)}
        {!isRow && GenerateComponent(index, obj)}
      </GridChild>
    )
  );
};
