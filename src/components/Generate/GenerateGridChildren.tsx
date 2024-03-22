import { useContext } from 'react';
import { PageGeneratorContext } from '../PageGenerator/PageGeneratorContext';
import { GenerateGridChild } from './GenerateGridChild';

export const GenerateGridChildren = () => {
  const { fields } = useContext(PageGeneratorContext);
  return <>{fields.map((obj, index) => GenerateGridChild(obj, index))}</>;
};
