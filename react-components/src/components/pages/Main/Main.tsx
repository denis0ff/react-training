import { Component } from 'react';
import { EmptyProps, IMainState } from '../../../utils/types/types';
import CardList from '../../CardList/CardList';
import Search from '../../forms/Search/Search';

class Main extends Component {
  readonly state: IMainState;

  constructor(props: EmptyProps) {
    super(props);
    this.state = { searchWord: localStorage.getItem('searchWord') || '' };
  }

  setSearchWord = (searchWord: string) => this.setState({ searchWord });

  render = () => (
    <>
      <Search setSearchWord={this.setSearchWord} />
      <CardList searchWord={this.state.searchWord} />
    </>
  );
}

export default Main;
