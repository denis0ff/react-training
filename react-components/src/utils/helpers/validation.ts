import { IFormErrors, IValidationValues } from '../types/types';

export const validateForm = (values: IValidationValues) => {
  const errors: IFormErrors = {};

  if (!validateName(values.fullName)) errors.fullName = 'Incorrect name';

  if (!validateDate(values.date)) errors.date = 'Incorrect date';

  if (!validateGender(values.gender)) errors.gender = 'Please indicate your gender';

  if (!validateCountry(values.country)) errors.country = 'Country should be chosen';

  if (!validateFile(values.image)) errors.image = 'Download file with 2 MB size limit';

  if (!validateAgree(values.agree)) errors.agree = 'You should agree with the terms';

  return errors;
};

const validateName = (value: string) => /^[a-z '-]+$/i.test(value) && value.length >= 2;

const validateDate = (value: string) => {
  const now = new Date();
  const date = new Date(value);
  return date > now;
};

const validateGender = (value: string) => value !== '';

const validateCountry = (value: string) => value !== '';

const validateFile = (value: File | null) => value && value.size <= 2 * 1024 * 1024;

const validateAgree = (value: boolean) => value;
