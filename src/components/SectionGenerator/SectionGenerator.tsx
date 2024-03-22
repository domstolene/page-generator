import { getBaseHTMLProps } from '@norges-domstoler/dds-components';
import { SectionGeneratorProps } from '../../types';
import React from 'react';
import { isSectionGeneratorRow } from '../../helpers';
import { GenerateRow } from '../Generate/GenerateRow';
import { GenerateComponent } from '../Generate/GenerateComponent';
import { PageGeneratorProvider } from '../PageGenerator/PageGeneratorProvider';

/**
 * Generer komponenter fra @norges-domstoler/dds-components, basert på `fields` propertien. SectionGenerator legger på en wrapper, basert på `as` propertien.
 * @param props - `fields` inneholder felter eller rader med felter. `stateOnChange` er callback for statehåndtering. `as` setter HTML-element rundt hele SectionGenerator.
 */
export const SectionGenerator = (props: SectionGeneratorProps) => {
  const { fields = [], stateOnChange, as } = props;
  const { id, className, htmlProps, ...rest } = props;

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
    <PageGeneratorProvider fields={fields} stateOnChange={stateOnChange}>
      <Parent>
        {fields.map((obj, index) => {
          const isRow = isSectionGeneratorRow(obj);
          return (
            !obj.hide && (
              <>
                {isRow && GenerateRow(index, obj.fields)}
                {!isRow && GenerateComponent(index, obj)}
              </>
            )
          );
        })}
      </Parent>
    </PageGeneratorProvider>
  );
};

SectionGenerator.displayName = 'SectionGenerator';
