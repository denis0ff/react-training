import axios from 'axios';
import { IFilteredCharacter } from './types';

const BASE = 'https://rickandmortyapi.com/api/';

const CHARACTER = `${BASE}character/`;

export const getCharacterRequest = async (word: string) =>
  axios.get<IFilteredCharacter>(`${CHARACTER}?name=${word.toLowerCase()}`);
