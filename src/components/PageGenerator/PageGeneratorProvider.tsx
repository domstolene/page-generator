import { PageGeneratorContext } from './PageGeneratorContext';
import {
  PageGeneratorField,
  PageGeneratorProps,
  PageGeneratorRow,
  PageGeneratorValidation,
} from '../../types';
import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { CalendarDate } from '@internationalized/date';
import { SelectOption } from '@norges-domstoler/dds-components';
import { SingleValue, MultiValue } from 'react-select';
import {
  isPageGeneratorRow,
  isFieldWithValidations,
  isMultiValue,
} from '../../helpers';
import { PageGeneratorErrors } from '../../types/PageGeneratorErrors';

interface PageGeneratorProviderProps {
  fields: PageGeneratorProps['fields'];
  errorsOnChange: PageGeneratorProps['errorsOnChange'];
  children: JSX.Element;
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

  useEffect(() => {
    Object.keys(errors).forEach((key: string) => {
      const error = errors[key];
      if (error.errors.length > 0) {
        setErrorMessage(key, error.errors[0].message);
      }
    });
    if (errorsOnChange) {
      errorsOnChange(errors);
    }
  }, [errors]);

  const setErrorMessage = (name: string, errorMessage: string) => {
    const field = getFieldByName(name);
    if (field && isFieldWithValidations(field)) {
      field.props.errorMessage = errorMessage;
    }
  };

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
    value: string,
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

  const validateField = (name: string, value: string) => {
    const field = getFieldByName(name);
    if (field && isFieldWithValidations(field)) {
      const fieldErrors =
        field.validations?.filter(
          (v: PageGeneratorValidation) => !v.rule(value),
        ) ?? [];
      updateErrors(fieldErrors, name, value);
    }
  };

  const onBlur = <T extends HTMLInputElement | HTMLTextAreaElement>(
    event: FocusEvent<T>,
  ) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  const fieldOnChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
    event: ChangeEvent<T>,
  ) => {
    const { id, name, value } = event.target;
    const checked = (event as ChangeEvent<HTMLInputElement>).target?.checked;
    setErrorMessage(name, ''); //clear errormessage when user types
    const newState = {
      ...state,
      [name || id]: event.target.type === 'checkbox' ? checked : value,
    };
    setState && setState(newState);
  };

  const selectOnChange = (
    chosen:
      | SingleValue<SelectOption<unknown>>
      | MultiValue<SelectOption<unknown>>,
    name: string,
  ) => {
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
    setState && setState(newState);
  };

  const datePickerOnChange = (value: CalendarDate, name: string) => {
    setErrorMessage(name, ''); //clear errormessage when user types
    const newState = {
      ...state,
      [name]: value,
    };
    setState && setState(newState);
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
      }}
    >
      {children}
    </PageGeneratorContext.Provider>
  );
};
