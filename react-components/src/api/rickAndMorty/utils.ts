import axios from 'axios';
import { CreateRequestConfig, GetAllData, ICharacter, IFilteredCharacter } from './types';

const BASE = 'https://rickandmortyapi.com/api/';

export const CHARACTER = `${BASE}character/`;

export const getFilterUrl = ({ searchWord, status, gender, species }: { [x: string]: string }) =>
  `${CHARACTER}?name=${searchWord}&status=${status}&gender=${gender}&species=${species}`;

export const createRequest = (config: CreateRequestConfig) => {
  const { query, onRequestData, onError, onRequestEnd } = config;
  if (isNaN(+query.replace(CHARACTER, ''))) type T = IFilteredCharacter;
  type D = (data: T) => void;

  axios
    .request({
      headers: { 'Content-type': 'application/json' },
      baseURL: query,
    })

    .then(({ data }) => {
      if (data.info) {
        const onRequestDataTypezed = onRequestData as D;
        data.info.next
          ? getAllData({
              query,
              pages: data.info.pages,
              data,
              onRequestData: onRequestDataTypezed,
              onError,
            })
          : onRequestData(data);
      } else onRequestData(data);
    })

    .catch(({ response }) => {
      if (response.status === 404) onError(response.data.error);
      else if (response.status >= 500) onError('Sorry! Our server is busy. Try later please');
      else onError('Wooops! Something went wrong');
    })

    .finally(() => onRequestEnd && onRequestEnd());
};

const getAllData = ({ query, pages, data, onRequestData, onError }: GetAllData) => {
  let results = [...data.results];
  const urlArray = Array.from({ length: pages - 1 }, (_, k) => `${query}&page=${k + 2}`);

  Promise.all(urlArray.map((item) => axios.get(item)))
    .then((resolvedArray) =>
      resolvedArray.forEach(({ data }) => (results = [...results, ...data.results]))
    )
    .then(() => onRequestData({ ...data, results }));
};
