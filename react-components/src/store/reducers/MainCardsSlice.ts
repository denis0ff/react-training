import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharacter, CharacterInfo, IFilteredCharacter } from '../../api/rickAndMorty/types';
import { countPageAmount, sliceCards } from '../../utils/helpers/pagination';
import { fetchCharacters } from '../thunks/ActionCreators';

interface MainCardsState {
  info: CharacterInfo;
  results: ICharacter[];
  cards: ICharacter[];
  isLoading: boolean;
  error: string;
}

const info = {
  count: 1,
  pages: 1,
  next: null,
  prev: null,
  total: 20,
  current: 1,
  newPages: 1,
};

const initialState: MainCardsState = { cards: [], results: [], isLoading: false, error: '', info };

export const mainCardsSlice = createSlice({
  name: 'mainCards',
  initialState,
  reducers: {
    setTotal(state, action: PayloadAction<number>) {
      state.info.total = action.payload;
      state.info.newPages = countPageAmount(state.info.total, state.info.count);
      state.info.current = 1;
      state.cards = sliceCards(state.results, state.info.current, state.info.total);
    },
    setCurrent(state, action: PayloadAction<number>) {
      state.info.current = action.payload;
      state.cards = sliceCards(state.results, state.info.current, state.info.total);
    },
  },
  extraReducers: {
    [fetchCharacters.fulfilled.type]: (state, action: PayloadAction<IFilteredCharacter>) => {
      state.isLoading = false;
      state.error = '';
      state.results = action.payload.results;
      state.info.current = state.info.count === action.payload.info.count ? state.info.current : 1;
      state.info.count = action.payload.info.count;
      state.info.pages = action.payload.info.pages;
      state.info.newPages = countPageAmount(state.info.total, action.payload.info.count);
      state.cards = sliceCards(state.results, state.info.current, state.info.total);
    },
    [fetchCharacters.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchCharacters.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.cards = [];
    },
  },
});

export default mainCardsSlice.reducer;
