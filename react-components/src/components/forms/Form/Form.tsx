import { Component, Dispatch, FormEvent, SetStateAction } from 'react';
import { validateForm } from '../../../utils/helpers/validation';
import { IFormState, IGeneratorState, IValidationValues } from '../../../utils/types/types';
import { Agree, Country, DeliveryDate, FullName, Gender, ImageFile, Submit } from './components';
import './Form.css';

interface IProps {
  setFormValues: Dispatch<SetStateAction<IGeneratorState>>;
}

class Form extends Component<IProps> {
  readonly state: IFormState;
  constructor(props: IProps) {
    super(props);
    this.state = { errors: {}, cardIsSaved: false, submitIsDisabled: true };
  }

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { elements } = e.currentTarget;
    const values = {
      fullName: (elements.namedItem('fullName') as HTMLInputElement).value,
      date: (elements.namedItem('date') as HTMLInputElement).value,
      country: (elements.namedItem('country') as HTMLInputElement).value,
      gender: (elements.namedItem('gender') as HTMLInputElement).value,
      image: (elements.namedItem('file') as HTMLInputElement).files![0] || null,
      agree: (elements.namedItem('agree') as HTMLInputElement).checked,
    };
    const errors = validateForm(values);

    if (Object.keys(errors).length === 0) {
      this.addCard(values);
      this.setState({ errors: {}, cardIsSaved: true, submitIsDisabled: true });
      e.currentTarget.reset();
    } else this.setState({ errors, cardIsSaved: false, submitIsDisabled: true });
  };

  addCard = ({ country, date, fullName, image, gender }: IValidationValues) => {
    this.props.setFormValues((prev) => ({
      ...prev,
      cards: [
        ...prev.cards,
        {
          country,
          date,
          fullName,
          gender,
          image: URL.createObjectURL(image as Blob),
        },
      ],
    }));
  };

  render = () => (
    <form className="form" onSubmit={this.handleSubmit}>
      <FullName message={this.state.errors.fullName} setErrors={this.setState.bind(this)} />
      <div className="form_container">
        <DeliveryDate message={this.state.errors.date} setErrors={this.setState.bind(this)} />
        <Country message={this.state.errors.country} setErrors={this.setState.bind(this)} />
      </div>
      <Agree message={this.state.errors.agree} setErrors={this.setState.bind(this)} />
      <div className="form_container">
        <Gender message={this.state.errors.gender} setErrors={this.setState.bind(this)} />
        <ImageFile message={this.state.errors.image} setErrors={this.setState.bind(this)} />
      </div>
      <Submit isSaved={this.state.cardIsSaved} isDisabled={this.state.submitIsDisabled} />
    </form>
  );
}

export default Form;
