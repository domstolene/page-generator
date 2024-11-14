import { PageGeneratorValidation } from './PageGeneratorValidation';
import { PageGeneratorSelectOption } from './PageGeneratorSelectOption';

export type PageGeneratorErrors = Record<
  string,
  {
    value: string | PageGeneratorSelectOption;
    errors: PageGeneratorValidation[];
  }
>;
