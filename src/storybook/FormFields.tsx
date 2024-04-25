import {
  DateOfBirthDatepicker,
  EmailInput,
  NinInput,
  PhoneNumberRow,
} from '../helpers';
import {
  PageGeneratorField,
  PageGeneratorRow,
  PageGeneratorSupportedFields,
} from '../types';

export const FormFields: (PageGeneratorField | PageGeneratorRow)[] = [
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
      DateOfBirthDatepicker(),
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
  EmailInput({}),
  PhoneNumberRow({
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
  }),
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
          },
        },
      },
    ],
  },
];
