import { useState } from 'react';
import CardFilter from '../../CardFilter';
import CardList from '../../CardList/CardList';
import Search from '../../forms/Search/Search';
import Pagination from '../../layouts/Pagination';

const Main = () => {
  const [searchWord, setSearchWord] = useState(localStorage.getItem('searchWord') || '');

  return (
    <>
      <section>
        <Search searchWord={searchWord} setSearchWord={(value) => setSearchWord(value)} />
        <CardFilter />
        <Pagination />
      </section>
      <section>
        <CardList searchWord={searchWord} />
      </section>
    </>
  );
};

export default Main;
