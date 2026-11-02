import {
  getBaseHTMLProps,
  useScreenSize,
} from '@norges-domstoler/dds-components';
import {
  PageGeneratorField,
  PageGeneratorRow,
  SectionGeneratorProps,
  PageGeneratorState,
} from '../../types';
import React, { JSX, useContext } from 'react';
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
export const SectionGenerator = <TState extends PageGeneratorState>(
  props: SectionGeneratorProps<TState>,
) => {
  const {
    fields = [],
    formDataOnChange,
    state,
    setState,
    as,
    id,
    className,
    style,
    htmlProps,
    ...rest
  } = props;
  const {
    fieldOnChange,
    selectOnChange,
    datePickerOnChange,
    onBlur,
    onBlurSelect,
    validateAllFields,
  } = useContext(PageGeneratorContext);
  const screenSize = useScreenSize();
  const generateGridChildProps: GenerateGridChildProperties = {
    fieldOnChange,
    selectOnChange,
    datePickerOnChange,
    onBlur,
    onBlurSelect,
    screenSize,
  };

  const Parent = (props: { children: (false | JSX.Element)[] }) => {
    if (as === 'div') {
      return (
        <div {...getBaseHTMLProps(id, className, style, htmlProps, rest)}>
          {props.children}
        </div>
      );
    } else if (as === 'form') {
      return (
        <form {...getBaseHTMLProps(id, className, style, htmlProps, rest)}>
          {props.children}
        </form>
      );
    } else if (as === 'fragment') {
      return <React.Fragment>{props.children}</React.Fragment>;
    } else {
      return <></>;
    }
  };

  const children = (validateAllFields: (next: () => void) => void) => {
    return (
      <Parent>
        {fields.map((obj, index) => {
          const isRow = isSectionGeneratorRow(obj);
          return (
            !obj.hide && (
              <React.Fragment key={index}>
                {isRow && (
                  <GenerateRow
                    index={index}
                    fields={(obj as PageGeneratorRow).fields}
                    gridChildProps={generateGridChildProps}
                  />
                )}
                {!isRow && (
                  <GenerateComponent
                    index={index}
                    field={obj as PageGeneratorField}
                    gridChildProps={generateGridChildProps}
                  />
                )}
              </React.Fragment>
            )
          );
        })}
      </Parent>
    );
  };

  return (
    <PageGeneratorProvider
      fields={fields}
      formDataOnChange={formDataOnChange}
      state={state}
      setState={setState}
      children={children}
    />
  );
};

SectionGenerator.displayName = 'SectionGenerator';
