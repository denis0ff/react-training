import { ICardGen } from '../types/types';

type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Actions {
  ADD = 'ADD_CARD_GEN',
}

type CardGenType = ICardGen;

type CardGenPayload = {
  [Actions.ADD]: ICardGen;
};

export type CardGenActions = ActionMap<CardGenPayload>[keyof ActionMap<CardGenPayload>];

export const cardGenReducer = (state: CardGenType[], action: CardGenActions) => {
  switch (action.type) {
    case Actions.ADD: {
      const { fullName, date, country, gender, image } = action.payload;
      return [...state, { fullName, date, country, gender, image }];
    }

    default:
      return state;
  }
};

export type dispatchActions = CardGenActions;
