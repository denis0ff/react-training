import {
  validateAgree,
  validateCountry,
  validateDate,
  validateGender,
  validateImage,
  validateName,
} from '../helpers/validation';

export const formFields = {
  fullName: {
    name: 'fullName',
    label: 'Your name',
    register: {
      validate: (value: string) => validateName(value) || 'Incorrect name',
    },
  },

  date: {
    name: 'date',
    label: 'Delivery date',
    register: {
      validate: (value: string) => validateDate(value) || 'Incorrect date',
    },
  },

  country: {
    name: 'country',
    label: 'Country',
    options: ['', 'Belarus', 'Russia', 'Ukraine'],
    register: {
      validate: (value: string) => validateCountry(value) || 'Country should be chosen',
    },
  },

  agree: {
    name: 'agree',
    label: 'I agree with the processing of my data',
    register: {
      validate: (value: boolean) => validateAgree(value) || 'You should agree with the terms',
    },
  },

  gender: {
    name: 'gender',
    options: ['Male', 'Female'],
    register: {
      validate: (value: string | null) => validateGender(value) || 'Please indicate your gender',
    },
  },

  image: {
    name: 'image',
    label: 'Upload image',
    register: {
      validate: (value: FileList | null) =>
        validateImage(value) || 'Download file with 2 MB size limit',
    },
  },
};
