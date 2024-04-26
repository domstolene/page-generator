import { useMemo, useState } from 'react';
import { PageGenerator, SectionGenerator } from '.';
import { getFieldByName } from '../helpers';
import { FieldsetFields } from '../storybook/FieldsetFields';
import { FormFields } from '../storybook/FormFields';
import { OtherFields } from '../storybook/OtherFields';
import { FieldWithValidations } from '../types';

export default {
  title: 'dds-page-generator/PageGenerator',
  component: PageGenerator,
};

export const Form = () => {
  const [state, setState] = useState<object>({
    phoneNumber: '',
  });
  const fields = FormFields();
  return (
    <PageGenerator
      as="form"
      fields={fields}
      stateOnChange={(newState?: object, errors?: any) => {
        setState({
          ...newState,
        });
      }}
      updateField={(fieldName: string, errorMessage: string) => {
        const field = getFieldByName(fieldName, fields) as FieldWithValidations;
        field.props = {
          ...field.props,
          errorMessage: errorMessage,
        };
      }}
    />
  );
};

export const Fieldset = () => {
  return (
    <PageGenerator
      as="form"
      fields={FieldsetFields}
      stateOnChange={(newState?: object, errors?: object) => {
        console.log(newState, errors);
      }}
    />
  );
};

export const Other = () => {
  return (
    <PageGenerator
      as="form"
      fields={OtherFields()}
      stateOnChange={(newState?: object) => {
        console.log(newState);
      }}
    />
  );
};

export const Section = () => {
  return (
    <SectionGenerator
      as="form"
      fields={FormFields()}
      stateOnChange={(newState?: object, errors?: object) => {
        console.log(newState, errors);
      }}
    />
  );
};
