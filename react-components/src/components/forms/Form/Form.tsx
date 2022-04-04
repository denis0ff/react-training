import { Component, Dispatch, FormEvent, SetStateAction } from 'react';
import { validateForm } from '../../../utils/helpers/validation';
import { IFormState, IGeneratorState, IValidationValues } from '../../../utils/types/types';
import './Form.css';

interface IProps {
  setFormValues: Dispatch<SetStateAction<IGeneratorState>>;
}

class Form extends Component<IProps> {
  readonly state: IFormState;
  constructor(props: IProps) {
    super(props);
    this.state = { errors: {} };
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
      e.currentTarget.reset();
    } else this.setState({ errors });
    console.log(errors);
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
      <label className="form_field" htmlFor="fullName">
        Name
        <input className="form_text" name="fullName" type="text" />
      </label>
      <div className="form_container">
        <label className="form_field" htmlFor="date">
          Delivery date
          <input className="form_date" name="date" type="date" />
        </label>
        <label className="form_field" htmlFor="country">
          Country
          <select className="form_country" name="country" defaultValue={''}>
            <option disabled></option>
            <option>Belarus</option>
            <option>Russia</option>
            <option>Ukraine</option>
          </select>
        </label>
      </div>
      <label className="form_field" htmlFor="agree">
        I agree with the processing of my data
        <input name="agree" type="checkbox" />
      </label>
      <label className="form_field" htmlFor="gender">
        Gender:
        <input name="gender" type="radio" value="Male" />
        <input name="gender" type="radio" value="Female" />
      </label>
      <label className="form_field" htmlFor="file">
        Profile image:
        <input name="file" type="file" accept="image/*" />
      </label>
      <label className="form_button" htmlFor="submit">
        <input name="submit" type="submit" />
      </label>
    </form>
  );
}

export default Form;
