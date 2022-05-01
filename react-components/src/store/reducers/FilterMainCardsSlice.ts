import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Filters = {
  gender: string;
  status: string;
  species: string;
};

interface FilterMainCardsState {
  searchWord: string;
  filters: Filters;
}

const initialState: FilterMainCardsState = {
  searchWord: '',
  filters: { gender: '', status: '', species: '' },
};

export const filterMainCardsSlice = createSlice({
  name: 'filterMainCards',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Filters>) {
      state.filters.gender = action.payload.gender;
      state.filters.status = action.payload.status;
      state.filters.species = action.payload.species;
    },
    setSearchWord(state, action: PayloadAction<string>) {
      state.searchWord = action.payload;
    },
  },
});

export default filterMainCardsSlice.reducer;
