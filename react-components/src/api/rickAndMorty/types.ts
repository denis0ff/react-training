export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export type Info = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export interface IFilteredCharacter {
  info: Info;
  results: ICharacter[];
}

export type GetAllData = {
  query: string;
  pages: number;
  data: IFilteredCharacter;
};

export type CharacterInfo = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
  total: number;
  current: number;
  newPages: number;
};
