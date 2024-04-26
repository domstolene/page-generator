import { PageGenerator, SectionGenerator } from '.';
import { FieldsetFields } from '../storybook/FieldsetFields';
import { FormFields } from '../storybook/FormFields';
import { OtherFields } from '../storybook/OtherFields';

export default {
  title: 'dds-page-generator/PageGenerator',
  component: PageGenerator,
};

export const Form = () => {
  const fields = FormFields();
  return (
    <PageGenerator
      as="form"
      fields={fields}
      stateOnChange={(newState?: object, errors?: object) => {
        console.log(newState, errors);
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
