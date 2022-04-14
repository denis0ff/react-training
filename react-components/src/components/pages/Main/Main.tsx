import { useState } from 'react';
import CardList from '../../CardList/CardList';
import Search from '../../forms/Search/Search';

const Main = () => {
  const [searchWord, setSearchWord] = useState(localStorage.getItem('searchWord') || '');

  return (
    <>
      <Search searchWord={searchWord} setSearchWord={setSearchWord} />
      <CardList searchWord={searchWord} />
    </>
  );
};

export default Main;
