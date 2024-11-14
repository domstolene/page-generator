import { PageGeneratorValidationValue } from './PageGeneratorValidationValue';

export interface PageGeneratorValidation {
  message: string;
  formMessage?: string;
  rule: (value: PageGeneratorValidationValue) => boolean;
}
