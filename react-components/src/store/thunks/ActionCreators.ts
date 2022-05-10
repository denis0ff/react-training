import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GetAllData, IFilteredCharacter } from '../../api/rickAndMorty/types';

export const fetchCharacters = createAsyncThunk(
  'characters/fetch',
  async (query: string, thunkAPI) => {
    try {
      const { data } = await axios.get<IFilteredCharacter>(query);
      if (!data.info.next) return data;
      const allData = await getAllData({ query, pages: data.info.pages, data });
      return allData;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        return thunkAPI.rejectWithValue(e.response.data.error);
      }
      return thunkAPI.rejectWithValue('Unexpected error from server. Try later, please.');
    }
  }
);

const getAllData = async ({ query, pages, data }: GetAllData) => {
  let results = [...data.results];
  const urlArray = Array.from({ length: pages - 1 }, (_, k) => `${query}&page=${k + 2}`);
  return Promise.all(urlArray.map((item) => axios.get(item)))
    .then((resolvedArray) =>
      resolvedArray.forEach(({ data }) => (results = [...results, ...data.results]))
    )
    .then(() => ({ ...data, results }));
};
