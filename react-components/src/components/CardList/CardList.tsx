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
    console.log(response);
    this.setState({ ...response });
  };

  render = () => {
    // console.log(this.state.results);
    return (
      <ul className="card_list">
        {this.state.results ? (
          this.state.results?.map((item) => <Card key={item.id} data={item} />)
        ) : (
          <p>Nothing found</p>
        )}
      </ul>
    );
  };
}

export default CardList;
