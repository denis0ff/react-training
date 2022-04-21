import { useCallback, useContext } from 'react';
import { Actions } from '../../../utils/reducers/appReducer';
import { ICardGen } from '../../../utils/types/types';
import CardGen from '../../CardGen/';
import { AppContext } from '../../contexts/AppContext';
import Form from '../../Form';
import './Generator.css';

const Generator = () => {
  const { state, dispatch } = useContext(AppContext);
  const setCards = useCallback(
    (card: ICardGen) => dispatch({ type: Actions.ADD_GEN_CARD, payload: { ...card } }),
    [dispatch]
  );

  return (
    <section>
      <h2 className="card-gen_title">Card generator</h2>
      <Form setCards={setCards} />
      <ul className="card-gen_list">
        {state.genCards.map((item, idx) => (
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
