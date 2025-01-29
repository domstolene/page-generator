import { PageGeneratorValidation } from './PageGeneratorValidation';
import { PageGeneratorValidationValue } from './PageGeneratorValidationValue';

export type PageGeneratorErrors = Record<
  string,
  {
    value: PageGeneratorValidationValue;
    errors: PageGeneratorValidation[];
  }
>;
