import { HStack } from '@norges-domstoler/dds-components';
import { PageGeneratorField } from '../../types';
import { PageGeneratorTokens } from '../../tokens';
import { GenerateComponent } from './GenerateComponent';
import { GenerateGridChildProperties } from './GenerateGridChild';

export const GenerateRow = (
  index: number,
  fields: PageGeneratorField[],
  props: GenerateGridChildProperties,
) => {
  return (
    <HStack
      gap={PageGeneratorTokens.Stack[props.screenSize] || 0}
      align="flex-start"
      htmlProps={{ style: { flexWrap: 'wrap' } }}
      key={index}
    >
      {fields.map((field, childIndex) => {
        return !field.hide && GenerateComponent(childIndex, field, props);
      })}
    </HStack>
  );
};
