import { ICharacter } from '../../../api/rickAndMorty/types';
import './ModalCard.css';

type Props = {
  data?: ICharacter;
};

const ModalCard = ({ data }: Props) => (
  <div className={`modal-card_overlay`} data-testid="modal-window">
    <section className={`modal-card`} data-testid="modal-container">
      <article className="modal-card_container">
        <img src={data?.image} data-testid="modal-image" />
      </article>
      <article className="modal-card_container">
        <h2 className="modal-card_title">{data?.name}</h2>
        <ul className="modal-card_list">
          <li className="modal-card_item">
            Created: <span>{data?.created.slice(0, 10)}</span>
          </li>
          <li className="modal-card_item">
            Species: <span>{data?.species}</span>
          </li>
          <li className="modal-card_item">
            Gender: <span>{data?.gender}</span>
          </li>
          <li className="modal-card_item">
            Origin: <span>{data?.origin.name}</span>
          </li>
          <li className="modal-card_item">
            Location: <span>{data?.location.name}</span>
          </li>
          <li className="modal-card_item">
            Status: <span>{data?.status}</span>
          </li>
          {data?.type ? (
            <li className="modal-card_item">
              Type: <span>{data?.type}</span>
            </li>
          ) : null}
        </ul>
      </article>
    </section>
  </div>
);

export default ModalCard;
