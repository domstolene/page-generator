import { describe, expect, test } from 'vitest';
import { ScreenSize } from '@norges-domstoler/dds-components';
import {
  DateOfBirthDatepicker,
  DetailList,
  DetailListRow,
  NameRow,
  NinInput,
  PhoneNumberInput,
  PhoneNumberRow,
  PostalCodeInput,
} from '../helpers/PageGeneratorFields';
import { PageGeneratorSupportedFields } from '../types';

describe('PageGeneratorFields helpers', () => {
  describe('NinInput', () => {
    test('creates TextInput with expected defaults', () => {
      const field = NinInput({});

      expect(field.component).toBe(PageGeneratorSupportedFields.TextInput);
      expect(field.props).toMatchObject({
        label: 'Fødselsnummer',
        type: 'text',
        name: 'nin',
      });
    });

    test('allows overriding props and keeps fieldProps', () => {
      const validations = [{ message: 'Required', rule: () => false }];
      const field = NinInput({
        props: { label: 'Personnummer', value: '123' },
        fieldProps: { hide: true, validations },
      });

      expect(field.props).toMatchObject({
        label: 'Personnummer',
        name: 'nin',
        value: '123',
      });
      expect(field.hide).toBe(true);
      expect((field as { validations?: unknown }).validations).toBe(
        validations,
      );
    });
  });

  describe('DateOfBirthDatepicker', () => {
    test('sets component, default label and field name', () => {
      const field = DateOfBirthDatepicker();

      expect(field.component).toBe(PageGeneratorSupportedFields.DatePicker);
      expect(field.props).toMatchObject({
        label: 'Fødselsdato',
        name: 'dateOfBirth',
      });
      expect((field as { name?: string }).name).toBe('dateOfBirth');
    });
  });

  describe('responsive width fields', () => {
    test('PhoneNumberInput uses 206px on XLarge and above', () => {
      const field = PhoneNumberInput({ screenSize: ScreenSize.XLarge });

      expect(field.props).toMatchObject({
        width: '206px',
        name: 'phoneNumber',
      });
    });

    test('PostalCodeInput uses 214px below XLarge', () => {
      const field = PostalCodeInput({ screenSize: ScreenSize.Large });

      expect(field.props).toMatchObject({ width: '214px', name: 'postalCode' });
    });
  });

  describe('row builders', () => {
    test('NameRow composes first and last name fields and applies row hide', () => {
      const row = NameRow(
        { props: { value: 'Ada' } },
        { props: { value: 'Lovelace' } },
        { hide: true },
      );

      expect(row.hide).toBe(true);
      expect(row.fields).toHaveLength(2);
      expect(row.fields[0].props).toMatchObject({
        name: 'firstName',
        value: 'Ada',
      });
      expect(row.fields[1].props).toMatchObject({
        name: 'lastName',
        value: 'Lovelace',
      });
    });

    test('PhoneNumberRow composes country and phone fields with responsive width', () => {
      const row = PhoneNumberRow(ScreenSize.XLarge);

      expect(row.fields).toHaveLength(2);
      expect(row.fields[0].props).toMatchObject({ name: 'countryCode' });
      expect(row.fields[1].props).toMatchObject({
        name: 'phoneNumber',
        width: '206px',
      });
    });
  });

  describe('detail list builders', () => {
    test('DetailList maps each row to DetailListRow with term/desc children', () => {
      const list = DetailList([
        { term: 'Saksnummer', desc: '24-123456TVI-TOSL/04' },
        { term: 'Status', desc: 'Pågående' },
      ]);

      expect(list.component).toBe(PageGeneratorSupportedFields.DetailList);
      expect(list.children).toHaveLength(2);
      expect(list.children[0].component).toBe(
        PageGeneratorSupportedFields.DetailListRow,
      );
      expect(list.children[0].children[0]).toMatchObject({
        component: PageGeneratorSupportedFields.DetailListTerm,
        innerHTML: 'Saksnummer',
      });
      expect(list.children[0].children[1]).toMatchObject({
        component: PageGeneratorSupportedFields.DetailListDesc,
        innerHTML: '24-123456TVI-TOSL/04',
      });
    });

    test('DetailListRow falls back to dash when desc is null or undefined', () => {
      expect(DetailListRow('Telefon', null)).toEqual({
        term: 'Telefon',
        desc: '-',
      });
      expect(DetailListRow('Telefon')).toEqual({ term: 'Telefon', desc: '-' });
      expect(DetailListRow('Telefon', '12345678')).toEqual({
        term: 'Telefon',
        desc: '12345678',
      });
    });
  });
});
