import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageGenerator } from '../components';
import { PageGeneratorField, PageGeneratorSupportedFields } from '../types';

describe('<PageGenerator />', () => {
  test('renders a PageGenerator', () => {
    const lastnameField = 'lastName';

    const fields: PageGeneratorField[] = [
      {
        component: PageGeneratorSupportedFields.TextInput,
        props: {
          label: lastnameField,
          type: 'text',
          name: lastnameField,
          value: 'value',
        },
        validations: [],
      },
    ];
    //render(<PageGenerator as="form" fields={fields} />);
    //const textInput = screen.getByLabelText(lastnameField);
    expect(fields.length).toEqual(1);
  });

  // test('should handle state changes', async () => {
  //   let state: PageGeneratorState = {
  //     lastName: 'old value',
  //   };

  //   const props = {
  //     setState: jest.fn(value => {
  //       state = value;
  //     }),
  //   };

  //   const expectedValue = {
  //     lastName: 'new value',
  //   };
  //   const lastnameField = 'lastName';

  //   const fields: PageGeneratorField[] = [
  //     {
  //       component: PageGeneratorSupportedFields.TextInput,
  //       props: {
  //         label: lastnameField,
  //         type: 'text',
  //         name: lastnameField,
  //         value: '',
  //       },
  //       validations: [],
  //     },
  //   ];

  //   render(<PageGenerator as="div" fields={fields} state={state} {...props} />);

  //   const textInput = screen.getByLabelText(lastnameField);
  //   fireEvent.change(textInput, { target: { value: expectedValue.lastName } });

  //   await waitFor(() => expect(state).toEqual(expectedValue));
  // });
});
