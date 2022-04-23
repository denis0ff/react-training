import { ICharacter } from '../../api/rickAndMorty/types';
import { FilterValues, ICardGen } from '../types/types';

export enum Actions {
  ADD_GEN_CARD = 'ADD_GEN_CARD',
  SET_MAIN_CARD = 'SET_MAIN_CARD',
  SET_FILTER_CARD = 'SET_FILTER_CARD',
}

type GenCardType = ICardGen;

export type GenCardActions = { type: Actions.ADD_GEN_CARD; payload: GenCardType };

export const genCardsReducer = (state: GenCardType[], action: GenCardActions) => {
  switch (action.type) {
    case Actions.ADD_GEN_CARD: {
      const { fullName, date, country, gender, image } = action.payload;
      return [...state, { fullName, date, country, gender, image }];
    }

    default:
      return state;
  }
};

type MainCardType = ICharacter[];

export type MainCardActions = { type: Actions.SET_MAIN_CARD; payload: MainCardType };

export const mainCardsReducer = (state: MainCardType, action: MainCardActions) => {
  switch (action.type) {
    case Actions.SET_MAIN_CARD:
      return action.payload;

    default:
      return state;
  }
};

type FilterCardType = FilterValues;

export type FilterCardActions = { type: Actions.SET_FILTER_CARD; payload: FilterCardType };

export const filterCardsReducer = (state: FilterCardType, action: FilterCardActions) => {
  switch (action.type) {
    case Actions.SET_FILTER_CARD:
      return action.payload;

    default:
      return state;
  }
};

export type CollectedActions = GenCardActions | MainCardActions | FilterCardActions;
