import { Component, MouseEvent } from 'react';
import { ICharacter } from '../../../utils/rickAndMorty/types';
import './ModalCard.css';

interface IProps {
  show: boolean;
  data?: ICharacter;
  handleClose: () => void;
}

class ModalCard extends Component<IProps> {
  handleOverlayClose = ({ currentTarget, target }: MouseEvent) => {
    if (currentTarget === target) this.props.handleClose();
  };

  render = () => (
    <div
      className={`modal-card_overlay ${this.props.show ? '' : 'hide'}`}
      onClick={this.handleOverlayClose}
    >
      <section className="modal-card">
        <article className="modal-card_container">
          <img src={this.props.data?.image} />
        </article>
        <article className="modal-card_container">
          <h2 className="modal-card_title">{this.props.data?.name}</h2>
          <ul className="modal-card_list">
            <li className="modal-card_item">
              Created: <span>{this.props.data?.created.slice(0, 10)}</span>
            </li>
            <li className="modal-card_item">
              Species: <span>{this.props.data?.species}</span>
            </li>
            <li className="modal-card_item">
              Gender: <span>{this.props.data?.gender}</span>
            </li>
            <li className="modal-card_item">
              Origin: <span>{this.props.data?.origin.name}</span>
            </li>
            <li className="modal-card_item">
              Location: <span>{this.props.data?.location.name}</span>
            </li>
            <li className="modal-card_item">
              Status: <span>{this.props.data?.status}</span>
            </li>
            {this.props.data?.type ? (
              <li className="modal-card_item">
                Type: <span>{this.props.data?.status}</span>
              </li>
            ) : null}
          </ul>
        </article>
        <button className="modal-card_close" type="button" onClick={this.props.handleClose} />
      </section>
    </div>
  );
}

export default ModalCard;
