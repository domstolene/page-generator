import {
  getBaseHTMLProps,
  useScreenSize,
} from '@norges-domstoler/dds-components';
import { SectionGeneratorProps } from '../../types';
import React, { useContext } from 'react';
import { isSectionGeneratorRow } from '../../helpers';
import { GenerateRow } from '../Generate/GenerateRow';
import { GenerateComponent } from '../Generate/GenerateComponent';
import { PageGeneratorProvider } from '../PageGenerator/PageGeneratorProvider';
import { PageGeneratorContext } from '../PageGenerator/PageGeneratorContext';
import { GenerateGridChildProperties } from '../Generate/GenerateGridChild';

/**
 * Generer komponenter fra @norges-domstoler/dds-components, basert på `fields` propertien. SectionGenerator legger på en wrapper, basert på `as` propertien.
 * @param props - `fields` inneholder felter eller rader med felter. `errorsOnChange` er callback for statehåndtering. `as` setter HTML-element rundt hele SectionGenerator.
 */
export const SectionGenerator = (props: SectionGeneratorProps) => {
  const { fields = [], errorsOnChange, as } = props;
  const { id, className, htmlProps, ...rest } = props;
  const { fieldOnChange, selectOnChange, datePickerOnChange, onBlur } =
    useContext(PageGeneratorContext);
  const screenSize = useScreenSize();
  const generateGridChildProps: GenerateGridChildProperties = {
    fieldOnChange,
    selectOnChange,
    datePickerOnChange,
    onBlur,
    screenSize,
  };

  const Parent = (props: { children: (false | JSX.Element)[] }) => {
    if (as === 'div') {
      return (
        <div {...getBaseHTMLProps(id, className, htmlProps, rest)}>
          {props.children}
        </div>
      );
    } else if (as === 'form') {
      return (
        <form {...getBaseHTMLProps(id, className, htmlProps, rest)}>
          {props.children}
        </form>
      );
    } else if (as === 'fragment') {
      return <React.Fragment>{props.children}</React.Fragment>;
    } else {
      return <></>;
    }
  };

  return (
    <PageGeneratorProvider fields={fields} errorsOnChange={errorsOnChange}>
      <Parent>
        {fields.map((obj, index) => {
          const isRow = isSectionGeneratorRow(obj);
          return (
            !obj.hide && (
              <React.Fragment key={index}>
                {isRow &&
                  GenerateRow(index, obj.fields, generateGridChildProps)}
                {!isRow &&
                  GenerateComponent(index, obj, generateGridChildProps)}
              </React.Fragment>
            )
          );
        })}
      </Parent>
    </PageGeneratorProvider>
  );
};

SectionGenerator.displayName = 'SectionGenerator';
