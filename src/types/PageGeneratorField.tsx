import {
  CardProps,
  CheckboxProps,
  CheckboxGroupProps,
  DatePickerProps,
  DescriptionListProps,
  DescriptionListGroupProps,
  DescriptionListTermProps,
  DescriptionListDescProps,
  DividerProps,
  DrawerProps,
  GlobalMessageProps,
  InputMessageProps,
  ListItemProps,
  ListProps,
  LocalMessageProps,
  RadioButtonProps,
  RadioButtonGroupProps,
  SelectProps,
  SelectOption,
  SpinnerProps,
  TextAreaProps,
  TextInputProps,
  ToggleButtonProps,
  ToggleButtonGroupProps,
  VisuallyHiddenProps,
  DrawerGroupProps,
  StackProps,
  Button,
  HeadingProps,
  LabelProps,
  LinkProps,
  ParagraphProps,
  TypographyProps,
  ToggleBarProps,
  ToggleRadioProps,
  FieldsetProps,
  LegendProps,
  DetailListDescProps,
  DetailListTermProps,
  DetailListRowProps,
  DetailListProps,
  SearchProps,
  SplitButton,
} from '@norges-domstoler/dds-components';
import { PageGeneratorSupportedFields } from './PageGeneratorSupportedFields';
import { ComponentProps, JSX } from 'react';
import { SectionGeneratorRow } from './SectionGeneratorRow';
import { PageGeneratorRow } from './PageGeneratorRow';
import { PageGeneratorValidation } from './PageGeneratorValidation';

export type PageGeneratorField =
  | FieldWithChildren
  | FieldWithoutChildren
  | FieldWithValidations;

type FieldWithChildren =
  | CheckboxGroupField
  | DescriptionListField
  | DescriptionListGroupField
  | DetailListField
  | DetailListRowField
  | DrawerGroupField
  | FieldsetField
  | HStackField
  | ListField
  | RadioButtonGroupField
  | ToggleBarField
  | ToggleButtonGroupField
  | VStackField;

type FieldWithoutChildren =
  | ButtonField
  | CardField
  | CheckboxField
  | DescriptionListTermField
  | DescriptionListDescField
  | DetailListDescField
  | DetailListTermField
  | DividerField
  | DrawerField
  | GlobalMessageField
  | HeadingField
  | InputMessageField
  | LabelField
  | LegendField
  | LinkField
  | ListItemField
  | LocalMessageField
  | ParagraphField
  | RadioButtonField
  | SearchField
  | SpinnerField
  | SplitButtonField
  | ToggleButtonField
  | ToggleRadioField
  | TypographyField
  | VisuallyHiddenField;

export type FieldWithValidations =
  | DatepickerField
  | TextInputField
  | TextAreaField
  | SelectField;

interface ButtonField {
  component: PageGeneratorSupportedFields.Button;
  props: ComponentProps<typeof Button>;
  hide?: boolean;
  innerHTML: JSX.Element | string;
}

interface CardField {
  component: PageGeneratorSupportedFields.Card;
  props: CardProps;
  hide?: boolean;
  innerHTML?: JSX.Element | string;
  children?: (PageGeneratorField | SectionGeneratorRow)[];
}

interface CheckboxField {
  component: PageGeneratorSupportedFields.Checkbox;
  props: CheckboxProps;
  hide?: boolean;
}

interface CheckboxGroupField {
  component: PageGeneratorSupportedFields.CheckboxGroup;
  props: CheckboxGroupProps;
  hide?: boolean;
  children: CheckboxField[];
}

interface DatepickerField {
  component: PageGeneratorSupportedFields.DatePicker;
  props: DatePickerProps;
  name: string;
  hide?: boolean;
  validations?: PageGeneratorValidation[];
}

interface DescriptionListField {
  component: PageGeneratorSupportedFields.DescriptionList;
  props: DescriptionListProps;
  hide?: boolean;
  children: DescriptionListGroupField[];
}

export interface DescriptionListGroupField {
  component: PageGeneratorSupportedFields.DescriptionListGroup;
  props: DescriptionListGroupProps;
  hide?: boolean;
  children: (DescriptionListTermField | DescriptionListDescField)[];
}

interface DescriptionListTermField {
  component: PageGeneratorSupportedFields.DescriptionListTerm;
  props: DescriptionListTermProps;
  hide?: boolean;
  innerHTML: JSX.Element | string;
}

interface DescriptionListDescField {
  component: PageGeneratorSupportedFields.DescriptionListDesc;
  props: DescriptionListDescProps;
  hide?: boolean;
  innerHTML: JSX.Element | string;
}

export interface DetailListField {
  component: PageGeneratorSupportedFields.DetailList;
  props: DetailListProps;
  hide?: boolean;
  children: DetailListRowField[];
}

export interface DetailListRowField {
  component: PageGeneratorSupportedFields.DetailListRow;
  props: DetailListRowProps;
  hide?: boolean;
  children: (DetailListTermField | DetailListDescField)[];
}

export interface DetailListTermField {
  component: PageGeneratorSupportedFields.DetailListTerm;
  props: DetailListTermProps;
  hide?: boolean;
  innerHTML: JSX.Element | string;
}

export interface DetailListDescField {
  component: PageGeneratorSupportedFields.DetailListDesc;
  props: DetailListDescProps;
  hide?: boolean;
  innerHTML: JSX.Element | string;
}

