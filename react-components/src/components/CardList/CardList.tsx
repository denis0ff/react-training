import { Component } from 'react';
import { ICard } from '../../utils/types';
import { Card } from './components/Card/Card';
import './CardList.css';

interface IProps {
  data: ICard[];
}

export class CardList extends Component<IProps> {
  state: { cards: ICard[] };
  constructor(props: IProps) {
    super(props);
    this.state = { cards: this.props.data };
  }

  render = () => (
    <ul className="card_list">
      {this.state.cards.map(({ id, title, description, price, category, rating, image }) => (
        <Card
          key={id}
          id={id}
          title={title}
          description={description}
          price={price}
          category={category}
          rating={rating}
          image={image}
        />
      ))}
    </ul>
  );
}
