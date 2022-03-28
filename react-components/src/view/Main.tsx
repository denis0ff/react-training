import { Component } from 'react';
import { CardList } from '../components/CardList';
import { SearchBar } from '../components/SearchBar';

export class Main extends Component {
  render = () => (
    <>
      <SearchBar></SearchBar>
      <CardList></CardList>
    </>
  );
}
