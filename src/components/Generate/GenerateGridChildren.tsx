import { useContext } from 'react';
import { PageGeneratorContext } from '../PageGenerator/PageGeneratorContext';
import { GenerateGridChild } from './GenerateGridChild';
import { PageGeneratorRow } from '../../types/PageGeneratorRow';
import { PageGeneratorField } from '../../types';

export const GenerateGridChildren = () => {
  const { fields } = useContext(PageGeneratorContext);
  return (
    <>
      {fields.map((obj: PageGeneratorField | PageGeneratorRow, index) => (
        <GenerateGridChild key={index} obj={obj} index={index} />
      ))}
    </>
  );
};
