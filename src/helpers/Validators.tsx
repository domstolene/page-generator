import { idnr } from '@navikt/fnrvalidator';
import {
  PageGeneratorErrors,
  PageGeneratorSelectOption,
  PageGeneratorValidation,
} from '../types';
import { Paragraph, List, ListItem } from '@norges-domstoler/dds-components';
import { CalendarDate } from '@internationalized/date';
import { JSX } from 'react';

export const RequiredValidator = (
  message?: string,
  formMessage?: string,
): PageGeneratorValidation => {
  return {
    message: message || 'Feltet er påkrevd',
    formMessage: formMessage || 'Feltet er påkrevd',
    rule: (value: string) => !!value && value.length > 0,
  };
};

export const RequiredSelectValidator = (
  message?: string,
  formMessage?: string,
): PageGeneratorValidation => {
  return {
    message: message || 'Feltet er påkrevd',
    formMessage: formMessage || 'Feltet er påkrevd',
    rule: (value: PageGeneratorSelectOption) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return !!value;
    },
  };
};

export const RequiredDatePickerValidator = (
  message?: string,
  formMessage?: string,
): PageGeneratorValidation => {
  return {
    message: message || 'Feltet er påkrevd',
    formMessage: formMessage || 'Feltet er påkrevd',
    rule: (value: CalendarDate) => !!value,
  };
};

export const NumbersOnlyValidator = (
  message?: string,
  formMessage?: string,
): PageGeneratorValidation => {
  return {
    message: message || 'Feltet kan bare inneholde tall',
    formMessage: formMessage || 'Feltet kan bare inneholde tall',
    rule: (value: string) =>
      value.length > 0 ? value.match(/^\d+$/) !== null : true,
  };
};

export const InvalidCharacterValidator = (
  message?: string,
  formMessage?: string,
) => {
  return {
    message: message || 'Feltet inneholder ugyldige tegn',
    formMessage: formMessage || 'Feltet inneholder ugyldige tegn',
    rule: (value: string) =>
      value.length > 0
        ? value.match(/[_:;<>§€!©"™#£$%∞&§/\\|[{}\]=≈+?±´`¨^@*'~]/g) === null
        : true,
  };
};

export const NinValidator: PageGeneratorValidation = {
  message: 'Fødselsnummer er ugyldig',
  formMessage: 'Fødselsnummer er ugyldig',
  rule: (value: string) => {
    if (value.length > 0) {
      const result = idnr(value);
      return result.status === 'valid';
    }
    return true;
  },
};

export const PhoneNumberValidator: PageGeneratorValidation = {
  message: 'Kan bare inneholde tall',
  formMessage: 'Telefonnummer kan bare inneholde tall',
  rule: (value: string) =>
    value.length > 0 ? value.match(/^\d+$/) !== null : true,
};

export const EmailValidator: PageGeneratorValidation = {
  message: 'E-post er ugyldig',
  formMessage: 'E-post er ugyldig',
  rule: (value: string) =>
    value.length > 0
      ? value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) !== null
      : true,
};

export const getFormErrorMessage = (
  errors: PageGeneratorErrors,
  leadText?: string,
): JSX.Element => {
  const actualErrors = Object.keys(errors).filter(
    key => errors[key].errors.length > 0,
  );
  const formMessages = actualErrors.map(e => {
    const obj = errors[e];
    return obj.errors[0].formMessage || obj.errors[0].message;
  });

  return (
    <>
      <Paragraph>
        {leadText || 'Disse feilene må rettes før du kan lagre:'}
      </Paragraph>
      <List>
        {formMessages.map((formMessage, index) => {
          return <ListItem key={index}>{formMessage}</ListItem>;
        })}
      </List>
    </>
  );
};
