import { useEffect } from 'react';
import Card from './components/Card';
import './CardList.css';
import Loading from '../layouts/Loading';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { fetchCharacters } from '../../store/thunks/ActionCreators';
import { getFilterUrl } from '../../api/rickAndMorty/utils';

const CardList = () => {
  const { cards, isLoading, error } = useAppSelector((state) => state.mainCardsReducer);
  const { searchWord, filters } = useAppSelector((state) => state.filterMainCardsReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCharacters(getFilterUrl({ searchWord, ...filters })));
  }, [dispatch, filters, searchWord]);

  return (
    <>
      {isLoading && <Loading />}
      {error && <h3 data-testid="not-found">{error}</h3>}
      <ul className="card_list">
        {!isLoading && cards.map((item) => <Card key={item.id + item.name} data={item} />)}
      </ul>
    </>
  );
};

export default CardList;
