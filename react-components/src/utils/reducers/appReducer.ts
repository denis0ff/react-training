import { ICharacter } from '../../api/rickAndMorty/types';
import { ICardGen } from '../types/types';

type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: {
    type: Key;
    payload: M[Key];
  };
};

export enum Actions {
  ADD_GEN_CARD = 'ADD_GEN_CARD',
  SET_MAIN_CARD = 'SET_MAIN_CARD',
}

type GenCardType = ICardGen;

type GenCardPayload = {
  [Actions.ADD_GEN_CARD]: ICardGen;
};

export type GenCardActions = ActionMap<GenCardPayload>[keyof ActionMap<GenCardPayload>];

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

type MainCardPayload = {
  [Actions.SET_MAIN_CARD]: ICharacter[];
};

export type MainCardActions = ActionMap<MainCardPayload>[keyof ActionMap<MainCardPayload>];

export const mainCardsReducer = (state: MainCardType, action: MainCardActions) => {
  switch (action.type) {
    case Actions.SET_MAIN_CARD:
      return action.payload;

    default:
      return state;
  }
};

export type CollectedActions = GenCardActions | MainCardActions;
