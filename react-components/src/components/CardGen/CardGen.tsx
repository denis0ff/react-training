import { Component } from 'react';
import { ICardGen } from '../../utils/types/types';
import './CardGen.css';

class CardGen extends Component<ICardGen> {
  render = () => (
    <li className="card-gen_item">
      <img className="card-gen_image" src={this.props.image} />
      <p className="card-gen_field">
        Name: <span>{this.props.fullName}</span>
      </p>
      <p className="card-gen_field">
        Delivery date: <span>{this.props.date}</span>
      </p>
      <p className="card-gen_field">
        Country: <span>{this.props.country}</span>
      </p>
      <p className="card-gen_field">
        Gender: <span>{this.props.gender}</span>
      </p>
    </li>
  );
}

export default CardGen;
