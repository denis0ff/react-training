export enum Paths {
  MAIN = '/',
  ABOUT_US = 'about-us',
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

export interface IStateWord {
  searchWord: string;
}