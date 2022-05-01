import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { filterMainCardsSlice } from '../../../store/reducers/FilterMainCardsSlice';
import './Search.css';

const Search = () => {
  const { searchWord } = useAppSelector((state) => state.filterMainCardsReducer);
  const { setSearchWord } = filterMainCardsSlice.actions;
  const dispatch = useAppDispatch();

  const [currentWord, setCurrentWord] = useState(searchWord);

  useEffect(() => {
    dispatch(setSearchWord(currentWord));
  }, [currentWord, dispatch, setSearchWord]);

  return (
    <div className="search_wrapper">
      <label htmlFor="search" className="search_label">
        Search
      </label>
      <input
        id="search"
        className="search_input"
        type="search"
        placeholder="Search..."
        value={currentWord || ''}
        onChange={({ target: { value } }) => setCurrentWord(value)}
      />
    </div>
  );
};

export default Search;
