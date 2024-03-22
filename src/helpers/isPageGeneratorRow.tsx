import { PageGeneratorField, PageGeneratorRow } from '../types';

export const isPageGeneratorRow = (
  obj: PageGeneratorField | PageGeneratorRow,
): obj is PageGeneratorRow => {
  return (obj as PageGeneratorRow).fields !== undefined;
};
