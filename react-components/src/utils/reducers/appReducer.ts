import { countPageAmount, sliceCards } from '../helpers/pagination';
import { FilterValues, ICardGen, MainPageInfo } from '../types/types';

export enum Actions {
  ADD_GEN_CARD = 'ADD_GEN_CARD',
  SET_FILTER_CARD = 'SET_FILTER_CARD',
  SET_MAIN_PAGE_INFO = 'SET_MAIN_PAGE_INFO',
  SET_MAIN_PAGE_TOTAL = 'SET_MAIN_PAGE_TOTAL',
  SET_MAIN_PAGE_CURRENT = 'SET_MAIN_PAGE_CURRENT',
  REJECTED_FETCH = 'REJECTED_FETCH',
  FULFILLED_FETCH = 'FULFILLED_FETCH',
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

type MainPageInfoType = MainPageInfo;

export type MainPageInfoActions = {
  type:
    | Actions.SET_MAIN_PAGE_TOTAL
    | Actions.SET_MAIN_PAGE_CURRENT
    | Actions.FULFILLED_FETCH
    | Actions.REJECTED_FETCH;
  payload: Partial<MainPageInfoType>;
};

export const mainPageInfoReducer = (state: MainPageInfoType, action: MainPageInfoActions) => {
  switch (action.type) {
    case Actions.SET_MAIN_PAGE_TOTAL: {
      const total = Number(action.payload.total);
      const temp = {
        total,
        newPages: countPageAmount(total, state.count),
        current: 1,
        cards: sliceCards(state.results, 1, total),
      };
      return { ...state, ...temp };
    }
    case Actions.SET_MAIN_PAGE_CURRENT: {
      const current = Number(action.payload.current);
      return { ...state, current, cards: sliceCards(state.results, current, state.total) };
    }
    case Actions.FULFILLED_FETCH: {
      const results = action.payload.results || [];
      const current = state.count === action.payload.count ? state.current : 1;
      const count = Number(action.payload.count);
      const pages = Number(action.payload.pages);
      return {
        ...state,
        results,
        current,
        count,
        pages,
        newPages: countPageAmount(state.total, count),
        cards: sliceCards(results, current, state.total),
      };
    }
    case Actions.REJECTED_FETCH:
      return { ...state, cards: [] };
    default:
      return state;
  }
};

export type CollectedActions = GenCardActions | FilterCardActions | MainPageInfoActions;
