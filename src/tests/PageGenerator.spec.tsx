import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DdsProvider } from '@norges-domstoler/dds-components';
import { ReactElement } from 'react';
import { PageGenerator } from '../components';
import {
  PageGeneratorField,
  PageGeneratorFormData,
  PageGeneratorSetState,
  PageGeneratorSupportedFields,
  PageGeneratorState,
  PageGeneratorValidationValue,
} from '../types';
import {
  RequiredValidator,
  EmailValidator,
  PhoneNumberValidator,
  NumbersOnlyValidator,
} from '../helpers/Validators';

describe('<PageGenerator />', () => {
  let setState: PageGeneratorSetState;
  let setStateMock: ReturnType<typeof vi.fn>;
  let formDataOnChange: (formData: PageGeneratorFormData) => void;
  let formDataOnChangeMock: ReturnType<typeof vi.fn>;
  let state: PageGeneratorState;

  beforeEach(() => {
    setStateMock = vi.fn();
    setState = setStateMock as unknown as PageGeneratorSetState;
    formDataOnChangeMock = vi.fn();
    formDataOnChange = formDataOnChangeMock as (
      formData: PageGeneratorFormData,
    ) => void;
    state = {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    };
  });

  const renderWithProvider = (component: ReactElement) => {
    return render(<DdsProvider language="no">{component}</DdsProvider>);
  };

  describe('Simple Content Components', () => {
    test('renders Button field with innerHTML', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.Button,
          props: { label: 'Submit', type: 'button' },
          innerHTML: 'Click me',
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
    });

    test('renders Heading field with innerHTML', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.Heading,
          props: { level: 1 },
          innerHTML: 'Welcome',
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      const heading = screen.getByRole('heading', { name: 'Welcome' });
      expect(heading).toBeInTheDocument();
    });

    test('renders Paragraph field with innerHTML', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.Paragraph,
          props: {},
          innerHTML: 'This is a paragraph',
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      expect(screen.getByText('This is a paragraph')).toBeInTheDocument();
    });

    test('renders Label field', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.Label,
          props: { htmlFor: 'firstName' },
          innerHTML: 'First Name',
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      expect(screen.getByText('First Name')).toBeInTheDocument();
    });

    test('renders Divider', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.Divider,
          props: {},
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      expect(screen.getByRole('separator')).toBeInTheDocument();
    });
  });

  describe('Input Components', () => {
    test('renders TextInput and handles onChange', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.TextInput,
          props: {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            value: state.firstName as string,
          },
          validations: [],
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      const input = screen.getByLabelText('First Name');
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue('');

      fireEvent.change(input, { target: { value: 'John' } });

      expect(setState).toHaveBeenCalled();
    });

    test('renders TextArea and handles onChange', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.TextArea,
          props: {
            name: 'message',
            label: 'Message',
            value: state.message as string,
          },
          validations: [],
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      const textarea = screen.getByLabelText('Message');
      expect(textarea).toBeInTheDocument();

      fireEvent.change(textarea, { target: { value: 'Hello world' } });

      expect(setState).toHaveBeenCalled();
    });

    test('renders Checkbox and handles onChange', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.Checkbox,
          props: {
            name: 'agree',
            label: 'I agree',
          },
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();

      fireEvent.click(checkbox);

      expect(setStateMock).toHaveBeenCalled();
    });

    test('renders RadioButton and handles onChange', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.RadioButton,
          props: {
            name: 'gender',
            label: 'Male',
            value: 'male',
          },
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      const radio = screen.getByRole('radio');
      expect(radio).toBeInTheDocument();

      fireEvent.click(radio);

      expect(setStateMock).toHaveBeenCalled();
    });

    test('renders Search field', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.Search,
          props: {
            name: 'search',
            label: 'Search',
          },
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      const search = screen.getByRole('searchbox');
      expect(search).toBeInTheDocument();

      fireEvent.change(search, { target: { value: 'query' } });

      expect(setStateMock).toHaveBeenCalled();
    });

    test('renders TextInput with RequiredValidator validation', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.TextInput,
          props: {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            value: state.firstName as string,
          },
          validations: [RequiredValidator('First name is required')],
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      const input = screen.getByLabelText('First Name');
      expect(input).toBeInTheDocument();

      // Validator rule should reject empty string
      const validator = RequiredValidator('First name is required');
      expect(validator.rule('' as PageGeneratorValidationValue)).toBe(false);
      expect(validator.rule('John' as PageGeneratorValidationValue)).toBe(true);
    });

    test('renders TextArea with RequiredValidator validation', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.TextArea,
          props: {
            name: 'message',
            label: 'Message',
            value: state.message as string,
          },
          validations: [RequiredValidator('Message is required')],
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      const textarea = screen.getByLabelText('Message');
      expect(textarea).toBeInTheDocument();

      // Validator rule should reject empty string
      const validator = RequiredValidator('Message is required');
      expect(validator.rule('' as PageGeneratorValidationValue)).toBe(false);
      expect(
        validator.rule('Hello world' as PageGeneratorValidationValue),
      ).toBe(true);
    });

    test('renders TextInput with EmailValidator validation', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.TextInput,
          props: {
            name: 'email',
            label: 'Email',
            type: 'email',
            value: state.email as string,
          },
          validations: [EmailValidator],
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      const input = screen.getByLabelText('Email');
      expect(input).toBeInTheDocument();

      // Email validator should accept valid emails
      expect(
        EmailValidator.rule(
          'valid@example.com' as PageGeneratorValidationValue,
        ),
      ).toBe(true);
      expect(
        EmailValidator.rule('invalid-email' as PageGeneratorValidationValue),
      ).toBe(false);
      expect(EmailValidator.rule('' as PageGeneratorValidationValue)).toBe(
        true,
      ); // Allows empty
    });

    test('renders TextInput with multiple validations', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.TextInput,
          props: {
            name: 'phone',
            label: 'Phone Number',
            type: 'tel',
            value: '',
          },
          validations: [
            RequiredValidator('Phone number is required'),
            PhoneNumberValidator,
          ],
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      const input = screen.getByLabelText('Phone Number');
      expect(input).toBeInTheDocument();

      // RequiredValidator should reject empty
      const requiredValidator = RequiredValidator('Phone number is required');
      expect(requiredValidator.rule('' as PageGeneratorValidationValue)).toBe(
        false,
      );

      // PhoneNumberValidator should validate format
      expect(
        PhoneNumberValidator.rule('98765432' as PageGeneratorValidationValue),
      ).toBe(true);
      expect(
        PhoneNumberValidator.rule('123' as PageGeneratorValidationValue),
      ).toBe(true); // Allows short
      expect(
        PhoneNumberValidator.rule('abc-def' as PageGeneratorValidationValue),
      ).toBe(false);
    });

    test('renders TextInput with NumbersOnlyValidator validation', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.TextInput,
          props: {
            name: 'zipCode',
            label: 'ZIP Code',
            type: 'text',
            value: '',
          },
          validations: [
            RequiredValidator('ZIP code is required'),
            NumbersOnlyValidator('ZIP code must contain only numbers'),
          ],
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      const input = screen.getByLabelText('ZIP Code');
      expect(input).toBeInTheDocument();

      // NumbersOnlyValidator should reject letters
      const numbersValidator = NumbersOnlyValidator(
        'ZIP code must contain only numbers',
      );
      expect(
        numbersValidator.rule('12345' as PageGeneratorValidationValue),
      ).toBe(true);
      expect(
        numbersValidator.rule('123abc' as PageGeneratorValidationValue),
      ).toBe(false);
      expect(numbersValidator.rule('' as PageGeneratorValidationValue)).toBe(
        true,
      ); // Allows empty
    });
  });

  describe('Container Components', () => {
    test('renders List with ListItem children', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.List,
          props: {},
          children: [
            {
              component: PageGeneratorSupportedFields.ListItem,
              props: {},
              innerHTML: 'Item 1',
            },
            {
              component: PageGeneratorSupportedFields.ListItem,
              props: {},
              innerHTML: 'Item 2',
            },
          ],
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    test('renders HStack with multiple children', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.HStack,
          props: { gap: 'x1' },
          children: [
            {
              component: PageGeneratorSupportedFields.Button,
              props: { label: 'Button 1' },
              innerHTML: 'OK',
            },
            {
              component: PageGeneratorSupportedFields.Button,
              props: { label: 'Button 2' },
              innerHTML: 'Cancel',
            },
          ],
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /cancel/i }),
      ).toBeInTheDocument();
    });

    test('renders VStack with multiple children', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.VStack,
          props: { gap: 'x2' },
          children: [
            {
              component: PageGeneratorSupportedFields.Paragraph,
              props: {},
              innerHTML: 'Line 1',
            },
            {
              component: PageGeneratorSupportedFields.Paragraph,
              props: {},
              innerHTML: 'Line 2',
            },
          ],
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      expect(screen.getByText('Line 1')).toBeInTheDocument();
      expect(screen.getByText('Line 2')).toBeInTheDocument();
    });

    test('renders Card with innerHTML', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.Card,
          props: { cardType: 'info' },
          innerHTML: 'Card content',
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    test('renders CheckboxGroup with children', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.CheckboxGroup,
          props: { label: 'Options' },
          children: [
            {
              component: PageGeneratorSupportedFields.Checkbox,
              props: { value: 'opt1', label: 'Option 1' },
            },
            {
              component: PageGeneratorSupportedFields.Checkbox,
              props: { value: 'opt2', label: 'Option 2' },
            },
          ],
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      // Check group role is rendered
      expect(screen.getByRole('group')).toBeInTheDocument();
      // Check checkboxes are rendered
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(2);
    });
  });

  describe('Hide Property', () => {
    test('does not render hidden field', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.Paragraph,
          props: {},
          innerHTML: 'Visible',
          hide: false,
        },
        {
          component: PageGeneratorSupportedFields.Paragraph,
          props: {},
          innerHTML: 'Hidden',
          hide: true,
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      expect(screen.getByText('Visible')).toBeInTheDocument();
      expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
    });

    test('hides children in container when child.hide is true', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.HStack,
          props: {},
          children: [
            {
              component: PageGeneratorSupportedFields.Button,
              props: { label: 'Visible' },
              innerHTML: 'Show',
            },
            {
              component: PageGeneratorSupportedFields.Button,
              props: { label: 'Hidden' },
              innerHTML: 'Hide',
              hide: true,
            },
          ],
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      expect(screen.getByRole('button', { name: /show/i })).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: /hide/i }),
      ).not.toBeInTheDocument();
    });
  });

  describe('Props Propagation', () => {
    test('passes custom props to TextInput', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.TextInput,
          props: {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            placeholder: 'Enter first name',
            value: state.firstName as string,
          },
          validations: [],
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      const input = screen.getByPlaceholderText('Enter first name');
      expect(input).toBeInTheDocument();
    });

    test('passes disabled prop to input fields', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.TextInput,
          props: {
            name: 'disabled',
            label: 'Disabled field',
            type: 'text',
            disabled: true,
            value: '',
          },
          validations: [],
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      const input = screen.getByLabelText('Disabled field');
      expect(input).toBeDisabled();
    });

    test('passes className to Button', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.Button,
          props: { label: 'Test', type: 'button', className: 'custom-class' },
          innerHTML: 'Click',
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      const button = screen.getByRole('button', { name: /click/i });
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Multiple Fields', () => {
    test('renders form with multiple fields', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.Heading,
          props: { level: 1 },
          innerHTML: 'Contact Form',
        },
        {
          component: PageGeneratorSupportedFields.TextInput,
          props: {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            value: state.firstName as string,
          },
          validations: [],
        },
        {
          component: PageGeneratorSupportedFields.TextInput,
          props: {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            value: state.lastName as string,
          },
          validations: [],
        },
        {
          component: PageGeneratorSupportedFields.TextArea,
          props: {
            name: 'message',
            label: 'Message',
            value: state.message as string,
          },
          validations: [],
        },
        {
          component: PageGeneratorSupportedFields.Button,
          props: { type: 'submit' },
          innerHTML: 'Submit',
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="form"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      expect(
        screen.getByRole('heading', { name: 'Contact Form' }),
      ).toBeInTheDocument();
      expect(screen.getByLabelText('First Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Message')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /submit/i }),
      ).toBeInTheDocument();
    });
  });

  describe('Nested Containers', () => {
    test('renders deeply nested container structure', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.VStack,
          props: {},
          children: [
            {
              component: PageGeneratorSupportedFields.Paragraph,
              props: {},
              innerHTML: 'Outer paragraph',
            },
            {
              component: PageGeneratorSupportedFields.HStack,
              props: {},
              children: [
                {
                  component: PageGeneratorSupportedFields.Paragraph,
                  props: {},
                  innerHTML: 'Inner paragraph 1',
                },
                {
                  component: PageGeneratorSupportedFields.Paragraph,
                  props: {},
                  innerHTML: 'Inner paragraph 2',
                },
              ],
            },
          ],
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      expect(screen.getByText('Outer paragraph')).toBeInTheDocument();
      expect(screen.getByText('Inner paragraph 1')).toBeInTheDocument();
      expect(screen.getByText('Inner paragraph 2')).toBeInTheDocument();
    });
  });

  describe('Link Component', () => {
    test('renders Link with href and innerHTML', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.Link,
          props: { href: 'https://example.com' },
          innerHTML: 'Visit Example',
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
        />,
      );

      const link = screen.getByRole('link', { name: /visit example/i });
      expect(link).toHaveAttribute('href', 'https://example.com');
    });
  });

  describe('FormDataOnChange Callback', () => {
    test('setState is called when field value changes', () => {
      const fields: PageGeneratorField[] = [
        {
          component: PageGeneratorSupportedFields.TextInput,
          props: {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            value: state.firstName as string,
          },
          validations: [],
        },
      ];

      renderWithProvider(
        <PageGenerator
          as="div"
          fields={fields}
          state={state}
          setState={setState}
          formDataOnChange={formDataOnChange}
        />,
      );

      const input = screen.getByLabelText('First Name');
      fireEvent.change(input, { target: { value: 'Jane' } });

      expect(setStateMock).toHaveBeenCalled();
    });
  });
});
