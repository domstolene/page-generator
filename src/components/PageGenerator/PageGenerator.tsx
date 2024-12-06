import { getBaseHTMLProps, Grid } from '@norges-domstoler/dds-components';
import { PageGeneratorProps } from '../../types';
import { PageGeneratorTokens } from '../../tokens';
import { PageGeneratorProvider } from './PageGeneratorProvider';
import { GenerateGridChildren } from '../Generate/GenerateGridChildren';
import { FormEvent } from 'react';

/**
 * Generer komponenter fra @norges-domstoler/dds-components i et Grid view, basert på `fields` propertien. PageGenerator bruker Grid-komponenten fra @norges-domstoler/dds-components, slik at den håndterer alt av riktige marginer, mellomrom og responsivt design.
 * @param props - `fields` inneholder felter eller rader med felter. `errorsOnChange` er callback for errorhåndtering. `as` setter HTML-element rundt hele PageGenerator.
 */
export const PageGenerator = (props: PageGeneratorProps) => {
  const {
    id,
    className,
    htmlProps,
    fields = [],
    formDataOnChange,
    state,
    setState,
    as,
    onSubmit,
    ...rest
  } = props;

  const children = (validateAllFields: (next: () => void) => void) => {
    return (
      <Grid
        {...getBaseHTMLProps(id, className, htmlProps, rest)}
        as={as}
        rowGap={PageGeneratorTokens.rowGaps}
        htmlProps={{
          ...htmlProps,
          ...(onSubmit
            ? {
                onSubmit: (event: FormEvent) => {
                  event.preventDefault();
                  if (onSubmit) {
                    validateAllFields(onSubmit);
                  }
                },
              }
            : {}),
        }}
      >
        <GenerateGridChildren />
      </Grid>
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

PageGenerator.displayName = 'PageGenerator';
