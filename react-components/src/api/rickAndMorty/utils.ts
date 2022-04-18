import axios from 'axios';
import { CreateRequestConfig, IFilteredCharacter } from './types';

const BASE = 'https://rickandmortyapi.com/api/';

const CHARACTER = `${BASE}character/`;

export const createRequest = (config: CreateRequestConfig) => {
  const { query, onRequestData, onError, onRequestEnd } = config;
  axios
    .request<IFilteredCharacter>({
      headers: { 'Content-type': 'application/json' },
      baseURL: `${CHARACTER}?name=${query.toLowerCase()}`,
    })
    .then(({ data }) => onRequestData(data))
    .catch(({ response }) => {
      if (response.status === 404) onError(response.data.error);
      else if (response.status >= 500) onError('Sorry! Our server is busy. Try later please');
      else onError('Wooops! Something went wrong');
    })
    .finally(() => onRequestEnd && onRequestEnd());
};
