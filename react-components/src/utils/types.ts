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
  firstName: string;
  date: string;
  country: string;
  gender: string;
  image: string;
}

export interface IGeneratorState {
  cards: ICardGen[];
}
