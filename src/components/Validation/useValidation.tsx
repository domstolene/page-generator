import { useEffect, useState } from 'react';
import { PageGeneratorErrors } from '../../types/PageGeneratorErrors';
import { Paragraph, List, ListItem } from '@norges-domstoler/dds-components';

export const useValidation = (errors: PageGeneratorErrors) => {
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const validateErrors = (): boolean => {
      if (Object.keys(errors).length === 0) {
        return false;
      }
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

  const getFormErrorMessage = (leadText?: string): JSX.Element => {
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
          {leadText || 'Disse feilene må rettes før du kan lagre:'}
        </Paragraph>
        <List>
          {formMessages.map((formMessage, index) => {
            return <ListItem key={index}>{formMessage}</ListItem>;
          })}
        </List>
      </>
    );
  };

  return { valid, getFormErrorMessage };
};
