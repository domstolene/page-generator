import { PageGeneratorValidation } from './PageGeneratorField';

export type PageGeneratorErrors = Record<
  string,
  {
    value: string;
    errors: PageGeneratorValidation[];
  }
>;
