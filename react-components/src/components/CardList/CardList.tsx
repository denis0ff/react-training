import { useEffect, useState } from 'react';
import Card from './components/Card';
import './CardList.css';
import { ICharacter, IFilteredCharacter } from '../../utils/rickAndMorty/types';
import { getCharacterRequest } from '../../utils/rickAndMorty/utils';
import ModalCard from '../layouts/ModalCard';
import Loading from '../layouts/Loading';

interface Props {
  searchWord: string;
}

interface Data extends Partial<IFilteredCharacter> {
  show: boolean;
  props?: ICharacter;
}

const CardList = ({ searchWord }: Props) => {
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState<Data>({ show: false });

  const hideModal = () => setData((prev: Data) => ({ ...prev, show: false }));
  const showModal = (props: ICharacter) => setData((prev) => ({ ...prev, show: true, props }));

  useEffect(() => {
    setIsPending(true);
    getCharacterRequest(searchWord)
      .then(({ data }) => setData((prev) => ({ ...prev, ...data })))
      .catch(() => setData((prev) => ({ ...prev, results: undefined })))
      .finally(() => setIsPending(false));
  }, [searchWord]);

  return (
    <>
      {isPending && <Loading />}
      {!data.results && !isPending && <h3 data-testid="not-found">Nothing was found</h3>}
      <ModalCard show={data.show} data={data.props} handleClose={hideModal} />
      <ul className="card_list">
        {!isPending &&
          data.results?.map((item) => (
            <Card key={item.id} data={item} handleModal={() => showModal(item)} />
          ))}
      </ul>
    </>
  );
};

export default CardList;
