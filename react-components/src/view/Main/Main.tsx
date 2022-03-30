import { Component } from 'react';
import { CardList } from '../../components/CardList/CardList';
import { Search } from '../../components/Search/Search';

export class Main extends Component {
  render = () => (
    <>
      <Search />
      <CardList />
    </>
  );
}
