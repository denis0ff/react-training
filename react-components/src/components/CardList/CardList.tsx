import { Component } from 'react';
import Card from './components/Card';
import './CardList.css';
import { ICharacter, IFilteredCharacter } from '../../utils/rickAndMorty/types';
import { getCharacter } from '../../utils/rickAndMorty/utils';
import ModalCard from '../layouts/ModalCard';

interface IProps {
  searchWord: string;
}

interface IState extends Partial<IFilteredCharacter> {
  modal: { show: boolean; props?: ICharacter };
}

class CardList extends Component<IProps> {
  readonly state: IState;
  constructor(props: IProps) {
    super(props);
    this.state = { modal: { show: false } };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount = async () => {
    const response = await getCharacter(this.props.searchWord);
    this.setState((prev) => ({ ...prev, ...response }));
  };

  componentDidUpdate = async (prev: IProps) => {
    if (this.props.searchWord !== prev.searchWord) {
      const response = await getCharacter(this.props.searchWord);
      this.setState((prev) => ({ ...prev, ...response }));
    }
  };

  showModal = (props: ICharacter) => {
    this.setState((prev) => ({ ...prev, modal: { show: true, props } }));
  };

  hideModal = () => {
    this.setState((prev) => ({ ...prev, modal: { show: false } }));
  };

  render = () => (
    <ul className="card_list">
      {this.state.results ? (
        this.state.results?.map((item) => (
          <Card key={item.id} data={item} handleModal={() => this.showModal(item)} />
        ))
      ) : (
        <p>Nothing found</p>
      )}
      <ModalCard
        show={this.state.modal.show}
        data={this.state.modal.props}
        handleClose={this.hideModal}
      />
    </ul>
  );
}

export default CardList;
