import {
  PageGeneratorField,
  PageGeneratorState,
  PageGeneratorSupportedFields,
  PageGeneratorStateOptionTypes,
} from '../../types';

const FIELD_MISSING_NAME_OR_ID = 'FIELD_MISSING_NAME_OR_ID';

export const AddFieldToState = (
  field: PageGeneratorField,
  state: PageGeneratorState<PageGeneratorStateOptionTypes>,
) => {
  let key = '';
  switch (field.component) {
    case PageGeneratorSupportedFields.Checkbox:
    case PageGeneratorSupportedFields.ToggleButton:
      key = field.props.name ?? field.props.id ?? FIELD_MISSING_NAME_OR_ID;
      state = {
        ...state,
        [key]: field.props.defaultChecked,
      };
      return state;
    case PageGeneratorSupportedFields.CheckboxGroup:
    case PageGeneratorSupportedFields.ToggleButtonGroup:
      field.children.forEach(child => {
        state = AddFieldToState(child, state);
      });
      return state;
    case PageGeneratorSupportedFields.RadioButton:
    case PageGeneratorSupportedFields.RadioButtonGroup:
    case PageGeneratorSupportedFields.ToggleBar:
    case PageGeneratorSupportedFields.ToggleRadio:
      key = field.props.name ?? field.props.id ?? FIELD_MISSING_NAME_OR_ID;
      state = {
        ...state,
        [key]: field.props.value,
      };
      return state;
    case PageGeneratorSupportedFields.Select:
      key = field.name ?? field.props.id ?? FIELD_MISSING_NAME_OR_ID;
      state = {
        ...state,
        [key]: field.props.defaultValue,
      };
      return state;
    case PageGeneratorSupportedFields.DatePicker:
    case PageGeneratorSupportedFields.TextInput:
    case PageGeneratorSupportedFields.TextArea:
      key = field.props.name ?? field.props.id ?? FIELD_MISSING_NAME_OR_ID;
      state = {
        ...state,
        [key]: field.props.defaultValue,
      };
      return state;
  }
  return state;
};
