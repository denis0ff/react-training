import { Component } from 'react';
import Card from './components/Card';
import './CardList.css';
import { ICharacter, IFilteredCharacter } from '../../utils/rickAndMorty/types';
import { getCharacterRequest } from '../../utils/rickAndMorty/utils';
import ModalCard from '../layouts/ModalCard';
import Loading from '../layouts/Loading';

interface IProps {
  searchWord: string;
}

interface IState extends Partial<IFilteredCharacter> {
  modal: { show: boolean; props?: ICharacter };
  isPending: boolean;
}

class CardList extends Component<IProps> {
  readonly state: IState;
  constructor(props: IProps) {
    super(props);
    this.state = { modal: { show: false }, isPending: true };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount = () => {
    this.setCards();
  };

  componentDidUpdate = (prev: IProps) => {
    if (this.props.searchWord !== prev.searchWord) this.setCards();
  };

  setCards = async () => {
    this.setState((prev) => ({ ...prev, isPending: true }));
    await getCharacterRequest(this.props.searchWord)
      .then(({ data }) => this.setState((prev) => ({ ...prev, ...data, isPending: false })))
      .catch(() => this.setState((prev) => ({ ...prev, isPending: false, results: null })));
  };

  showModal = (props: ICharacter) => {
    this.setState((prev) => ({ ...prev, modal: { show: true, props } }));
  };

  hideModal = () => {
    this.setState((prev: IState) => ({ ...prev, modal: { ...prev.modal, show: false } }));
  };

  render = () => (
    <>
      <ul className="card_list">
        {this.state.isPending && <Loading />}
        {this.state.results
          ? !this.state.isPending &&
            this.state.results?.map((item) => (
              <Card key={item.id} data={item} handleModal={() => this.showModal(item)} />
            ))
          : !this.state.isPending && <h3>Nothing found</h3>}
        <ModalCard
          show={this.state.modal.show}
          data={this.state.modal.props}
          handleClose={this.hideModal}
        />
      </ul>
    </>
  );
}

export default CardList;
