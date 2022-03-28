import { ChangeEvent, Component, Dispatch, SetStateAction } from 'react';
import { IStateWord } from '../utils/types';

interface IProps {
  searchWord: Readonly<string>;
  setSearchWord: Dispatch<SetStateAction<IStateWord>>;
}
export class SearchBar extends Component<IProps> {
  handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.setSearchWord((prev) => ({ ...prev, searchWord: e.target.value }));
  };

  render = () => (
    <input type="search" value={this.props.searchWord} onChange={this.handleChangeInput}></input>
  );
}
