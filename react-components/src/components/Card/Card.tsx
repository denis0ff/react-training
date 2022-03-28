import { Component } from 'react';
import './Card.css';
import { ICard } from '../../utils/types';

export class Card extends Component<ICard> {
  render = () => (
    <li className="card">
      <img className="card_image" src={this.props.image}></img>
      <h3 className="card_title">{this.props.title}</h3>
      <h4 className="card_category">{this.props.category}</h4>
      <p className="card_description">{this.props.description}</p>
      <div className="horizontal center container">
        <span className="card_rate">{this.props.rating.rate}</span>
        <span className="card_count">{this.props.rating.count}</span>
      </div>
      <h4 className="card_price">{this.props.price}</h4>
    </li>
  );
}
