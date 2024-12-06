import { HStack } from '@norges-domstoler/dds-components';
import { PageGeneratorField } from '../../types';
import { PageGeneratorTokens } from '../../tokens';
import { GenerateComponent } from './GenerateComponent';
import { GenerateGridChildProperties } from './GenerateGridChild';
import { isFieldWithValidations } from '../../helpers';
import { useContext } from 'react';
import { PageGeneratorContext } from '../PageGenerator/PageGeneratorContext';

interface GenerateRowProps {
  index: number;
  fields: PageGeneratorField[];
  gridChildProps: GenerateGridChildProperties;
}

export const GenerateRow = (props: GenerateRowProps) => {
  const { index, fields, gridChildProps } = props;
  const { formData } = useContext(PageGeneratorContext);
  return (
    <HStack
      gap={PageGeneratorTokens.Stack[gridChildProps.screenSize] || 0}
      align="flex-start"
      htmlProps={{ style: { flexWrap: 'wrap' } }}
      key={index}
    >
      {fields.map((field, childIndex) => {
        if (
          isFieldWithValidations(field) &&
          field.props.name &&
          formData.errorMessages
        ) {
          field.props = {
            ...field.props,
            errorMessage: formData.errorMessages[field.props.name],
          };
        }
        return (
          !field.hide && (
            <GenerateComponent
              key={childIndex}
              index={childIndex}
              field={field}
              gridChildProps={gridChildProps}
            />
          )
        );
      })}
    </HStack>
  );
};
