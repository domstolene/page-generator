import { isFieldWithValidations } from '../../helpers/isFieldWithValidations';
import {
  PageGeneratorField,
  PageGeneratorState,
  PageGeneratorSupportedFields,
  PageGeneratorStateOptionTypes,
  PageGeneratorValidation,
} from '../../types';

const FIELD_MISSING_NAME_OR_ID = 'FIELD_MISSING_NAME_OR_ID';

export const AddErrorToState = (field: PageGeneratorField, errors: object) => {
  if (field && isFieldWithValidations(field)) {
    const value = field.props.defaultValue as string;
    const name = field.props.name || FIELD_MISSING_NAME_OR_ID;
    const fieldErrors =
      field.validations?.filter(
        (v: PageGeneratorValidation) => !v.rule(value),
      ) ?? [];
    errors = {
      ...errors,
      [name]: {
        value,
        errors: fieldErrors,
      },
    };
  }

  return errors;
};
