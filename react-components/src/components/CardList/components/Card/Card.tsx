import { Component } from 'react';
import { ICharacter } from '../../../../api/rickAndMorty/types';
import './Card.css';

interface IProps {
  data: ICharacter;
  handleModal: () => void;
}

class Card extends Component<IProps> {
  render = () => (
    <li className="card" onClick={this.props.handleModal} data-testid="card">
      <img className="card_image" src={this.props.data.image}></img>
      <h3 className="card_title">{this.props.data.name}</h3>
    </li>
  );
}

export default Card;
