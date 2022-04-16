import { UseFormRegister } from 'react-hook-form';

export enum Paths {
  MAIN = '/',
  ABOUT_US = 'about-us',
  GENERATOR = 'generator',
  NOT_FOUND = '*',
}

export interface ICard {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
  image: string;
}

export type EmptyProps = Record<string, never>;

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
  register: {
    validate: Partial<ValidateFunction>;
  };
}

export interface FormValues {
  [x: string]: string | boolean | FileList;
  agree: boolean;
  country: string;
  date: string;
  gender: string;
  name: string;
  image: FileList;
}

export interface FormInputProps {
  data: FormField;
  error?: string;
  register: UseFormRegister<FormValues>;
  clearErrors: () => void;
}

export interface IMainState {
  searchWord: string;
}
