import { useEffect, useState } from 'react';
import { PageGenerator, SectionGenerator } from '.';
import { FieldsetFields } from '../storybook/FieldsetFields';
import { FormFields } from '../storybook/FormFields';
import { OtherFields } from '../storybook/OtherFields';
import { PageGeneratorFormData, PageGeneratorState } from '../types';
import { ThemeProvider } from '@norges-domstoler/dds-components';

export default {
  title: 'dds-page-generator/PageGenerator',
  component: PageGenerator,
};

export const Form = () => {
  const [state, setState] = useState<PageGeneratorState>({
    nin: '',
    dateOfBirth: null,
    email: '',
    adresse: '',
    search: '',
    fritekst: '',
  });
  const [formData, setFormData] = useState<PageGeneratorFormData>();
  const fields = FormFields(state, setState, formData);

  return (
    <ThemeProvider>
      <PageGenerator
        as="form"
        fields={fields}
        state={state}
        setState={setState}
        formDataOnChange={formData => {
          setFormData(formData);
        }}
        noValidate={true}
        onSubmit={() => {
          window.alert('Skjemaet er gyldig!');
        }}
      />
    </ThemeProvider>
  );
};

export const Fieldset = () => {
  return (
    <ThemeProvider>
      <PageGenerator as="form" fields={FieldsetFields} />
    </ThemeProvider>
  );
};

export const Other = () => {
  return (
    <ThemeProvider>
      <PageGenerator as="form" fields={OtherFields()} />
    </ThemeProvider>
  );
};

export const Section = () => {
  const [state, setState] = useState<PageGeneratorState>({});
  return (
    <ThemeProvider>
      <SectionGenerator as="form" fields={FormFields(state, setState)} />
    </ThemeProvider>
  );
};
