import { Component } from 'react';
import './Card.css';
import { ICharacter } from '../../../../utils/rickAndMorty/types';

interface IProps {
  data: ICharacter;
}

class Card extends Component<IProps> {
  render = () => {
    const { name, status, species, type, gender, origin, location, image, episode, url, created } =
      this.props.data;
    return (
      <li className="card">
        <img className="card_image" src={image}></img>
        <div className="center container card_wrapper">
          <h3 className="card_title">{name}</h3>
          <h4 className="card_category">{status}</h4>
        </div>
      </li>
    );
  };
}

export default Card;
