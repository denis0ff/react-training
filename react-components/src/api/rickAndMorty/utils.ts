import axios from 'axios';
import { CreateRequestConfig, IFilteredCharacter } from './types';

const BASE = 'https://rickandmortyapi.com/api/';

const CHARACTER = `${BASE}character/`;

export const getFilterUrl = ({ searchWord, status, gender, species }: { [x: string]: string }) =>
  `${CHARACTER}?name=${searchWord}&status=${status}&gender=${gender}&species=${species}`;

export const createRequest = (config: CreateRequestConfig) => {
  const { query, onRequestData, onError, onRequestEnd } = config;
  axios
    .request<IFilteredCharacter>({
      headers: { 'Content-type': 'application/json' },
      baseURL: query,
    })
    .then(({ data }) => {
      data.info.next
        ? getAllData(query, data.info.pages, data, onRequestData)
        : onRequestData(data);
    })
    .catch(({ response }) => {
      if (response.status === 404) onError(response.data.error);
      else if (response.status >= 500) onError('Sorry! Our server is busy. Try later please');
      else onError('Wooops! Something went wrong');
    })
    .finally(() => onRequestEnd && onRequestEnd());
};

const getAllData = async (
  query: string,
  pages: number,
  firstData: IFilteredCharacter,
  onRequestData: (data: IFilteredCharacter) => void
) => {
  let results = [...firstData.results];
  const urlArray = Array.from({ length: pages - 1 }, (_, k) => `${query}&page=${k + 2}`);

  Promise.all(urlArray.map((item) => axios.get(item)))
    .then((resolvedArray) =>
      resolvedArray.forEach(({ data }) => (results = [...results, ...data.results]))
    )
    .then(() => onRequestData({ ...firstData, results }));
};
