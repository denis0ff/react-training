import CardFilter from '../../CardFilter';
import CardList from '../../CardList/CardList';
import Search from '../../forms/Search/Search';
import Pagination from '../../layouts/Pagination';

const Main = () => {
  return (
    <>
      <section>
        <Search />
        <CardFilter />
        <Pagination />
      </section>
      <section>
        <CardList />
      </section>
    </>
  );
};

export default Main;
