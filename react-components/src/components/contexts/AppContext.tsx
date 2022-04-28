import { createContext, Dispatch, FC, useReducer } from 'react';
import { ICharacter } from '../../api/rickAndMorty/types';
import {
  genCardsReducer,
  CollectedActions,
  mainCardsReducer,
  GenCardActions,
  MainCardActions,
  FilterCardActions,
  filterCardsReducer,
  mainPageInfoReducer,
  MainPageInfoActions,
} from '../../utils/reducers/appReducer';
import { FilterValues, ICardGen, MainPageInfo } from '../../utils/types/types';

type InitialStateType = {
  genCards: ICardGen[];
  mainCards: ICharacter[];
  filterCards: FilterValues;
  mainPageInfo: MainPageInfo;
};

const initialState: InitialStateType = {
  genCards: [],
  mainCards: [],
  filterCards: { gender: '', species: '', status: '' },
  mainPageInfo: { current: 1, total: 20, newPages: 1, count: 0 },
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<CollectedActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { genCards, mainCards, filterCards, mainPageInfo }: InitialStateType,
  action: CollectedActions
) => ({
  genCards: genCardsReducer(genCards, action as GenCardActions),
  mainCards: mainCardsReducer(mainCards, action as MainCardActions),
  filterCards: filterCardsReducer(filterCards, action as FilterCardActions),
  mainPageInfo: mainPageInfoReducer(mainPageInfo, action as MainPageInfoActions),
});

const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
