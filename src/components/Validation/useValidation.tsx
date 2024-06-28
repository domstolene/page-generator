import { useEffect, useState } from 'react';
import { PageGeneratorErrors } from '../../types/PageGeneratorErrors';
import { Paragraph, List, ListItem } from '@norges-domstoler/dds-components';

export const useValidation = (errors: PageGeneratorErrors) => {
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const validateErrors = (): boolean => {
      let isValid = true;
      Object.keys(errors).forEach(key => {
        if (errors[key].errors.length > 0) {
          isValid = false;
          return isValid;
        }
      });
      return isValid;
    };
    setValid(validateErrors());
  }, [errors]);

  const getFieldErrorMessage = (name: string): string => {
    let errorMessage = '';
    const obj = errors[name];
    if (obj && obj.errors.length > 0) {
      errorMessage = obj.errors[0].message;
    }
    return errorMessage;
  };

  const getFormErrorMessage = (): JSX.Element => {
    const actualErrors = Object.keys(errors).filter(
      key => errors[key].errors.length > 0,
    );
    const formMessages = actualErrors.map(e => {
      const obj = errors[e];
      return obj.errors[0].formMessage || obj.errors[0].message;
    });

    return (
      <>
        <Paragraph>
          Disse feilene må rettes før du kan sende inn skjemaet:
        </Paragraph>
        <List>
          {formMessages.map((formMessage, index) => {
            return <ListItem key={index}>{formMessage}</ListItem>;
          })}
        </List>
      </>
    );
  };

  return { valid, getFieldErrorMessage, getFormErrorMessage };
};
