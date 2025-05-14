import {
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListDesc,
  DescriptionListTerm,
  Divider,
  Drawer,
  DrawerGroup,
  Fieldset,
  GlobalMessage,
  InputMessage,
  Legend,
  List,
  ListItem,
  LocalMessage,
  RadioButton,
  ScreenSize,
  RadioButtonGroup,
  Select,
  Spinner,
  TextArea,
  TextInput,
  ToggleButton,
  ToggleButtonGroup,
  VisuallyHidden,
  HStack,
  VStack,
  Heading,
  Label,
  Link,
  Paragraph,
  Typography,
  ToggleBar,
  ToggleRadio,
  DetailList,
  DetailListRow,
  DetailListDesc,
  DetailListTerm,
  Search,
  SplitButton,
  Tooltip,
} from '@norges-domstoler/dds-components';
import { PageGeneratorField, PageGeneratorSupportedFields } from '../../types';
import { ChangeEvent } from 'react';
import { SectionGenerator } from '../../components';
import {
  GenerateGridChild,
  GenerateGridChildProperties,
} from './GenerateGridChild';
import '../../styles/page-generator-fieldset.css';
import '../../styles/search-icon.css';

interface GenerateComponentProps {
  index: number;
  field: PageGeneratorField;
  gridChildProps: GenerateGridChildProperties;
}

