import { Component } from 'react';
import { EmptyProps, ICard } from '../../utils/types';
import { Card } from '../Card/Card';
import './CardList.css';
import { data } from '../../utils/data';

export class CardList extends Component {
  state: { cards: ICard[] };
  constructor(props: EmptyProps) {
    super(props);
    this.state = { cards: [] };
    this.setState = this.setState.bind(this);
  }

  componentDidMount = () => {
    this.setState((prev) => ({ ...prev, cards: data }));
  };

  componentWillUnmount = () => {
    this.setState((prev) => ({ ...prev, cards: [] }));
  };

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
