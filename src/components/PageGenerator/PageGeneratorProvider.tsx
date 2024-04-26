import { PageGeneratorContext } from './PageGeneratorContext';
import {
  PageGeneratorField,
  PageGeneratorProps,
  PageGeneratorRow,
  PageGeneratorState,
  PageGeneratorStateOptionTypes,
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
  getFieldByName,
} from '../../helpers';
import { AddFieldToState } from './AddFieldToState';

interface PageGeneratorProviderProps {
  fields: PageGeneratorProps['fields'];
  stateOnChange: PageGeneratorProps['stateOnChange'];
  updateField: PageGeneratorProps['updateField'];
  children: JSX.Element;
}

export const PageGeneratorProvider = ({
  children,
  fields,
  stateOnChange,
  updateField,
}: PageGeneratorProviderProps) => {
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let state: PageGeneratorState<PageGeneratorStateOptionTypes> = {};
    fields.forEach((field: PageGeneratorField | PageGeneratorRow) => {
      if (isPageGeneratorRow(field)) {
        field.fields.forEach((field: PageGeneratorField) => {
          state = AddFieldToState(field, state);
        });
      } else {
        state = AddFieldToState(field, state);
      }
    });
    setState(state);
  }, []);

  useEffect(() => {
    if (stateOnChange) {
      stateOnChange(state, errors);
    }
  }, [state, errors]);

  const setErrorMessage = (name: string, errorMessage: string) => {
    const field = getFieldByName(name, fields);
    if (field && isFieldWithValidations(field) && field.props.name) {
      updateField && updateField(field.props.name, errorMessage);
    }
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

  const validateFields = (name: string, value: string) => {
    const field = getFieldByName(name, fields);
    if (field && isFieldWithValidations(field)) {
      const fieldErrors =
        field.validations?.filter(
          (v: PageGeneratorValidation) => !v.rule(value),
        ) ?? [];
      updateErrors(fieldErrors, name, value);
      setErrorMessage(
        name,
        fieldErrors.length > 0 ? fieldErrors[0].message : '',
      );
    }
  };

  const onBlur = <T extends HTMLInputElement | HTMLTextAreaElement>(
    event: FocusEvent<T>,
  ) => {
    const { name, value } = event.target;
    validateFields(name, value);
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
    setState(newState);
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
    setState(newState);
  };

  const datePickerOnChange = (value: CalendarDate, name: string) => {
    setErrorMessage(name, ''); //clear errormessage when user types
    const newState = {
      ...state,
      [name]: value,
    };
    setState(newState);
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
