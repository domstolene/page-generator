import { PageGeneratorField, PageGeneratorRow } from '../types';
import { isFieldWithValidations } from './isFieldWithValidations';
import { isPageGeneratorRow } from './isPageGeneratorRow';

export const getFieldByName = (
  name: string,
  fieldsToSearch: (PageGeneratorField | PageGeneratorRow)[],
): PageGeneratorField | PageGeneratorRow | null => {
  for (const f of fieldsToSearch) {
    // Search for fields with validation named name
    if (isFieldWithValidations(f) && f.props && f.props.name === name) {
      return f;
    }
    // If it's a row, search through it's fields recursively
    if (isPageGeneratorRow(f) && f.fields && Array.isArray(f.fields)) {
      const result = getFieldByName(name, f.fields);
      if (result) {
        return result;
      }
    }
  }
  return null;
};
