import { useCallback, useEffect, useState } from 'react';
import './Search.css';

interface Props {
  searchWord: string;
  setSearchWord: (value: string) => void;
}

const Search = ({ searchWord, setSearchWord }: Props) => {
  const [currentWord, setCurrentWord] = useState(searchWord);

  useEffect(() => {
    return () => {
      localStorage.setItem('searchWord', currentWord);
    };
  }, [currentWord]);

  const handleKeyUp = useCallback(
    ({ key }) => {
      if (key === 'Enter') setSearchWord(currentWord);
    },
    [setSearchWord, currentWord]
  );

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
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

export default Search;
