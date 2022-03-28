import { Component } from 'react';
import './Card.css';
import { ICard } from '../utils/types';

export class Card extends Component {
  constructor(props: ICard) {
    super(props);
  }
  render = () => (
    <div className="card">
      <img className="card_image"></img>
      <h3 className="card_title"></h3>
      <p className="card_description"></p>
      <div className="horizontal center container">
        <span className="card_rate"></span>
        <span className="card_count"></span>
      </div>
      <h4 className="card_price"></h4>
    </div>
  );
}
