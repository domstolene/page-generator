import { idnr } from '@navikt/fnrvalidator';
import { PageGeneratorValidation } from '../types';

export const RequiredValidator = (
  message?: string,
  formMessage?: string,
): PageGeneratorValidation => {
  return {
    message: message || 'Feltet er påkrevd',
    formMessage: formMessage || 'Feltet er påkrevd',
    rule: (value: string) => value.length > 0,
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
