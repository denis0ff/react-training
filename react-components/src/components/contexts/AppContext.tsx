import { createContext, Dispatch, FC, useReducer } from 'react';
import { ICharacter } from '../../api/rickAndMorty/types';
import {
  genCardsReducer,
  CollectedActions,
  mainCardsReducer,
  GenCardActions,
  MainCardActions,
} from '../../utils/reducers/appReducer';
import { ICardGen } from '../../utils/types/types';

type InitialStateType = {
  genCards: ICardGen[];
  mainCards: ICharacter[];
};

const initialState = {
  genCards: [],
  mainCards: [],
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<CollectedActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ genCards, mainCards }: InitialStateType, action: CollectedActions) => ({
  genCards: genCardsReducer(genCards, action as GenCardActions),
  mainCards: mainCardsReducer(mainCards, action as MainCardActions),
});

const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
