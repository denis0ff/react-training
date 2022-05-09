import { useEffect, useState } from 'react';
import Card from './components/Card';
import './CardList.css';
import { ICharacter, IFilteredCharacter } from '../../api/rickAndMorty/types';
import { createRequest } from '../../api/rickAndMorty/utils';
import ModalCard from '../layouts/ModalCard';
import Loading from '../layouts/Loading';

interface Props {
  searchWord: string;
}

interface Data extends Partial<IFilteredCharacter> {
  props?: ICharacter;
}

const CardList = ({ searchWord }: Props) => {
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState<Data>({});
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState('');

  const hideModal = () => setModal(false);
  const showModal = (props: ICharacter) => {
    setData((prev) => ({ ...prev, props }));
    setModal(true);
  };

  useEffect(() => {
    setIsPending(true);

    const onRequestData = (data: IFilteredCharacter) => {
      setData((prev) => ({ ...prev, ...data }));
    };
    const onError = (error: string) => {
      setData((prev) => ({ ...prev, results: undefined }));
      setMessage(error);
    };
    const onRequestEnd = () => {
      setIsPending(false);
    };

    createRequest({ query: searchWord, onRequestData, onError, onRequestEnd });
  }, [searchWord]);

  return (
    <>
      <ModalCard show={modal} data={data.props} handleClose={hideModal} />
      {isPending && <Loading />}
      {!data.results && !isPending && <h3 data-testid="not-found">{message}</h3>}
      <ul className="card_list">
        {!isPending &&
          data.results?.map((item) => (
            <Card key={item.id + item.name} data={item} handleModal={() => showModal(item)} />
          ))}
      </ul>
    </>
  );
};

export default CardList;
