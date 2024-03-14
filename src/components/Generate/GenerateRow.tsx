import { HStack, useScreenSize } from '@norges-domstoler/dds-components';
import { PageGeneratorField } from '../../types';
import { PageGeneratorTokens } from '../../tokens';
import { GenerateComponent } from './GenerateComponent';

export const GenerateRow = (index: number, fields: PageGeneratorField[]) => {
  const screenSize = useScreenSize();
  return (
    <HStack
      gap={PageGeneratorTokens.Stack[screenSize] || 0}
      htmlProps={{ style: { flexWrap: 'wrap' } }}
      key={index}
    >
      {fields.map((field, childIndex) => {
        return !field.hide && GenerateComponent(childIndex, field);
      })}
    </HStack>
  );
};