export const GenerateComponent = (props: GenerateComponentProps) => {
  const { index, field, gridChildProps } = props;
  const {
    fieldOnChange,
    selectOnChange,
    datePickerOnChange,
    onBlur,
    onBlurSelect,
    screenSize,
  } = gridChildProps;

  const inputFieldOnChange = (
    event: ChangeEvent<HTMLInputElement & Record<string, never>>,
  ) => fieldOnChange(event);
  const textAreaFieldOnChange = (
    event: ChangeEvent<HTMLTextAreaElement & Record<string, never>>,
  ) => fieldOnChange(event);

  const GridStyling = {
    marginLeft: undefined,
    marginRight: undefined,
  };

  switch (field.component) {
    case PageGeneratorSupportedFields.Button:
      return (
        <Button {...field.props} key={index}>
          {field.innerHTML}
        </Button>
      );
    case PageGeneratorSupportedFields.Card:
      if (field.innerHTML) {
        return (
          <Card {...field.props} key={index}>
            {field.innerHTML}
          </Card>
        );
      } else if (field.children) {
        <Card {...field.props} key={index}>
          <SectionGenerator as="fragment" fields={field.children} />
        </Card>;
      }
      return <></>;
    case PageGeneratorSupportedFields.Checkbox:
      return (
        <Checkbox {...field.props} key={index} onChange={inputFieldOnChange} />
      );
    case PageGeneratorSupportedFields.CheckboxGroup:
      return (
        <CheckboxGroup {...field.props} key={index}>
          {field.children.map((child, childIndex) => {
            return (
              !child.hide && (
                <GenerateComponent
                  key={childIndex}
                  index={childIndex}
                  field={child}
                  gridChildProps={props.gridChildProps}
                />
              )
            );
          })}
        </CheckboxGroup>
      );
    case PageGeneratorSupportedFields.DatePicker:
      return (
        <DatePicker
          {...field.props}
          key={index}
          onChange={value => datePickerOnChange(value, field.name)}
          onBlur={_event => {
            onBlurSelect(field.name);
          }}
        />
      );
    case PageGeneratorSupportedFields.DescriptionList:
      return (
        <DescriptionList {...field.props} key={index}>
          {field.children.map((child, childIndex) => {
            return (
              !child.hide && (
                <GenerateComponent
                  key={childIndex}
                  index={childIndex}
                  field={child}
                  gridChildProps={props.gridChildProps}
                />
              )
            );
          })}
        </DescriptionList>
      );
    case PageGeneratorSupportedFields.DescriptionListGroup:
      return (
        <DescriptionListGroup {...field.props} key={index}>
          {field.children.map((child, childIndex) => {
            return (
              !child.hide && (
                <GenerateComponent
                  key={childIndex}
                  index={childIndex}
                  field={child}
                  gridChildProps={props.gridChildProps}
                />
              )
            );
          })}
        </DescriptionListGroup>
      );
    case PageGeneratorSupportedFields.DescriptionListDesc:
      return (
        <DescriptionListDesc {...field.props} key={index}>
          {field.innerHTML}
        </DescriptionListDesc>
      );
    case PageGeneratorSupportedFields.DescriptionListTerm:
      return (
        <DescriptionListTerm {...field.props} key={index}>
          {field.innerHTML}
        </DescriptionListTerm>
      );
    case PageGeneratorSupportedFields.DetailList:
      return (
        <DetailList {...field.props} key={index}>
          {field.children.map((child, childIndex) => {
            return (
              !child.hide && (
                <GenerateComponent
                  key={childIndex}
                  index={childIndex}
                  field={child}
                  gridChildProps={props.gridChildProps}
                />
              )
            );
          })}
        </DetailList>
      );
    case PageGeneratorSupportedFields.DetailListRow:
      return (
        <DetailListRow {...field.props} key={index}>
          {field.children.map((child, childIndex) => {
            return (
              !child.hide && (
                <GenerateComponent
                  key={childIndex}
                  index={childIndex}
                  field={child}
                  gridChildProps={props.gridChildProps}
                />
              )
            );
          })}
        </DetailListRow>
      );
    case PageGeneratorSupportedFields.DetailListDesc:
      return (
        <DetailListDesc {...field.props} key={index}>
          {field.innerHTML}
        </DetailListDesc>
      );
    case PageGeneratorSupportedFields.DetailListTerm:
      return (
        <DetailListTerm {...field.props} key={index}>
          {field.innerHTML}
        </DetailListTerm>
      );
    case PageGeneratorSupportedFields.Divider:
      return <Divider {...field.props} key={index} />;
    case PageGeneratorSupportedFields.Drawer:
      return (
        <Drawer {...field.props} key={index}>
          {field.innerHTML}
        </Drawer>
      );
    case PageGeneratorSupportedFields.DrawerGroup:
      return (
        <DrawerGroup {...field.props} key={index}>
          {field.children.map((child, childIndex) => {
            return (
              !child.hide && (
                <GenerateComponent
                  key={childIndex}
                  index={childIndex}
                  field={child}
                  gridChildProps={props.gridChildProps}
                />
              )
            );
          })}
        </DrawerGroup>
      );
    case PageGeneratorSupportedFields.Fieldset:
      return (
        <Fieldset
          {...field.props}
          htmlProps={{
            ...field.props.htmlProps,
            className: 'page-generator-fieldset',
            style: {
              ...GridStyling,
            },
          }}
          key={index}
        >
          {field.children.map((child, childIndex) => {
            if ((child as PageGeneratorField).component === 'Legend') {
              return (
                <GenerateComponent
                  key={childIndex}
                  index={childIndex}
                  field={child as PageGeneratorField}
                  gridChildProps={props.gridChildProps}
                />
              );
            } else {
              return (
                <GenerateGridChild
                  key={childIndex}
                  obj={child}
                  index={childIndex}
                />
              );
            }
          })}
        </Fieldset>
      );
    case PageGeneratorSupportedFields.GlobalMessage:
      return (
        <GlobalMessage {...field.props} key={index}>
          {field.innerHTML}
        </GlobalMessage>
      );
    case PageGeneratorSupportedFields.Heading:
      return (
        <Heading {...field.props} key={index}>
          {field.innerHTML}
        </Heading>
      );
    case PageGeneratorSupportedFields.HStack:
      return (
        <HStack {...field.props} key={index}>
          {field.children.map((child, childIndex) => {
            return (
              !child.hide && (
                <GenerateComponent
                  key={childIndex}
                  index={childIndex}
                  field={child}
                  gridChildProps={props.gridChildProps}
                />
              )
            );
          })}
        </HStack>
      );
    case PageGeneratorSupportedFields.InputMessage:
      return <InputMessage {...field.props} key={index} />;
    case PageGeneratorSupportedFields.Label:
      return (
        <Label {...field.props} key={index}>
          {field.innerHTML}
        </Label>
      );
    case PageGeneratorSupportedFields.Legend:
      return (
        <Legend {...field.props} key={index}>
          {field.innerHTML}
        </Legend>
      );
    case PageGeneratorSupportedFields.Link:
      return (
        <Link {...field.props} key={index}>
          {field.innerHTML}
        </Link>
      );
    case PageGeneratorSupportedFields.List:
      return (
        <List {...field.props} key={index}>
          {field.children.map((child, childIndex) => {
            return (
              !child.hide && (
                <GenerateComponent
                  key={childIndex}
                  index={childIndex}
                  field={child}
                  gridChildProps={props.gridChildProps}
                />
              )
            );
          })}
        </List>
      );
    case PageGeneratorSupportedFields.ListItem:
      return (
        <ListItem {...field.props} key={index}>
          {field.innerHTML}
        </ListItem>
      );
    case PageGeneratorSupportedFields.LocalMessage:
      return (
        <LocalMessage {...field.props} key={index}>
          {field.innerHTML}
        </LocalMessage>
      );
    case PageGeneratorSupportedFields.Paragraph:
      return (
        <Paragraph {...field.props} key={index}>
          {field.innerHTML}
        </Paragraph>
      );
    case PageGeneratorSupportedFields.RadioButton:
      return (
        <RadioButton
          {...field.props}
          key={index}
          onChange={inputFieldOnChange}
        />
      );
    case PageGeneratorSupportedFields.RadioButtonGroup:
      field.props.direction = screenSize > ScreenSize.XSmall ? 'row' : 'column';
      return (
        <RadioButtonGroup {...field.props} key={index}>
          {field.children.map((child, childIndex) => {
            return (
              !child.hide && (
                <GenerateComponent
                  key={childIndex}
                  index={childIndex}
                  field={child}
                  gridChildProps={props.gridChildProps}
                />
              )
            );
          })}
        </RadioButtonGroup>
      );
    case PageGeneratorSupportedFields.Search:
      return (
        <Search
          {...field.props}
          key={index}
          onChange={inputFieldOnChange}
          onBlur={onBlur}
          className="page-generator-search"
        />
      );
    case PageGeneratorSupportedFields.Select:
      return (
        <Select
          {...field.props}
          key={index}
          onChange={option => selectOnChange(option, field.name)}
          onBlur={_event => {
            onBlurSelect(field.name);
          }}
        />
      );
    case PageGeneratorSupportedFields.Spinner:
      return <Spinner {...field.props} key={index} />;
    case PageGeneratorSupportedFields.SplitButton:
      return <SplitButton {...field.props} key={index} />;
    case PageGeneratorSupportedFields.TextArea:
      return (
        <TextArea
          {...field.props}
          key={index}
          onChange={textAreaFieldOnChange}
          onBlur={onBlur}
        />
      );
    case PageGeneratorSupportedFields.TextInput:
      return (
        <TextInput
          {...field.props}
          key={index}
          onChange={inputFieldOnChange}
          onBlur={onBlur}
        />
      );
    case PageGeneratorSupportedFields.ToggleBar:
      return (
        <ToggleBar {...field.props} key={index}>
          {field.children.map((child, childIndex) => {
            return (
              !child.hide && (
                <GenerateComponent
                  key={childIndex}
                  index={childIndex}
                  field={child}
                  gridChildProps={props.gridChildProps}
                />
              )
            );
          })}
        </ToggleBar>
      );
    case PageGeneratorSupportedFields.ToggleButton:
      return (
        <ToggleButton
          {...field.props}
          key={index}
          onChange={inputFieldOnChange}
        />
      );
    case PageGeneratorSupportedFields.ToggleButtonGroup:
      return (
        <ToggleButtonGroup {...field.props} key={index}>
          {field.children.map((child, childIndex) => {
            return (
              !child.hide && (
                <GenerateComponent
                  key={childIndex}
                  index={childIndex}
                  field={child}
                  gridChildProps={props.gridChildProps}
                />
              )
            );
          })}
        </ToggleButtonGroup>
      );
    case PageGeneratorSupportedFields.ToggleRadio:
      return (
        <ToggleRadio
          {...field.props}
          key={index}
          onChange={inputFieldOnChange}
        />
      );
    case PageGeneratorSupportedFields.Tooltip:
      return (
        <Tooltip {...field.props} key={index}>
          {field.props.children}
        </Tooltip>
      );
    case PageGeneratorSupportedFields.Typography:
      return (
        <Typography {...field.props} key={index}>
          {field.innerHTML}
        </Typography>
      );
    case PageGeneratorSupportedFields.VisuallyHidden:
      return (
        <VisuallyHidden {...field.props} key={index}>
          {field.innerHTML}
        </VisuallyHidden>
      );
    case PageGeneratorSupportedFields.VStack:
      return (
        <VStack {...field.props} key={index}>
          {field.children.map((child, childIndex) => {
            return (
              !child.hide && (
                <GenerateComponent
                  key={childIndex}
                  index={childIndex}
                  field={child}
                  gridChildProps={props.gridChildProps}
                />
              )
            );
          })}
        </VStack>
      );
    default:
      return <></>;
  }
};
