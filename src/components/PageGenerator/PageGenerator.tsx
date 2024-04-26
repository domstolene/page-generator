import { getBaseHTMLProps, Grid } from '@norges-domstoler/dds-components';
import { PageGeneratorProps } from '../../types';
import { PageGeneratorTokens } from '../../tokens';
import { PageGeneratorProvider } from './PageGeneratorProvider';
import { GenerateGridChildren } from '../Generate/GenerateGridChildren';

/**
 * Generer komponenter fra @norges-domstoler/dds-components i et Grid view, basert på `fields` propertien. PageGenerator bruker Grid-komponenten fra @norges-domstoler/dds-components, slik at den håndterer alt av riktige marginer, mellomrom og responsivt design.
 * @param props - `fields` inneholder felter eller rader med felter. `stateOnChange` er callback for statehåndtering. `as` setter HTML-element rundt hele PageGenerator.
 */
export const PageGenerator = (props: PageGeneratorProps) => {
  const {
    id,
    className,
    htmlProps,
    fields = [],
    stateOnChange,
    as,
    ...rest
  } = props;

  return (
    <PageGeneratorProvider fields={fields} stateOnChange={stateOnChange}>
      <Grid
        {...getBaseHTMLProps(id, className, htmlProps, rest)}
        as={as}
        rowGap={PageGeneratorTokens.rowGaps}
      >
        <GenerateGridChildren />
      </Grid>
    </PageGeneratorProvider>
  );
};

PageGenerator.displayName = 'PageGenerator';
