import { Component } from 'react';
import { ICard } from '../../utils/types';
import { Card } from '../Card/Card';
import './CardList.css';

export interface IStateCards {
  cards: null | ICard[];
}

interface IProps {
  searchWord: Readonly<string>;
}

export class CardList extends Component<IProps> {
  readonly state: IStateCards;
  constructor(props: IProps) {
    super(props);
    this.state = { cards: null };
    this.setState = this.setState.bind(this);
  }

  getCards = () =>
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => this.setState((prev) => ({ ...prev, cards: json })));

  componentDidMount = () => {
    this.getCards();
  };

  render = () => (
    <ul className="card_list">
      {this.state.cards !== null
        ? this.state.cards
            .filter(({ title }) => title.includes(this.props.searchWord))
            .map(({ id, title, description, price, category, rating, image }) => (
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
            ))
        : null}
    </ul>
  );
}
