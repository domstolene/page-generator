import { useEffect, useState } from 'react';
import { PageGenerator, SectionGenerator } from '.';
import { FieldsetFields } from '../storybook/FieldsetFields';
import { FormFields } from '../storybook/FormFields';
import { OtherFields } from '../storybook/OtherFields';
import { PageGeneratorState } from '../types';
import { useValidation } from './Validation/useValidation';

export default {
  title: 'dds-page-generator/PageGenerator',
  component: PageGenerator,
};

export const Form = () => {
  const [state, setState] = useState<PageGeneratorState>({
    nin: 'start',
    dateOfBirth: null,
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const fields = FormFields(state, setState, errors, formSubmitted);
  const { valid } = useValidation(errors);

  useEffect(() => {
    setFormSubmitted(false);
    setErrors({});
  }, [state]);

  return (
    <PageGenerator
      as="form"
      fields={fields}
      state={state}
      setState={setState}
      errorsOnChange={errors => setErrors(errors)}
      htmlProps={{
        onSubmit: event => {
          event.preventDefault();
          setFormSubmitted(true);
        },
      }}
    />
  );
};

export const Fieldset = () => {
  return <PageGenerator as="form" fields={FieldsetFields} />;
};

export const Other = () => {
  return <PageGenerator as="form" fields={OtherFields()} />;
};

export const Section = () => {
  const [state, setState] = useState<PageGeneratorState>({});
  return (
    <SectionGenerator
      as="form"
      fields={FormFields(state, setState, {}, false)}
    />
  );
};
