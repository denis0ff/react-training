import { Component } from 'react';
import Card from './components/Card';
import './CardList.css';
import { ICharacter, IFilteredCharacter } from '../../api/rickAndMorty/types';
import { createRequest } from '../../api/rickAndMorty/utils';
import ModalCard from '../layouts/ModalCard';
import Loading from '../layouts/Loading';

interface IProps {
  searchWord: string;
}

interface IState extends Partial<IFilteredCharacter> {
  modal: { show: boolean; props?: ICharacter };
  isPending: boolean;
  message: string;
}

class CardList extends Component<IProps> {
  readonly state: IState;
  _isMount: boolean;
  constructor(props: IProps) {
    super(props);
    this.state = { modal: { show: false }, isPending: true, message: '' };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this._isMount = false;
  }

  componentDidMount = () => {
    this._isMount = true;
    this.setCards();
  };

  componentDidUpdate = (prev: IProps) => {
    if (this.props.searchWord !== prev.searchWord) this.setCards();
  };

  componentWillUnmount = () => (this._isMount = false);

  setCards = () => {
    this.setState((prev) => ({ ...prev, isPending: true }));
    const onRequestData = (data: IFilteredCharacter) => {
      if (this._isMount) this.setState((prev) => ({ ...prev, ...data, isPending: false }));
    };
    const onError = (error: string) => {
      if (this._isMount)
        this.setState((prev) => ({ ...prev, isPending: false, results: null, message: error }));
    };

    createRequest({ query: this.props.searchWord, onRequestData, onError });
  };

  showModal = (props: ICharacter) => {
    this.setState((prev) => ({ ...prev, modal: { show: true, props } }));
  };

  hideModal = () => {
    this.setState((prev: IState) => ({ ...prev, modal: { ...prev.modal, show: false } }));
  };

  render = () => (
    <>
      <ModalCard
        show={this.state.modal.show}
        data={this.state.modal.props}
        handleClose={this.hideModal}
      />
      {this.state.isPending && <Loading />}
      {!this.state.isPending && !this.state.results && (
        <h3 data-testid="not-found">{this.state.message}</h3>
      )}
      <ul className="card_list">
        {this.state.results &&
          !this.state.isPending &&
          this.state.results?.map((item) => (
            <Card key={item.id + item.name} data={item} handleModal={() => this.showModal(item)} />
          ))}
      </ul>
    </>
  );
}

export default CardList;
