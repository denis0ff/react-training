import { useState } from 'react';
import { ICardGen } from '../../../utils/types/types';
import CardGen from '../../CardGen/';
import Form from '../../Form';
import './Generator.css';

const Generator = () => {
  const [cards, setCards] = useState<ICardGen[]>([]);
  return (
    <section>
      <h2 className="card-gen_title">Card generator</h2>
      <Form setCards={setCards} />
      <ul className="card-gen_list">
        {cards.map((item, idx) => (
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
};

export default Generator;
