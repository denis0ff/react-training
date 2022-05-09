import { useCallback, useContext, useEffect, useState } from 'react';
import Card from './components/Card';
import './CardList.css';
import { IFilteredCharacter } from '../../api/rickAndMorty/types';
import { createRequest, getFilterUrl } from '../../api/rickAndMorty/utils';
import Loading from '../layouts/Loading';
import { AppContext } from '../contexts/AppContext';
import { Actions } from '../../utils/reducers/appReducer';

interface Props {
  searchWord: string;
}

const CardList = ({ searchWord }: Props) => {
  const { state, dispatch } = useContext(AppContext);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState('');

  const onRequestEnd = () => {
    setIsPending(false);
  };
  const onError = useCallback(
    (error: string) => {
      setMessage(error);
      dispatch({
        type: Actions.REJECTED_FETCH,
        payload: {},
      });
    },
    [dispatch]
  );

  const onRequestData = useCallback(
    (data: IFilteredCharacter) => {
      dispatch({
        type: Actions.FULFILLED_FETCH,
        payload: {
          results: data.results,
          count: data.info.count,
          pages: data.info.pages,
        },
      });
    },
    [dispatch]
  );
  useEffect(() => {
    setIsPending(true);

    const query = getFilterUrl({
      searchWord,
      gender: state.filterCards.gender,
      status: state.filterCards.status,
      species: state.filterCards.species,
    });

    createRequest({ query, onRequestData, onError, onRequestEnd });
  }, [
    onError,
    onRequestData,
    searchWord,
    state.filterCards.gender,
    state.filterCards.species,
    state.filterCards.status,
  ]);

  return (
    <>
      {isPending && <Loading />}
      {!state.mainPageInfo.cards.length && !isPending && <h3 data-testid="not-found">{message}</h3>}
      <ul className="card_list">
        {!isPending &&
          state.mainPageInfo.cards.map((item) => <Card key={item.id + item.name} data={item} />)}
      </ul>
    </>
  );
};

export default CardList;
