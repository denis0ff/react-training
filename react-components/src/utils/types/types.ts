import { Dispatch, SetStateAction } from 'react';

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

export interface IGeneratorState {
  cards: ICardGen[];
}

export interface IFormErrors {
  [x: string]: string | undefined;
}

export interface IFormState {
  errors: IFormErrors;
  cardIsSaved: boolean;
  submitIsDisabled: boolean;
}

export interface IValidationValues {
  fullName: string;
  date: string;
  country: string;
  gender: string;
  image: File | null;
  agree: boolean;
}

export interface IFormInputProps {
  message?: string;
  setError: (x: string) => void;
}
