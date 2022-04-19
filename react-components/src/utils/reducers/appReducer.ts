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
  SET_WORD = 'SET_WORD',
}

type SearchWordPayload = {
  [Actions.SET_WORD]: string;
};

export type SearchWordActions = ActionMap<SearchWordPayload>[keyof ActionMap<SearchWordPayload>];

export const searchWordReducer = (state: string, action: SearchWordActions) => {
  switch (action.type) {
    case Actions.SET_WORD:
      return action.payload;
    default:
      return state;
  }
};
