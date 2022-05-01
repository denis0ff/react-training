import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { genCardsSlice } from '../../../store/reducers/GenCardsSlice';
import { ICardGen } from '../../../utils/types/types';
import CardGen from '../../CardGen/';
import Form from '../../Form';
import './Generator.css';

const Generator = () => {
  const { cards } = useAppSelector((state) => state.genCardsReducer);
  const { add } = genCardsSlice.actions;
  const dispatch = useAppDispatch();

  const setCards = (card: ICardGen) => dispatch(add(card));

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
