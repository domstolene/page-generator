import { PageGenerator } from '.';
import { FormFields } from '../storybook/FormFields';
import { OtherFields } from '../storybook/OtherFields';

export default {
  title: 'dds-page-generator/PageGenerator',
  component: PageGenerator,
};

export const Form = () => {
  return (
    <PageGenerator
      as="form"
      fields={FormFields}
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
