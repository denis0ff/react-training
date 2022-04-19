import { createContext, Dispatch, FC, useReducer } from 'react';
import { SearchWordActions, searchWordReducer } from '../../utils/reducers/appReducer';

type InitialStateType = {
  searchWord: string;
};

const initialState = {
  searchWord: localStorage.getItem('searchWord') || '',
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<SearchWordActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ searchWord }: InitialStateType, action: SearchWordActions) => ({
  searchWord: searchWordReducer(searchWord, action),
});

const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
