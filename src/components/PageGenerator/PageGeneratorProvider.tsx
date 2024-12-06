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
} from '../../types';
import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { CalendarDate } from '@internationalized/date';
import {
  isPageGeneratorRow,
  isFieldWithValidations,
  isMultiValue,
} from '../../helpers';

interface PageGeneratorProviderProps {
  fields: PageGeneratorProps['fields'];
  formDataOnChange: PageGeneratorProps['formDataOnChange'];
  children: (validateAllFields: (next: () => void) => void) => JSX.Element;
  state?: PageGeneratorProps['state'];
  setState?: PageGeneratorProps['setState'];
}

export const PageGeneratorProvider = ({
  children,
  fields,
  formDataOnChange,
  state,
  setState,
}: PageGeneratorProviderProps) => {
  const [formData, setFormData] = useState<PageGeneratorFormData>({
    errors: null,
    errorMessages: null,
    submitted: false,
    touched: false,
    valid: false,
  });

  useEffect(() => {
    setFormData({
      ...formData,
      submitted: false,
    });
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

      if (newErrorMessages && (formData.touched || formData.submitted)) {
        setFormData({
          ...formData,
          errorMessages: newErrorMessages,
          valid,
        });
      } else {
        setFormData({
          ...formData,
          valid,
        });
      }
      if (formDataOnChange) {
        formDataOnChange(formData);
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
      const fieldErrors =
        field.validations?.filter(
          (v: PageGeneratorValidation) => !v.rule(value),
        ) ?? [];
      const newErrors = {
        ...formData.errors,
        [name]: {
          value,
          errors: fieldErrors,
        },
      };
      setFormData({
        ...formData,
        errors: newErrors,
        touched: true,
      });
    }
  };

  const validateAllFields = (next: () => void) => {
    let newErrors: PageGeneratorErrors = {};
    fields.forEach(field => {
      if (isFieldWithValidations(field) && state && field.props?.name) {
        const value = state[field.props.name] as PageGeneratorValidationValue;
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
    setFormData({
      ...formData,
      submitted: true,
      errors: newErrors,
      valid,
    });
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
    setFormData({
      ...formData,
      touched: true,
      errorMessages: {
        ...formData.errorMessages,
        [name]: '',
      },
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
    setFormData({
      ...formData,
      touched: true,
    });
    const newState = {
      ...state,
      [name]: value,
    };
    validateField(name, chosen as PageGeneratorValidationValue);
    if (setState) {
      setState(newState);
    }
  };

  const datePickerOnChange = (value: CalendarDate | null, name: string) => {
    const newState = {
      ...state,
      [name]: value,
    };
    setFormData({
      ...formData,
      touched: true,
    });
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
        formData,
        validateAllFields,
      }}
    >
      {children(validateAllFields)}
    </PageGeneratorContext.Provider>
  );
};