interface DividerField {
  component: PageGeneratorSupportedFields.Divider;
  props: DividerProps;
  hide?: boolean;
}

interface DrawerField {
  component: PageGeneratorSupportedFields.Drawer;
  props: DrawerProps;
  hide?: boolean;
  innerHTML?: JSX.Element | string;
}

interface DrawerGroupField {
  component: PageGeneratorSupportedFields.DrawerGroup;
  props: DrawerGroupProps;
  hide?: boolean;
  children: (ButtonField | DrawerField)[];
}

interface FieldsetField {
  component: PageGeneratorSupportedFields.Fieldset;
  props: FieldsetProps;
  hide?: boolean;
  children: (PageGeneratorField | PageGeneratorRow)[];
}

interface GlobalMessageField {
  component: PageGeneratorSupportedFields.GlobalMessage;
  props: GlobalMessageProps;
  hide?: boolean;
  innerHTML?: JSX.Element | string;
}

interface HeadingField {
  component: PageGeneratorSupportedFields.Heading;
  props: HeadingProps;
  hide?: boolean;
  innerHTML?: JSX.Element | string;
}

interface HStackField {
  component: PageGeneratorSupportedFields.HStack;
  props: StackProps;
  hide?: boolean;
  children: PageGeneratorField[];
}

interface InputMessageField {
  component: PageGeneratorSupportedFields.InputMessage;
  props: InputMessageProps;
  hide?: boolean;
}

interface LabelField {
  component: PageGeneratorSupportedFields.Label;
  props: LabelProps;
  hide?: boolean;
  innerHTML?: JSX.Element | string;
}

interface LegendField {
  component: PageGeneratorSupportedFields.Legend;
  props: LegendProps;
  hide?: boolean;
  innerHTML?: JSX.Element | string;
}

interface LinkField {
  component: PageGeneratorSupportedFields.Link;
  props: LinkProps;
  hide?: boolean;
  innerHTML?: JSX.Element | string;
}

interface ListItemField {
  component: PageGeneratorSupportedFields.ListItem;
  props?: ListItemProps;
  hide?: boolean;
  innerHTML?: JSX.Element | string;
}

interface ListField {
  component: PageGeneratorSupportedFields.List;
  props?: ListProps;
  hide?: boolean;
  children: ListItemField[];
}

interface LocalMessageField {
  component: PageGeneratorSupportedFields.LocalMessage;
  props: LocalMessageProps;
  hide?: boolean;
  innerHTML?: JSX.Element | string;
}

interface ParagraphField {
  component: PageGeneratorSupportedFields.Paragraph;
  props: ParagraphProps;
  hide?: boolean;
  innerHTML?: JSX.Element | string;
}

interface RadioButtonField {
  component: PageGeneratorSupportedFields.RadioButton;
  props: RadioButtonProps;
  hide?: boolean;
}

interface RadioButtonGroupField {
  component: PageGeneratorSupportedFields.RadioButtonGroup;
  props: RadioButtonGroupProps<string | number>;
  hide?: boolean;
  children: RadioButtonField[];
}

interface SearchField {
  component: PageGeneratorSupportedFields.Search;
  props: SearchProps;
  hide?: boolean;
}

interface SelectField {
  component: PageGeneratorSupportedFields.Select;
  props: SelectProps<SelectOption<unknown>, boolean>;
  name: string;
  validations?: PageGeneratorValidation[];
  hide?: boolean;
}

interface SpinnerField {
  component: PageGeneratorSupportedFields.Spinner;
  props: SpinnerProps;
  hide?: boolean;
}

interface SplitButtonField {
  component: PageGeneratorSupportedFields.SplitButton;
  props: ComponentProps<typeof SplitButton>;
  hide?: boolean;
}

interface TextAreaField {
  component: PageGeneratorSupportedFields.TextArea;
  props: TextAreaProps;
  validations?: PageGeneratorValidation[];
  hide?: boolean;
}

export interface TextInputField {
  component: PageGeneratorSupportedFields.TextInput;
  props: TextInputProps;
  validations?: PageGeneratorValidation[];
  hide?: boolean;
}

interface ToggleBarField {
  component: PageGeneratorSupportedFields.ToggleBar;
  props: ToggleBarProps<string>;
  hide?: boolean;
  children: ToggleRadioField[];
}

interface ToggleRadioField {
  component: PageGeneratorSupportedFields.ToggleRadio;
  props: ToggleRadioProps;
  hide?: boolean;
}

interface ToggleButtonField {
  component: PageGeneratorSupportedFields.ToggleButton;
  props: ToggleButtonProps;
  hide?: boolean;
}

interface ToggleButtonGroupField {
  component: PageGeneratorSupportedFields.ToggleButtonGroup;
  props: ToggleButtonGroupProps;
  hide?: boolean;
  children: ToggleButtonField[];
}

interface TypographyField {
  component: PageGeneratorSupportedFields.Typography;
  props: TypographyProps;
  hide?: boolean;
  innerHTML: JSX.Element | string;
}

interface VisuallyHiddenField {
  component: PageGeneratorSupportedFields.VisuallyHidden;
  props: VisuallyHiddenProps;
  hide?: boolean;
  innerHTML: JSX.Element | string;
}

interface VStackField {
  component: PageGeneratorSupportedFields.VStack;
  props: StackProps;
  hide?: boolean;
  children: PageGeneratorField[];
}
