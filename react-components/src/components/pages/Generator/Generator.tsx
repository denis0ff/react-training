import { Component } from 'react';
import { EmptyProps, IGeneratorState } from '../../../utils/types';
import { CardGen } from '../../CardGen/CardGen';
import { Form } from '../../forms/Form/Form';

export class Generator extends Component {
  readonly state: IGeneratorState;
  constructor(props: EmptyProps) {
    super(props);
    this.state = { cards: [] };
  }

  render = () => (
    <section>
      <h2>Card generator</h2>
      <Form setFormValues={this.setState.bind(this)} />
      <ul className="card-gen_list">
        {this.state.cards.map((item, idx) => (
          <CardGen
            key={idx}
            firstName={item.firstName}
            date={item.date}
            country={item.country}
            gender={item.gender}
            image={item.image}
          />
        ))}
      </ul>
    </section>
  );
}
