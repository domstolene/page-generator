import { describe, expect, test } from 'vitest';
import {
  isFieldWithValidations,
  isMultiValue,
  isPageGeneratorRow,
  isSectionGeneratorRow,
} from '../helpers';
import {
  PageGeneratorSupportedFields,
  PageGeneratorValidation,
} from '../types';

describe('Helper type guards', () => {
  describe('isFieldWithValidations', () => {
    test('returns true when validations exists', () => {
      const fieldWithValidations: Parameters<typeof isFieldWithValidations>[0] =
        {
          component: PageGeneratorSupportedFields.TextInput,
          props: {
            name: 'firstName',
            label: 'First name',
            type: 'text',
            value: '',
          },
          validations: [
            {
              message: 'Required',
              rule: () => true,
            } satisfies PageGeneratorValidation,
          ],
        };

      expect(isFieldWithValidations(fieldWithValidations)).toBe(true);
    });

    test('returns false when validations is undefined', () => {
      const fieldWithoutValidations = {
        component: 'TextInput',
      };

      expect(
        isFieldWithValidations(
          fieldWithoutValidations as Parameters<
            typeof isFieldWithValidations
          >[0],
        ),
      ).toBe(false);
    });

    test('returns null for null input', () => {
      const nullLikeField = null as unknown as Parameters<
        typeof isFieldWithValidations
      >[0];

      expect(isFieldWithValidations(nullLikeField)).toBeNull();
    });
  });

  describe('isMultiValue', () => {
    test('returns true when values exists', () => {
      const multiValueLike: Parameters<typeof isMultiValue>[0] = [];

      expect(isMultiValue(multiValueLike)).toBe(true);
    });

    test('returns false when values is undefined', () => {
      const singleValueLike: Parameters<typeof isMultiValue>[0] = null;

      expect(isMultiValue(singleValueLike)).toBe(false);
    });
  });

  describe('isPageGeneratorRow', () => {
    test('returns true when fields exists', () => {
      const pageGeneratorRowLike = {
        fields: [],
      };

      expect(
        isPageGeneratorRow(
          pageGeneratorRowLike as Parameters<typeof isPageGeneratorRow>[0],
        ),
      ).toBe(true);
    });

    test('returns false when fields is undefined', () => {
      const fieldLike: Parameters<typeof isPageGeneratorRow>[0] = {
        component: PageGeneratorSupportedFields.Divider,
        props: {},
      };

      expect(isPageGeneratorRow(fieldLike)).toBe(false);
    });
  });

  describe('isSectionGeneratorRow', () => {
    test('returns true when fields exists', () => {
      const sectionGeneratorRowLike = {
        fields: [],
      };

      expect(
        isSectionGeneratorRow(
          sectionGeneratorRowLike as Parameters<
            typeof isSectionGeneratorRow
          >[0],
        ),
      ).toBe(true);
    });

    test('returns false when fields is undefined', () => {
      const fieldLike: Parameters<typeof isSectionGeneratorRow>[0] = {
        component: PageGeneratorSupportedFields.Divider,
        props: {},
      };

      expect(isSectionGeneratorRow(fieldLike)).toBe(false);
    });
  });
});
