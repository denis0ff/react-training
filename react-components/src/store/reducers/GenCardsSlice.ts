import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICardGen } from '../../utils/types/types';

interface GenCardsState {
  cards: ICardGen[];
}

const initialState: GenCardsState = { cards: [] };

export const genCardsSlice = createSlice({
  name: 'genCards',
  initialState,
  reducers: {
    add(state, action: PayloadAction<ICardGen>) {
      state.cards = [...state.cards, action.payload];
    },
  },
});

export default genCardsSlice.reducer;
