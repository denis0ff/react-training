import { UseFormRegister } from 'react-hook-form';

export enum Paths {
  MAIN = '/',
  ABOUT_US = 'about-us',
  GENERATOR = 'generator',
  NOT_FOUND = '*',
}

export interface ICardGen {
  fullName: string;
  date: string;
  country: string;
  gender: string;
  image: string;
}

type ValidateFunction =
  | ((x: string | null) => boolean)
  | ((x: boolean) => boolean)
  | ((x: FileList | null) => boolean);

export interface FormField {
  name: string;
  label?: string;
  options?: string[];
  register?: {
    validate: Partial<ValidateFunction>;
  };
}

export type FormValues = {
  [x: string]: string | boolean | FileList;
  agree: boolean;
  country: string;
  date: string;
  gender: string;
  fullName: string;
  image: FileList;
};

export type FilterValues = { [x: string]: string; gender: string; status: string; species: string };

export type FormInputProps = {
  data: FormField;
  error?: string;
  register: UseFormRegister<FormValues> | UseFormRegister<FilterValues>;
  clearErrors?: () => void;
  setValue?: () => void;
};

export interface MainPageInfo {
  total: number;
  current: number;
  newPages: number;
  pages: number;
}
