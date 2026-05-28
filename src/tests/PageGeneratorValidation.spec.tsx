import { describe, test, expect } from 'vitest';
import { PageGeneratorValidationValue, PageGeneratorErrors } from '../types';
import {
  RequiredValidator,
  RequiredSelectValidator,
  RequiredDatePickerValidator,
  NumbersOnlyValidator,
  InvalidCharacterValidator,
  NinValidator,
  PhoneNumberValidator,
  EmailValidator,
  getFormErrorMessage,
} from '../helpers/Validators';
import { CalendarDate } from '@internationalized/date';

describe('Validators', () => {
  describe('RequiredValidator', () => {
    test('returns validator with custom message', () => {
      const validator = RequiredValidator(
        'Custom message',
        'Custom form message',
      );
      expect(validator.message).toBe('Custom message');
      expect(validator.formMessage).toBe('Custom form message');
    });

    test('returns validator with default message', () => {
      const validator = RequiredValidator();
      expect(validator.message).toBe('Feltet er påkrevd');
      expect(validator.formMessage).toBe('Feltet er påkrevd');
    });

    test('validates empty string as invalid', () => {
      const validator = RequiredValidator();
      expect(validator.rule('' as PageGeneratorValidationValue)).toBe(false);
    });

    test('validates non-empty string as valid', () => {
      const validator = RequiredValidator();
      expect(validator.rule('John' as PageGeneratorValidationValue)).toBe(true);
    });

    test('validates string with spaces as valid', () => {
      const validator = RequiredValidator();
      expect(validator.rule('   ' as PageGeneratorValidationValue)).toBe(true);
    });
  });

  describe('RequiredSelectValidator', () => {
    test('validates empty array as invalid', () => {
      const validator = RequiredSelectValidator();
      expect(
        validator.rule([] as unknown as PageGeneratorValidationValue),
      ).toBe(false);
    });

    test('validates non-empty array as valid', () => {
      const validator = RequiredSelectValidator();
      expect(
        validator.rule([
          { label: 'Option', value: 'option' },
        ] as unknown as PageGeneratorValidationValue),
      ).toBe(true);
    });

    test('validates null/undefined as invalid', () => {
      const validator = RequiredSelectValidator();
      expect(
        validator.rule(null as unknown as PageGeneratorValidationValue),
      ).toBe(false);
      expect(
        validator.rule(undefined as unknown as PageGeneratorValidationValue),
      ).toBe(false);
    });

    test('validates select option as valid', () => {
      const validator = RequiredSelectValidator();
      expect(
        validator.rule({
          label: 'Option',
          value: 'option',
        } as PageGeneratorValidationValue),
      ).toBe(true);
    });
  });

  describe('RequiredDatePickerValidator', () => {
    test('validates null/undefined as invalid', () => {
      const validator = RequiredDatePickerValidator();
      expect(
        validator.rule(null as unknown as PageGeneratorValidationValue),
      ).toBe(false);
      expect(
        validator.rule(undefined as unknown as PageGeneratorValidationValue),
      ).toBe(false);
    });

    test('validates CalendarDate as valid', () => {
      const validator = RequiredDatePickerValidator();
      const date = new CalendarDate(2025, 5, 27);
      expect(
        validator.rule(date as unknown as PageGeneratorValidationValue),
      ).toBe(true);
    });
  });

  describe('NumbersOnlyValidator', () => {
    test('returns validator with custom message', () => {
      const validator = NumbersOnlyValidator('Custom message');
      expect(validator.message).toBe('Custom message');
    });

    test('validates empty string as valid (allows empty)', () => {
      const validator = NumbersOnlyValidator();
      expect(validator.rule('' as PageGeneratorValidationValue)).toBe(true);
    });

    test('validates numeric string as valid', () => {
      const validator = NumbersOnlyValidator();
      expect(validator.rule('12345' as PageGeneratorValidationValue)).toBe(
        true,
      );
    });

    test('validates string with non-numeric characters as invalid', () => {
      const validator = NumbersOnlyValidator();
      expect(validator.rule('123abc' as PageGeneratorValidationValue)).toBe(
        false,
      );
    });

    test('validates string with special characters as invalid', () => {
      const validator = NumbersOnlyValidator();
      expect(validator.rule('123-456' as PageGeneratorValidationValue)).toBe(
        false,
      );
    });

    test('validates string with spaces as invalid', () => {
      const validator = NumbersOnlyValidator();
      expect(validator.rule('123 456' as PageGeneratorValidationValue)).toBe(
        false,
      );
    });
  });

  describe('InvalidCharacterValidator', () => {
    test('returns validator with custom message', () => {
      const validator = InvalidCharacterValidator('Custom message');
      expect(validator.message).toBe('Custom message');
    });

    test('validates empty string as valid (allows empty)', () => {
      const validator = InvalidCharacterValidator();
      expect(validator.rule('' as PageGeneratorValidationValue)).toBe(true);
    });

    test('validates string without special characters as valid', () => {
      const validator = InvalidCharacterValidator();
      expect(validator.rule('John Doe' as PageGeneratorValidationValue)).toBe(
        true,
      );
    });

    test('validates string with underscore as invalid', () => {
      const validator = InvalidCharacterValidator();
      expect(validator.rule('john_doe' as PageGeneratorValidationValue)).toBe(
        false,
      );
    });

    test('validates string with colons as invalid', () => {
      const validator = InvalidCharacterValidator();
      expect(validator.rule('12:30' as PageGeneratorValidationValue)).toBe(
        false,
      );
    });

    test('validates string with semicolons as invalid', () => {
      const validator = InvalidCharacterValidator();
      expect(validator.rule('test;value' as PageGeneratorValidationValue)).toBe(
        false,
      );
    });

    test('validates string with angle brackets as invalid', () => {
      const validator = InvalidCharacterValidator();
      expect(validator.rule('<script>' as PageGeneratorValidationValue)).toBe(
        false,
      );
    });

    test('validates string with currency symbols as invalid', () => {
      const validator = InvalidCharacterValidator();
      expect(
        validator.rule('price: $100' as PageGeneratorValidationValue),
      ).toBe(false);
    });
  });

  describe('PhoneNumberValidator', () => {
    test('validates empty string as valid (allows empty)', () => {
      expect(
        PhoneNumberValidator.rule('' as PageGeneratorValidationValue),
      ).toBe(true);
    });

    test('validates numeric phone number as valid', () => {
      expect(
        PhoneNumberValidator.rule('98765432' as PageGeneratorValidationValue),
      ).toBe(true);
    });

    test('validates phone number with +47 prefix as invalid', () => {
      expect(
        PhoneNumberValidator.rule(
          '+4798765432' as PageGeneratorValidationValue,
        ),
      ).toBe(false);
    });

    test('validates phone number with spaces as invalid', () => {
      expect(
        PhoneNumberValidator.rule('9876 5432' as PageGeneratorValidationValue),
      ).toBe(false);
    });

    test('validates phone number with dashes as invalid', () => {
      expect(
        PhoneNumberValidator.rule(
          '98-76-54-32' as PageGeneratorValidationValue,
        ),
      ).toBe(false);
    });
  });

  describe('EmailValidator', () => {
    test('validates empty string as valid (allows empty)', () => {
      expect(EmailValidator.rule('' as PageGeneratorValidationValue)).toBe(
        true,
      );
    });

    test('validates valid email as valid', () => {
      expect(
        EmailValidator.rule('john@example.com' as PageGeneratorValidationValue),
      ).toBe(true);
    });

    test('validates email with multiple dots as valid', () => {
      expect(
        EmailValidator.rule(
          'john.doe@example.co.uk' as PageGeneratorValidationValue,
        ),
      ).toBe(true);
    });

    test('validates email with hyphen as valid', () => {
      expect(
        EmailValidator.rule(
          'john-doe@example.com' as PageGeneratorValidationValue,
        ),
      ).toBe(true);
    });

    test('validates email with underscore as valid', () => {
      expect(
        EmailValidator.rule(
          'john_doe@example.com' as PageGeneratorValidationValue,
        ),
      ).toBe(true);
    });

    test('validates email without @ as invalid', () => {
      expect(
        EmailValidator.rule('johnexample.com' as PageGeneratorValidationValue),
      ).toBe(false);
    });

    test('validates email without domain as invalid', () => {
      expect(EmailValidator.rule('john@' as PageGeneratorValidationValue)).toBe(
        false,
      );
    });

    test('validates email with spaces as invalid', () => {
      expect(
        EmailValidator.rule(
          'john @example.com' as PageGeneratorValidationValue,
        ),
      ).toBe(false);
    });

    test('validates email with single letter TLD as invalid', () => {
      expect(
        EmailValidator.rule('john@example.c' as PageGeneratorValidationValue),
      ).toBe(false);
    });
  });

  describe('NinValidator', () => {
    test('validates empty string as valid (allows empty)', () => {
      expect(NinValidator.rule('' as PageGeneratorValidationValue)).toBe(true);
    });

    test('validates invalid Norwegian birth number as invalid', () => {
      expect(
        NinValidator.rule('12345678901' as PageGeneratorValidationValue),
      ).toBe(false);
    });

    test('validates string with letters as invalid', () => {
      expect(
        NinValidator.rule('1105712345a' as PageGeneratorValidationValue),
      ).toBe(false);
    });
  });

  describe('getFormErrorMessage', () => {
    test('renders error message with default lead text', () => {
      const errors: PageGeneratorErrors = {
        firstName: {
          value: '' as PageGeneratorValidationValue,
          errors: [RequiredValidator()],
        },
      };

      const message = getFormErrorMessage(errors);
      expect(message).toBeDefined();
    });

    test('renders error message with custom lead text', () => {
      const errors: PageGeneratorErrors = {
        firstName: {
          value: '' as PageGeneratorValidationValue,
          errors: [RequiredValidator()],
        },
      };

      const message = getFormErrorMessage(errors, 'Custom lead text');
      expect(message).toBeDefined();
    });

    test('handles multiple errors', () => {
      const errors: PageGeneratorErrors = {
        firstName: {
          value: '' as PageGeneratorValidationValue,
          errors: [
            RequiredValidator(
              'First name is required',
              'First name is required',
            ),
          ],
        },
        email: {
          value: '' as PageGeneratorValidationValue,
          errors: [EmailValidator],
        },
      };

      const message = getFormErrorMessage(errors);
      expect(message).toBeDefined();
    });

    test('ignores fields without errors', () => {
      const errors: PageGeneratorErrors = {
        firstName: {
          value: 'John' as PageGeneratorValidationValue,
          errors: [],
        },
        email: {
          value: '' as PageGeneratorValidationValue,
          errors: [EmailValidator],
        },
      };

      const message = getFormErrorMessage(errors);
      expect(message).toBeDefined();
    });
  });
});
