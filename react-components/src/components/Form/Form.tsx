import { Component, Dispatch, FormEvent, SetStateAction } from 'react';
import { validateForm } from '../../utils/helpers/validation';
import { IFormState, IGeneratorState, IValidationValues } from '../../utils/types/types';
import Checkbox from '../forms/Checkbox';
import DatePicker from '../forms/DatePicker';
import ImageUpload from '../forms/ImageUpload';
import Select from '../forms/Select';
import Submit from '../forms/Submit';
import Switcher from '../forms/Switcher';
import Textfield from '../forms/Textfield';
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

  setError = (field: string) =>
    this.setState((prev: IFormState) => {
      const { errors } = prev;
      delete errors[field];
      return { ...prev, errors, submitIsDisabled: Object.keys(errors).length !== 0 };
    });

  render = () => (
    <form className="form" onSubmit={this.handleSubmit}>
      <Textfield message={this.state.errors.fullName} setError={this.setError} />
      <div className="form_container">
        <DatePicker message={this.state.errors.date} setError={this.setError} />
        <Select message={this.state.errors.country} setError={this.setError} />
      </div>
      <Checkbox message={this.state.errors.agree} setError={this.setError} />
      <div className="form_container">
        <Switcher message={this.state.errors.gender} setError={this.setError} />
        <ImageUpload message={this.state.errors.image} setError={this.setError} />
      </div>
      <Submit isSaved={this.state.cardIsSaved} isDisabled={this.state.submitIsDisabled} />
    </form>
  );
}

export default Form;
