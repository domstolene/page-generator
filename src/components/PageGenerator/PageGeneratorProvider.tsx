import { PageGeneratorContext } from './PageGeneratorContext';
import {
  PageGeneratorErrorMessages,
  PageGeneratorField,
  PageGeneratorProps,
  PageGeneratorRow,
  PageGeneratorSelectOption,
  PageGeneratorValidation,
  PageGeneratorValidationValue,
} from '../../types';
import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { CalendarDate } from '@internationalized/date';
import {
  isPageGeneratorRow,
  isFieldWithValidations,
  isMultiValue,
} from '../../helpers';
import { PageGeneratorErrors } from '../../types/PageGeneratorErrors';

interface PageGeneratorProviderProps {
  fields: PageGeneratorProps['fields'];
  errorsOnChange: PageGeneratorProps['errorsOnChange'];
  children: (validateAllFields: () => void) => JSX.Element;
  state?: PageGeneratorProps['state'];
  setState?: PageGeneratorProps['setState'];
}

export const PageGeneratorProvider = ({
  children,
  fields,
  errorsOnChange,
  state,
  setState,
}: PageGeneratorProviderProps) => {
  const [errors, setErrors] = useState<PageGeneratorErrors>({});
  const [errorMessages, setErrorMessages] =
    useState<PageGeneratorErrorMessages>({});

  useEffect(() => {
    let myErrorMessages = {
      ...errorMessages,
    };
    Object.keys(errors).forEach((key: string) => {
      const error = errors[key];
      if (error.errors.length > 0) {
        myErrorMessages = {
          ...myErrorMessages,
          [key]: error.errors[0].message,
        };
      } else {
        myErrorMessages = {
          ...myErrorMessages,
          [key]: '',
        };
      }
    });
    setErrorMessages(myErrorMessages);
    if (errorsOnChange) {
      errorsOnChange(errors);
    }
  }, [errors]);

  const findFieldByNameInternal = (
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
        const result = findFieldByNameInternal(name, f.fields);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  const getFieldByName = (name: string) => {
    return findFieldByNameInternal(name, fields);
  };

  const updateErrors = (
    fieldErrors: PageGeneratorValidation[],
    name: string,
    value: string | PageGeneratorSelectOption,
  ) => {
    const newErrors = {
      ...errors,
      [name]: {
        value,
        errors: fieldErrors,
      },
    };
    setErrors(newErrors);
  };

  const validateField = (name: string, value: PageGeneratorValidationValue) => {
    const field = getFieldByName(name);
    if (field && isFieldWithValidations(field)) {
      const fieldErrors =
        field.validations?.filter(
          (v: PageGeneratorValidation) => !v.rule(value),
        ) ?? [];
      updateErrors(fieldErrors, name, value);
    }
  };

  const validateAllFields = () => {
    let myErrors = {};
    fields.forEach(field => {
      if (isFieldWithValidations(field) && state && field.props?.name) {
        const value = state[field.props.name] as PageGeneratorValidationValue;
        const name = field.props.name;
        const fieldErrors =
          field.validations?.filter(
            (v: PageGeneratorValidation) => !v.rule(value),
          ) ?? [];
        myErrors = {
          ...myErrors,
          [name]: {
            value,
            errors: fieldErrors,
          },
        };
      }
    });
    setErrors(myErrors);
  };

  const onBlur = <
    T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  >(
    event: FocusEvent<T>,
  ) => {
    const { name, value } = event.target;
    validateField(name, value as PageGeneratorValidationValue);
  };

  const onBlurSelect = (name: string) => {
    if (state) {
      validateField(name, state[name] as PageGeneratorValidationValue);
    }
  };

  const fieldOnChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
    event: ChangeEvent<T>,
  ) => {
    const { id, name, value } = event.target;
    const checked = (event as ChangeEvent<HTMLInputElement>).target?.checked;
    setErrorMessages({
      ...errorMessages,
      [name]: '', //clear errormessage when user types
    });
    const newState = {
      ...state,
      [name || id]: event.target.type === 'checkbox' ? checked : value,
    };
    if (setState) {
      setState(newState);
    }
  };

  const selectOnChange = (chosen: PageGeneratorSelectOption, name: string) => {
    let value = null;
    if (isMultiValue(chosen)) {
      value = Array.isArray(chosen) ? chosen : null;
    } else {
      value = chosen ?? null;
    }
    const newState = {
      ...state,
      [name]: value,
    };
    validateField(name, chosen as PageGeneratorValidationValue);
    if (setState) {
      setState(newState);
    }
  };

  const datePickerOnChange = (value: CalendarDate, name: string) => {
    const newState = {
      ...state,
      [name]: value,
    };
    if (setState) {
      setState(newState);
    }
  };

  return (
    <PageGeneratorContext.Provider
      value={{
        fields,
        state,
        fieldOnChange,
        selectOnChange,
        datePickerOnChange,
        onBlur,
        onBlurSelect,
        errorMessages,
        validateAllFields,
      }}
    >
      {children(validateAllFields)}
    </PageGeneratorContext.Provider>
  );
};
