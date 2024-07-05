import {
  PageGeneratorField,
  PageGeneratorRow,
  PageGeneratorSupportedFields,
} from '../types';

export const FieldsetFields: (PageGeneratorField | PageGeneratorRow)[] = [
  {
    component: PageGeneratorSupportedFields.Fieldset,
    props: {},
    children: [
      {
        component: PageGeneratorSupportedFields.Legend,
        props: {
          withMargins: true,
        },
        innerHTML: 'Personinformasjon',
      },
      {
        component: PageGeneratorSupportedFields.TextInput,
        props: {
          label: 'Fødselsnummer',
          name: 'nin',
        },
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
      {
        fields: [
          {
            component: PageGeneratorSupportedFields.DatePicker,
            props: {
              label: 'Fødselsdato',
              name: 'dateOfBirth',
            },
            name: 'dateOfBirth',
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
            },
            name: 'status',
          },
        ],
      },
    ],
  },
  {
    component: PageGeneratorSupportedFields.Fieldset,
    props: {},
    children: [
      {
        component: PageGeneratorSupportedFields.Legend,
        props: {
          withMargins: true,
        },
        innerHTML: 'Kontaktinformasjon',
      },
      {
        component: PageGeneratorSupportedFields.TextInput,
        props: {
          label: 'E-post',
          name: 'email',
        },
      },
      {
        fields: [
          {
            component: PageGeneratorSupportedFields.TextInput,
            props: {
              label: 'Landkode',
              width: '90px',
              name: 'countryCode',
            },
            validations: [
              {
                message: 'Må være +47',
                rule: (value: string) => {
                  return value === '+47';
                },
              },
            ],
          },
          {
            component: PageGeneratorSupportedFields.TextInput,
            props: {
              label: 'Telefon',
              name: 'phoneNumber',
            },
          },
        ],
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
              },
            },
            innerHTML: 'Superlagre',
          },
        ],
      },
    ],
  },
];
