import { Component } from 'react';
import { CardList } from '../components/CardList';
import { SearchBar } from '../components/SearchBar';
import { EmptyProps, IStateWord } from '../utils/types';

export class Main extends Component<EmptyProps> {
  readonly state: IStateWord;
  constructor(props: EmptyProps) {
    super(props);
    this.state = { searchWord: '' };
    this.setState = this.setState.bind(this);
  }

  componentDidMount = () => {
    this.setState((prev) => ({ ...prev, searchWord: localStorage.getItem('searchWord') }));
  };

  componentWillUnmount = () => {
    localStorage.setItem('searchWord', this.state.searchWord);
  };

  render = () => (
    <>
      <SearchBar searchWord={this.state.searchWord} setSearchWord={this.setState}></SearchBar>
      <CardList searchWord={this.state.searchWord}></CardList>
    </>
  );
}
