import { Component } from 'react';
import { EmptyProps, IGeneratorState } from '../../../utils/types/types';
import CardGen from '../../CardGen/';
import Form from '../../Form';
import './Generator.css';

class Generator extends Component {
  readonly state: IGeneratorState;
  constructor(props: EmptyProps) {
    super(props);
    this.state = { cards: [] };
  }

  render = () => (
    <section>
      <h2 className="card-gen_title">Card generator</h2>
      <Form setFormValues={this.setState.bind(this)} />
      <ul className="card-gen_list">
        {this.state.cards.map((item, idx) => (
          <CardGen
            key={idx}
            fullName={item.fullName}
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

export default Generator;
