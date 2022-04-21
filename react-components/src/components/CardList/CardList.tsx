import { useContext, useEffect, useRef, useState } from 'react';
import Card from './components/Card';
import './CardList.css';
import { ICharacter, IFilteredCharacter } from '../../api/rickAndMorty/types';
import { createRequest } from '../../api/rickAndMorty/utils';
import ModalCard from '../layouts/ModalCard';
import Loading from '../layouts/Loading';
import { AppContext } from '../contexts/AppContext';
import { Actions } from '../../utils/reducers/appReducer';

interface Props {
  searchWord: string;
}

interface Data extends Pick<IFilteredCharacter, 'results'> {
  show: boolean;
  props?: ICharacter;
}

const CardList = ({ searchWord }: Props) => {
  const { state, dispatch } = useContext(AppContext);
  const isFirstInit = useRef(true);

  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState<Data>({ show: false, results: [...state.mainCards] });
  const [message, setMessage] = useState('');
  const isMount = useRef(false);

  const hideModal = () => setData((prev: Data) => ({ ...prev, show: false }));
  const showModal = (props: ICharacter) => setData((prev) => ({ ...prev, show: true, props }));

  useEffect(() => {
    if (isFirstInit.current && state.mainCards.length)
      return () => {
        isFirstInit.current = false;
      };

    setIsPending(true);
    isMount.current = true;

    const onRequestData = (data: IFilteredCharacter) => {
      if (isMount.current) setData((prev) => ({ ...prev, ...data }));
    };
    const onError = (error: string) => {
      if (isMount.current) {
        setData((prev) => ({ ...prev, results: [] }));
        setMessage(error);
      }
    };
    const onRequestEnd = () => {
      if (isMount.current) setIsPending(false);
    };

    createRequest({ query: searchWord, onRequestData, onError, onRequestEnd });

    return () => {
      isMount.current = false;
      isFirstInit.current = false;
    };
  }, [searchWord]);

  useEffect(() => {
    return () => {
      dispatch({ type: Actions.SET_MAIN_CARD, payload: data.results });
    };
  }, [data.results, dispatch]);

  return (
    <>
      <ModalCard show={data.show} data={data.props} handleClose={hideModal} />
      {isPending && <Loading />}
      {!data.results.length && !isPending && <h3 data-testid="not-found">{message}</h3>}
      <ul className="card_list">
        {!isPending &&
          data.results.map((item) => (
            <Card key={item.id + item.name} data={item} handleModal={() => showModal(item)} />
          ))}
      </ul>
    </>
  );
};

export default CardList;
