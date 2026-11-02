import { PageGeneratorContext } from './PageGeneratorContext';
import {
  PageGeneratorErrors,
  PageGeneratorField,
  PageGeneratorFormData,
  PageGeneratorProps,
  PageGeneratorRow,
  PageGeneratorSelectOption,
  PageGeneratorValidation,
  PageGeneratorValidationValue,
  PageGeneratorState,
} from '../../types';
import { ChangeEvent, FocusEvent, JSX, useEffect, useState } from 'react';
import { CalendarDate } from '@internationalized/date';
import {
  isPageGeneratorRow,
  isFieldWithValidations,
  isMultiValue,
} from '../../helpers';

interface PageGeneratorProviderProps<TState extends PageGeneratorState> {
  fields: PageGeneratorProps['fields'];
  formDataOnChange: PageGeneratorProps['formDataOnChange'];
  children: (validateAllFields: (next: () => void) => void) => JSX.Element;
  state?: TState;
  setState?: PageGeneratorProps<TState>['setState'];
}

export const PageGeneratorProvider = <TState extends PageGeneratorState>({
  children,
  fields,
  formDataOnChange,
  state,
  setState,
}: PageGeneratorProviderProps<TState>) => {
  const [formData, setFormData] = useState<PageGeneratorFormData>({
    errors: null,
    errorMessages: null,
    submitted: false,
    touched: false,
    valid: false,
  });

  useEffect(() => {
    setFormData(previous =>
      previous.submitted ? { ...previous, submitted: false } : previous,
    );
  }, [state]);

  useEffect(() => {
    let newErrorMessages = { ...formData.errorMessages };
    if (formData.errors && Object.keys(formData.errors).length > 0) {
      Object.keys(formData.errors).forEach((key: string) => {
        if (formData.errors) {
          const error = formData.errors[key];
          if (error && error.errors.length > 0) {
            newErrorMessages = {
              ...newErrorMessages,
              [key]: error.errors[0].message,
            };
          } else {
            newErrorMessages = {
              ...newErrorMessages,
              [key]: '',
            };
          }
        }
      });
      let valid = true;
      Object.keys(formData.errors).forEach(key => {
        if (formData.errors && formData.errors[key].errors.length > 0) {
          valid = false;
          return;
        }
      });

      let newFormData = { ...formData, valid };

      if (newErrorMessages && (formData.touched || formData.submitted)) {
        newFormData = {
          ...newFormData,
          errorMessages: newErrorMessages,
        };
      }
      setFormData(newFormData);
      if (formDataOnChange) {
        formDataOnChange(newFormData);
      }
    }
  }, [formData.errors]);

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

  const getFieldErrors = (
    name: string,
    value: PageGeneratorValidationValue,
  ) => {
    const field = findFieldByNameInternal(name, fields);
    if (field && isFieldWithValidations(field)) {
      const fieldErrors =
        field.validations?.filter(
          (v: PageGeneratorValidation) => !v.rule(value),
        ) ?? [];
      return fieldErrors;
    }
    return [];
  };

  const validateField = (name: string, value: PageGeneratorValidationValue) => {
    const field = findFieldByNameInternal(name, fields);
    if (field && isFieldWithValidations(field)) {
      const fieldErrors = getFieldErrors(name, value);
      setFormData(previous => ({
        ...previous,
        errors: { ...previous.errors, [name]: { value, errors: fieldErrors } },
        touched: true,
      }));
    }
  };

  const validateAllFields = (next: () => void) => {
    let newErrors: PageGeneratorErrors = {};
    fields.forEach(field => {
      if (isFieldWithValidations(field) && state && field.props?.name) {
        const value = state[field.props.name];
        const name = field.props.name;
        const fieldErrors = getFieldErrors(name, value);
        newErrors = {
          ...newErrors,
          [name]: {
            value,
            errors: fieldErrors,
          },
        };
      }
    });

    let valid = true;
    Object.keys(newErrors).forEach(key => {
      if (newErrors[key].errors.length > 0) {
        valid = false;
        return;
      }
    });
    setFormData(previous => ({
      ...previous,
      submitted: true,
      errors: newErrors,
      valid,
    }));
    if (valid) {
      next();
    }
  };

  const onBlur = <
    T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  >(
    event: FocusEvent<T>,
  ) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  const onBlurSelect = (name: string) => {
    if (state) {
      validateField(name, state[name]);
    }
  };

  const fieldOnChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
    event: ChangeEvent<T>,
  ) => {
    const { id, name, value } = event.target;
    const checked = (event as ChangeEvent<HTMLInputElement>).target?.checked;
    setFormData(previous => ({
      ...previous,
      touched: true,
      errorMessages: {
        ...previous.errorMessages,
        [name]: '',
      },
    }));
    if (setState) {
      setState(previous => ({
        ...previous,
        [name || id]: event.target.type === 'checkbox' ? checked : value,
      }));
    }
  };

  const selectOnChange = (chosen: PageGeneratorSelectOption, name: string) => {
    let value = null;
    if (isMultiValue(chosen)) {
      value = Array.isArray(chosen) ? chosen : null;
    } else {
      value = chosen ?? null;
    }
    setFormData(previous => ({
      ...previous,
      touched: true,
      submitted: false,
      errorMessages: {
        ...previous.errorMessages,
        [name]: '',
      },
    }));
    validateField(name, chosen);
    if (setState) {
      setState(previous => ({ ...previous, [name]: value }));
    }
  };

  const datePickerOnChange = (value: CalendarDate | null, name: string) => {
    setFormData(previous => ({
      ...previous,
      touched: true,
      submitted: false,
      errorMessages: {
        ...previous.errorMessages,
        [name]: '',
      },
    }));
    validateField(name, value);
    if (setState) {
      setState(previous => ({ ...previous, [name]: value }));
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
        formData,
        validateAllFields,
      }}
    >
      {children(validateAllFields)}
    </PageGeneratorContext.Provider>
  );
};
