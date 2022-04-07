import { Component } from 'react';
import Card from './components/Card';
import './CardList.css';
import { IFilteredCharacter } from '../../utils/rickAndMorty/types';
import { getCharacter } from '../../utils/rickAndMorty/utils';

interface IProps {
  searchWord: string;
}

class CardList extends Component<IProps> {
  readonly state: Partial<IFilteredCharacter>;
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    const response = await getCharacter(this.props.searchWord);
    this.setState({ ...response });
  };

  componentDidUpdate = async (prev: IProps) => {
    if (this.props.searchWord !== prev.searchWord) {
      const response = await getCharacter(this.props.searchWord);
      this.setState({ ...response });
    }
  };

  render = () => (
    <ul className="card_list">
      {this.state.results ? (
        this.state.results?.map((item) => <Card key={item.id} data={item} />)
      ) : (
        <p>Nothing found</p>
      )}
    </ul>
  );
}

export default CardList;
