import { Component } from 'react';
import { ICardGen } from '../../utils/types';
import './CardGen.css';

export class CardGen extends Component<ICardGen> {
  render = () => (
    <li className="card-gen">
      <img className="card-gen_image" src={this.props.image} />
      <h3 className="card-gen_name">{this.props.firstName}</h3>
      <h4 className="card-gen_date">{this.props.date}</h4>
      <h4 className="card-gen_country">{this.props.country}</h4>
      <h4 className="card-gen_gender">{this.props.gender}</h4>
    </li>
  );
}
