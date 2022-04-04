import { Component } from 'react';
import CardList from '../../CardList/CardList';
import Search from '../../forms/Search/Search';
import { data } from '../../../utils/data/data';

class Main extends Component {
  render = () => (
    <>
      <Search />
      <CardList data={data || []} />
    </>
  );
}

export default Main;
