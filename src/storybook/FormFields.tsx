import { EmailInput, NinInput, PhoneNumberRow } from '../helpers';
import {
  PageGeneratorField,
  PageGeneratorFormData,
  PageGeneratorRow,
  PageGeneratorSetState,
  PageGeneratorState,
  PageGeneratorSupportedFields,
} from '../types';
import {
  InvalidCharacterValidator,
  EmailValidator,
  getFormErrorMessage,
  NinValidator,
  PhoneNumberValidator,
  RequiredDatePickerValidator,
  RequiredSelectValidator,
  RequiredValidator,
} from '../helpers/Validators';
import { CalendarDate } from '@internationalized/date';
import { ScreenSize } from '@norges-domstoler/dds-components';

export const FormFields = (
  state: PageGeneratorState,
  screenSize: ScreenSize,
  setState: PageGeneratorSetState,
  formData?: PageGeneratorFormData,
): (PageGeneratorField | PageGeneratorRow)[] => {
  return [
    {
      component: PageGeneratorSupportedFields.Heading,
      props: {
        level: 1,
      },
      innerHTML: 'Skjema',
    },
    {
      component: PageGeneratorSupportedFields.Heading,
      props: {
        level: 2,
      },
      innerHTML: 'Personinformasjon',
    },
    {
      component: PageGeneratorSupportedFields.Search,
      props: {
        label: 'Søk',
        value: state.search as string,
        name: 'search',
      },
    },
    NinInput({
      props: {
        value: state.nin as string,
        required: true,
      },
      fieldProps: {
        validations: [
          RequiredValidator(undefined, 'Fødselsnummer er påkrevd'),
          NinValidator,
        ],
      },
    }),
    {
      component: PageGeneratorSupportedFields.TextInput,
      props: {
        label: 'Fritekst',
        type: 'text',
        name: 'fritekst',
        value: state.fritekst as string,
      },
      validations: [InvalidCharacterValidator()],
    },
    {
      component: PageGeneratorSupportedFields.DatePicker,
      props: {
        label: 'Fødselsdato',
        value: state.dateOfBirth as CalendarDate,
        name: 'dateOfBirth',
        isRequired: true,
      },
      name: 'dateOfBirth',
      validations: [
        RequiredDatePickerValidator(undefined, 'Fødselsdato er påkrevd'),
      ],
    },
    {
      component: PageGeneratorSupportedFields.Select,
      props: {
        label: 'Status',
        name: 'status',
        options: [
          { label: 'Glad', value: 'glad' },
          { label: 'Superglad', value: 'superglad' },
        ],
        required: true,
      },
      validations: [RequiredSelectValidator(undefined, 'Status er påkrevd')],
      name: 'status',
    },
    {
      component: PageGeneratorSupportedFields.Heading,
      props: {
        level: 3,
      },
      innerHTML: 'Kontaktinformasjon',
    },
    EmailInput({
      props: {
        value: state.email as string,
      },
      fieldProps: {
        validations: [EmailValidator],
      },
    }),
    PhoneNumberRow(
      screenSize,
      {
        fieldProps: {
          validations: [RequiredValidator(undefined, 'Landkode er påkrevd')],
        },
      },
      {
        fieldProps: {
          validations: [PhoneNumberValidator],
        },
      },
    ),
    {
      component: PageGeneratorSupportedFields.TextArea,
      props: {
        label: 'Adresse',
        name: 'adresse',
        required: true,
        value: state.adresse as string,
      },
      validations: [RequiredValidator(undefined, 'Adresse er påkrevd')],
    },
    {
      component: PageGeneratorSupportedFields.Heading,
      props: {
        level: 4,
      },
      innerHTML: 'Annet',
    },
    {
      component: PageGeneratorSupportedFields.CheckboxGroup,
      props: {
        label: 'Kvalifikasjoner',
      },
      children: [
        {
          component: PageGeneratorSupportedFields.Checkbox,
          props: {
            label: 'Glad',
            value: 'glad',
          },
        },
        {
          component: PageGeneratorSupportedFields.Checkbox,
          props: {
            label: 'Superglad',
            value: 'superglad',
          },
        },
      ],
    },
    {
      component: PageGeneratorSupportedFields.RadioButtonGroup,
      props: {
        label: 'Kjønn',
        name: 'gender',
      },
      children: [
        {
          component: PageGeneratorSupportedFields.RadioButton,
          props: {
            label: 'Mann',
            value: 'mann',
            name: 'gender',
          },
        },
        {
          component: PageGeneratorSupportedFields.RadioButton,
          props: {
            label: 'Kvinne',
            value: 'kvinne',
            name: 'gender',
          },
        },
      ],
    },
    {
      component: PageGeneratorSupportedFields.ToggleBar,
      props: {
        label: 'Ja eller nei',
        name: 'yesno',
      },
      children: [
        {
          component: PageGeneratorSupportedFields.ToggleRadio,
          props: {
            label: 'Ja',
            value: 'yes',
            name: 'yesno',
          },
        },
        {
          component: PageGeneratorSupportedFields.ToggleRadio,
          props: {
            label: 'Nei',
            value: 'no',
            name: 'yesno',
          },
        },
      ],
    },
    {
      component: PageGeneratorSupportedFields.LocalMessage,
      props: {
        purpose: 'danger',
      },
      innerHTML: getFormErrorMessage(formData?.errors || {}),
      hide: !(formData?.submitted && !formData?.valid),
    },
    {
      fields: [
        {
          component: PageGeneratorSupportedFields.Button,
          props: {
            type: 'submit',
          },
          innerHTML: 'Lagre',
        },
        {
          component: PageGeneratorSupportedFields.SplitButton,
          props: {
            primaryAction: {
              children: 'Lagre',
              type: 'submit',
            },
            secondaryActions: [
              {
                children: 'Lagre sekundær',
                type: 'button',
                onClick: event => window.alert('Lagret sekundært!'),
              },
            ],
          },
        },
        {
          component: PageGeneratorSupportedFields.Button,
          props: {
            purpose: 'secondary',
            onClick: event => {
              event.preventDefault();
              console.log('Du superlagret!');
              console.log('current state:', state);
            },
          },
          innerHTML: 'Superlagre',
        },
        {
          component: PageGeneratorSupportedFields.Button,
          props: {
            purpose: 'secondary',
            onClick: event => {
              event.preventDefault();
              setState({
                nin: 'start',
                dateOfBirth: null,
                status: null,
                email: '',
              });
              console.log('current state:', state);
            },
          },
          innerHTML: 'Nullstill',
        },
      ],
    },
  ];
};
