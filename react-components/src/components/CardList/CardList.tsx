import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Card from './components/Card';
import './CardList.css';
import { IFilteredCharacter } from '../../api/rickAndMorty/types';
import { createRequest, getFilterUrl } from '../../api/rickAndMorty/utils';
import Loading from '../layouts/Loading';
import { AppContext } from '../contexts/AppContext';
import { Actions } from '../../utils/reducers/appReducer';
import { countPageAmount, sliceCards } from '../../utils/helpers/pagination';

interface Props {
  searchWord: string;
}

const CardList = ({ searchWord }: Props) => {
  const { state, dispatch } = useContext(AppContext);
  const isFirstInit = useRef(true);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState('');
  const isMount = useRef(false);

  const totalPages = useRef(state.mainPageInfo.total);
  const isCards = useRef(() => state.mainCards.length !== 0);

  const onRequestEnd = () => {
    if (isMount.current) setIsPending(false);
  };
  const onError = useCallback(
    (error: string) => {
      if (isMount.current) {
        setMessage(error);
        dispatch({ type: Actions.SET_MAIN_CARD, payload: [] });
        dispatch({
          type: Actions.SET_MAIN_PAGE_INFO,
          payload: {
            newPages: 1,
            count: 1,
          },
        });
      }
    },
    [dispatch]
  );

  const onRequestData = useCallback(
    (data: IFilteredCharacter) => {
      if (isMount.current) {
        dispatch({ type: Actions.SET_MAIN_CARD, payload: data.results });
        dispatch({
          type: Actions.SET_MAIN_PAGE_INFO,
          payload: {
            newPages: countPageAmount(totalPages.current, data.info.count),
            count: data.info.count,
          },
        });
      }
    },
    [dispatch]
  );

  const updateList = useCallback(() => {
    setIsPending(true);
    isMount.current = true;

    const query = getFilterUrl({
      searchWord,
      gender: state.filterCards.gender,
      status: state.filterCards.status,
      species: state.filterCards.species,
    });

    createRequest({ query, onRequestData, onError, onRequestEnd });
  }, [onError, onRequestData, searchWord, state.filterCards]);

  useEffect(() => {
    if (!(isFirstInit.current && isCards.current())) updateList();

    return () => {
      isMount.current = false;
      isFirstInit.current = false;
    };
  }, [updateList]);

  return (
    <>
      {isPending && <Loading />}
      {!state.mainCards.length && !isPending && <h3 data-testid="not-found">{message}</h3>}
      <ul className="card_list">
        {!isPending &&
          !!state.mainCards.length &&
          sliceCards(state.mainCards, state.mainPageInfo.current, state.mainPageInfo.total).map(
            (item) => <Card key={item.id + item.name} data={item} />
          )}
      </ul>
    </>
  );
};

export default CardList;
