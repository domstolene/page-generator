import { useEffect, useState } from 'react';
import { PageGenerator, SectionGenerator } from '.';
import { FieldsetFields } from '../storybook/FieldsetFields';
import { FormFields } from '../storybook/FormFields';
import { OtherFields } from '../storybook/OtherFields';
import { PageGeneratorFormData, PageGeneratorState } from '../types';
import { DdsProvider, useScreenSize } from '@norges-domstoler/dds-components';

export default {
  title: 'dds-page-generator/PageGenerator',
  component: PageGenerator,
};

export const Form = () => {
  const screenSize = useScreenSize();
  const [state, setState] = useState<PageGeneratorState>({
    nin: '',
    dateOfBirth: null,
    email: '',
    adresse: '',
    search: '',
    fritekst: '',
  });
  const [formData, setFormData] = useState<PageGeneratorFormData>();
  const fields = FormFields(state, screenSize, setState, formData);

  return (
    <DdsProvider language="no">
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
    </DdsProvider>
  );
};

export const Fieldset = () => {
  return (
    <DdsProvider language="no">
      <PageGenerator as="form" fields={FieldsetFields} />
    </DdsProvider>
  );
};

export const Other = () => {
  return (
    <DdsProvider language="no">
      <PageGenerator as="form" fields={OtherFields()} />
    </DdsProvider>
  );
};

export const Section = () => {
  const [state, setState] = useState<PageGeneratorState>({});
  const screenSize = useScreenSize();
  return (
    <DdsProvider language="no">
      <SectionGenerator
        as="form"
        fields={FormFields(state, screenSize, setState)}
      />
    </DdsProvider>
  );
};
