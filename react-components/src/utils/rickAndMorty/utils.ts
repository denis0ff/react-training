import axios, { AxiosResponse } from 'axios';
import { IFilteredCharacter } from './types';

const BASE = 'https://rickandmortyapi.com/api/';

const CHARACTER = `${BASE}character/`;

export const getCharacter = async (word: string): Promise<AxiosResponse<IFilteredCharacter>> => {
  return axios.get(`${CHARACTER}?name=${word.toLowerCase()}`).then(({ data }) => data);
};
