import { createContext, Dispatch, FC, useReducer } from 'react';
import { CardGenActions, cardGenReducer, dispatchActions } from '../../utils/reducers/appReducer';
import { ICardGen } from '../../utils/types/types';

type InitialStateType = {
  genCards: ICardGen[];
};

const initialState = {
  genCards: [],
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<dispatchActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ genCards }: InitialStateType, action: CardGenActions) => ({
  genCards: cardGenReducer(genCards, action),
});

const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
