export const validateName = (value: string) => /^[a-z '-]+$/i.test(value) && value.length >= 2;

export const validateDate = (value: string) => new Date(value) > new Date();

export const validateCountry = (value: string) => value !== '';

export const validateAgree = (value: boolean) => value;

export const validateGender = (value: string | null) => !!value;

export const validateImage = (value: FileList | null) =>
  value !== null && value[0] && value[0].size <= 2 * 1024 * 1024;
