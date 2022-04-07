import { Component, Dispatch, KeyboardEvent, SetStateAction } from 'react';
import { IMainState } from '../../../utils/types/types';
import './Search.css';

interface IProps {
  setSearchWord: Dispatch<SetStateAction<IMainState>>;
}

class Search extends Component<IProps> {
  readonly state: { searchWord: string };
  constructor(props: IProps) {
    super(props);
    this.state = { searchWord: localStorage.getItem('searchWord') || '' };
  }

  componentWillUnmount = () => {
    localStorage.setItem('searchWord', this.state.searchWord);
  };

  handleChangeInput = ({ target: { value } }: { target: { value: string } }) => {
    this.setState((prev) => ({ ...prev, searchWord: value }));
  };

  handleKeyUp = ({ key }: KeyboardEvent) => {
    if (key === 'Enter') {
      this.props.setSearchWord({ searchWord: this.state.searchWord });
    }
  };

  render = () => (
    <div className="search_wrapper">
      <label htmlFor="search" className="search_label">
        Search
      </label>
      <input
        id="search"
        className="search_input"
        type="search"
        placeholder="Search..."
        value={this.state.searchWord || ''}
        onChange={this.handleChangeInput}
        onKeyUp={this.handleKeyUp}
      />
    </div>
  );
}

export default Search;
