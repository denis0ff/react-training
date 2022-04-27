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

export interface IFilteredCharacter {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: ICharacter[];
}

export interface CreateRequestConfig {
  query: string;
  onRequestData: ((data: IFilteredCharacter) => void) | ((data: ICharacter) => void);
  onRequestEnd?: () => void;
  onError: (error: string) => void;
}

export type GetAllData = {
  query: string;
  pages: number;
  data: IFilteredCharacter;
  onRequestData: (data: IFilteredCharacter) => void;
  onError: (error: string) => void;
};
