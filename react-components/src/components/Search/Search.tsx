import { Component } from 'react';
import { EmptyProps } from '../../utils/types';
import './Search.css';

export class Search extends Component {
  readonly state: { searchWord: '' };
  constructor(props: EmptyProps) {
    super(props);
    this.state = { searchWord: '' };
    this.setState = this.setState.bind(this);
  }

  componentDidMount = () => {
    this.setState({
      searchWord: localStorage.getItem('searchWord')?.toString(),
    });
  };

  componentWillUnmount = () => {
    localStorage.setItem('searchWord', this.state.searchWord);
  };

  handleChangeInput = ({ target: { value } }: { target: { value: string } }) => {
    this.setState((prev) => ({ ...prev, searchWord: value }));
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
      />
    </div>
  );
}
