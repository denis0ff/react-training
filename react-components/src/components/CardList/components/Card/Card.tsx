import { Component } from 'react';
import { ICharacter } from '../../../../utils/rickAndMorty/types';
import './Card.css';

interface IProps {
  data: ICharacter;
  handleModal: () => void;
}

class Card extends Component<IProps> {
  render = () => (
    <li className="card" onClick={this.props.handleModal}>
      <img className="card_image" src={this.props.data.image}></img>
      <div className="center container card_wrapper">
        <h3 className="card_title">{this.props.data.name}</h3>
        <h4 className="card_category">{this.props.data.status}</h4>
      </div>
    </li>
  );
}

export default Card;
