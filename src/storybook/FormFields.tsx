import { useValidation } from '../components/Validation/useValidation';
import {
  DateOfBirthDatepicker,
  EmailInput,
  NinInput,
  PhoneNumberRow,
} from '../helpers';
import {
  PageGeneratorField,
  PageGeneratorRow,
  PageGeneratorSetState,
  PageGeneratorState,
  PageGeneratorSupportedFields,
} from '../types';
import { CalendarDate } from '@internationalized/date';
import { PageGeneratorErrors } from '../types/PageGeneratorErrors';
import {
  EmailValidator,
  NinValidator,
  PhoneNumberValidator,
  RequiredSelectValidator,
  RequiredValidator,
} from '../helpers/Validators';

export const FormFields = (
  state: PageGeneratorState,
  setState: PageGeneratorSetState,
  errors: PageGeneratorErrors,
  formSubmitted: boolean,
): (PageGeneratorField | PageGeneratorRow)[] => {
  const { valid, getFormErrorMessage } = useValidation(errors);

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
    NinInput({
      props: {
        value: state.nin as string,
      },
      fieldProps: {
        validations: [
          RequiredValidator(undefined, 'Fødselsnummer er påkrevd'),
          NinValidator,
        ],
      },
    }),
    {
      fields: [
        DateOfBirthDatepicker({
          value: state.dateOfBirth as CalendarDate,
        }),
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
      validations: [RequiredSelectValidator()],
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
      innerHTML: getFormErrorMessage(),
      hide: !(formSubmitted && !valid),
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
