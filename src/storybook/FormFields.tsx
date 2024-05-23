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

export const FormFields = (
  state: PageGeneratorState,
  setState: PageGeneratorSetState,
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
    NinInput({
      props: {
        value: state.nin as string,
      },
      fieldProps: {
        validations: [
          {
            message: 'Påkrevd',
            rule: (value: string) => {
              return value.length > 0;
            },
          },
          {
            message: 'Må være omg',
            rule: (value: string) => {
              return value === 'omg';
            },
          },
        ],
      },
    }),
    {
      fields: [
        DateOfBirthDatepicker({
          value: state.dateOfBirth as CalendarDate,
        }),
        {
          component: PageGeneratorSupportedFields.Select,
          props: {
            label: 'Status',
            name: 'status',
            options: [
              { label: 'Glad', value: 'glad' },
              { label: 'Superglad', value: 'superglad' },
            ],
          },
          name: 'status',
        },
      ],
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
    }),
    PhoneNumberRow(
      {
        fieldProps: {
          validations: [
            {
              message: 'Må være +47',
              rule: (value: string) => {
                return value === '+47';
              },
            },
          ],
        },
      },
      {
        fieldProps: {
          validations: [
            {
              message: 'Telefonnummer kan bare inneholde tall',
              rule: (value: string) =>
                value.length === 0 || value.match(/^\d+$/) !== null,
            },
          ],
        },
      },
    ),
    {
      component: PageGeneratorSupportedFields.TextArea,
      props: {
        label: 'Adresse',
        name: 'adresse',
      },
      validations: [
        {
          message: 'Må være omg',
          rule: (value: string) => {
            return value === 'omg';
          },
        },
      ],
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
      fields: [
        {
          component: PageGeneratorSupportedFields.Button,
          props: {
            label: 'Lagre',
            type: 'submit',
          },
        },
        {
          component: PageGeneratorSupportedFields.Button,
          props: {
            label: 'Superlagre',
            purpose: 'secondary',
            onClick: event => {
              event.preventDefault();
              console.log('Du superlagret!');
              console.log('current state:', state);
            },
          },
        },
        {
          component: PageGeneratorSupportedFields.Button,
          props: {
            label: 'Nullstill',
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
        },
      ],
    },
  ];
};
