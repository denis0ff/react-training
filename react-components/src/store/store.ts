import { combineReducers, configureStore } from '@reduxjs/toolkit';
import genCardsReducer from './reducers/GenCardsSlice';
import mainCardsReducer from './reducers/MainCardsSlice';
import filterMainCardsReducer from './reducers/FilterMainCardsSlice';

const rootReducer = combineReducers({ genCardsReducer, mainCardsReducer, filterMainCardsReducer });

export const setupStore = () => {
  return configureStore({ reducer: rootReducer });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
