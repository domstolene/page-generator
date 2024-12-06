import { PageGeneratorErrorMessages } from './PageGeneratorErrorMessages';
import { PageGeneratorErrors } from './PageGeneratorErrors';

export interface PageGeneratorFormData {
  errors: PageGeneratorErrors | null;
  errorMessages: PageGeneratorErrorMessages | null;
  submitted: boolean;
  touched: boolean;
  valid: boolean;
}
