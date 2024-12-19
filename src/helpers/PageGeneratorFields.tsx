import {
  TextInputProps,
  DatePickerProps,
  useScreenSize,
  ScreenSize,
} from '@norges-domstoler/dds-components';
import {
  DetailListField,
  PageGeneratorField,
  PageGeneratorRow,
  PageGeneratorSupportedFields,
  TextInputField,
} from '../types';

interface TextInputAndFieldProps {
  props?: TextInputProps;
  fieldProps?: Pick<TextInputField, 'validations' | 'hide'>;
}

/** COMMON FIELDS **/

export const NinInput = ({
  props,
  fieldProps,
}: TextInputAndFieldProps): PageGeneratorField => {
  return {
    component: PageGeneratorSupportedFields.TextInput,
    props: {
      label: 'Fødselsnummer',
      type: 'text',
      name: 'nin',
      ...props,
    },
    ...fieldProps,
  };
};

export const FirstNameInput = ({
  props,
  fieldProps,
}: TextInputAndFieldProps): PageGeneratorField => {
  return {
    component: PageGeneratorSupportedFields.TextInput,
    props: {
      label: 'Fornavn',
      type: 'text',
      name: 'firstName',
      ...props,
    },
    ...fieldProps,
  };
};

export const LastNameInput = ({
  props,
  fieldProps,
}: TextInputAndFieldProps): PageGeneratorField => {
  return {
    component: PageGeneratorSupportedFields.TextInput,
    props: {
      label: 'Etternavn',
      type: 'text',
      name: 'lastName',
      ...props,
    },
    ...fieldProps,
  };
};

export const DateOfBirthDatepicker = (
  props?: DatePickerProps,
): PageGeneratorField => {
  return {
    component: PageGeneratorSupportedFields.DatePicker,
    props: {
      label: 'Fødselsdato',
      name: 'dateOfBirth',
      ...props,
    },
    name: 'dateOfBirth',
  };
};

export const EmailInput = ({
  props,
  fieldProps,
}: TextInputAndFieldProps): PageGeneratorField => {
  return {
    component: PageGeneratorSupportedFields.TextInput,
    props: {
      label: 'E-post',
      name: 'email',
      ...props,
    },
    ...fieldProps,
  };
};

export const StreetNameInput = ({
  props,
  fieldProps,
}: TextInputAndFieldProps): PageGeneratorField => {
  return {
    component: PageGeneratorSupportedFields.TextInput,
    props: {
      label: 'Gatenavn',
      type: 'text',
      name: 'streetName',
      ...props,
    },
    ...fieldProps,
  };
};

export const HouseNumberInput = ({
  props,
  fieldProps,
}: TextInputAndFieldProps): PageGeneratorField => {
  return {
    component: PageGeneratorSupportedFields.TextInput,
    props: {
      label: 'Husnummer',
      width: '90px',
      type: 'text',
      name: 'houseNumber',
      ...props,
    },
    ...fieldProps,
  };
};

export const CountryCodeInput = ({
  props,
  fieldProps,
}: TextInputAndFieldProps): PageGeneratorField => {
  return {
    component: PageGeneratorSupportedFields.TextInput,
    props: {
      label: 'Landkode',
      width: '90px',
      name: 'countryCode',
      tip: 'Husk + foran landkoden',
      ...props,
    },
    ...fieldProps,
  };
};

export const PhoneNumberInput = ({
  props,
  fieldProps,
}: TextInputAndFieldProps): PageGeneratorField => {
  const actualScreenSize = useScreenSize();
  return {
    component: PageGeneratorSupportedFields.TextInput,
    props: {
      label: 'Telefon',
      width: actualScreenSize >= ScreenSize.XLarge ? '206px' : '214px',
      name: 'phoneNumber',
      ...props,
    },
    ...fieldProps,
  };
};

export const PostalNumberInput = ({
  props,
  fieldProps,
}: TextInputAndFieldProps): PageGeneratorField => {
  return {
    component: PageGeneratorSupportedFields.TextInput,
    props: {
      label: 'Postnummer',
      width: '90px',
      name: 'postalNumber',
      ...props,
    },
    ...fieldProps,
  };
};

export const PostalCodeInput = ({
  props,
  fieldProps,
}: TextInputAndFieldProps): PageGeneratorField => {
  const actualScreenSize = useScreenSize();
  return {
    component: PageGeneratorSupportedFields.TextInput,
    props: {
      label: 'Poststed',
      type: 'text',
      width: actualScreenSize >= ScreenSize.XLarge ? '206px' : '214px',
      name: 'postalCode',
      ...props,
    },
    ...fieldProps,
  };
};

/** COMBINED FIELDS (into Rows) **/

export const NameRow = (
  firstNameProps?: TextInputAndFieldProps,
  lastNameProps?: TextInputAndFieldProps,
  rowProps?: Pick<PageGeneratorRow, 'hide'>,
) => {
  return {
    fields: [
      FirstNameInput(firstNameProps || {}),
      LastNameInput(lastNameProps || {}),
    ],
    ...rowProps,
  };
};

export const StreetAddressRow = (
  streetNameProps?: TextInputAndFieldProps,
  houseNumberProps?: TextInputAndFieldProps,
  rowProps?: Pick<PageGeneratorRow, 'hide'>,
) => {
  return {
    fields: [
      StreetNameInput(streetNameProps || {}),
      HouseNumberInput(houseNumberProps || {}),
    ],
    ...rowProps,
  };
};

export const PhoneNumberRow = (
  countryCodeProps?: TextInputAndFieldProps,
  phoneNumberProps?: TextInputAndFieldProps,
  rowProps?: PageGeneratorRow,
) => {
  return {
    fields: [
      CountryCodeInput(countryCodeProps || {}),
      PhoneNumberInput(phoneNumberProps || {}),
    ],
    ...rowProps,
  };
};

export const PostalRow = (
  postalNumberProps?: TextInputAndFieldProps,
  postalCodeProps?: TextInputAndFieldProps,
  rowProps?: Pick<PageGeneratorRow, 'hide'>,
) => {
  return {
    fields: [
      PostalNumberInput(postalNumberProps || {}),
      PostalCodeInput(postalCodeProps || {}),
    ],
    ...rowProps,
  };
};

/* DetailList */

export const DetailList = (
  rows: { term: string; desc: string }[],
): DetailListField => {
  return {
    component: PageGeneratorSupportedFields.DetailList,
    props: {
      striped: false,
      size: 'small',
    },
    children: rows.map(row => {
      return {
        component: PageGeneratorSupportedFields.DetailListRow,
        props: {},
        children: [
          {
            component: PageGeneratorSupportedFields.DetailListTerm,
            props: {},
            innerHTML: row.term,
          },
          {
            component: PageGeneratorSupportedFields.DetailListDesc,
            props: {
              style: {
                textAlign: 'right',
              },
            },
            innerHTML: row.desc,
          },
        ],
      };
    }),
  };
};

export const DetailListRow = (term: string, desc?: string | null) => {
  return {
    term,
    desc: desc || '-',
  };
};
