import { Component, createRef, Dispatch, FormEvent, SetStateAction } from 'react';
import { ICardGen, IGeneratorState } from '../../../utils/types';

interface IProps {
  setFormValues: Dispatch<SetStateAction<IGeneratorState>>;
}

export class Form extends Component<IProps> {
  private firstName = createRef<HTMLInputElement>();
  private date = createRef<HTMLInputElement>();
  private country = createRef<HTMLSelectElement>();
  private agree = createRef<HTMLInputElement>();
  private gender = createRef<HTMLInputElement>();
  private file = createRef<HTMLInputElement>();

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCard: ICardGen = {
      firstName: this.firstName.current?.value || '',
      date: this.date.current?.value || '',
      country: this.country.current?.value || '',
      gender: this.gender.current?.value || '',
      image: '',
    };

    console.log(this.file.current?.files);

    const reader = new FileReader();
    reader.readAsDataURL(this.file.current?.files![0] as Blob);
    reader.onloadend = () => {
      console.log(reader.result);
      newCard.image = reader.result as string;
      console.log(newCard.image);
      this.props.setFormValues((prev) => {
        return { ...prev, cards: [...prev.cards, newCard] };
      });
    };
  };

  render = () => (
    <form className="form" onSubmit={this.handleSubmit}>
      <label className="form_field" htmlFor="firstName">
        Name:
        <input name="firstName" type="text" ref={this.firstName} />
      </label>
      <label className="form_field" htmlFor="date">
        Delivery date:
        <input name="date" type="date" ref={this.date} />
      </label>
      <label className="form_field" htmlFor="country">
        Country:
        <select name="country" ref={this.country}>
          <option>Belarus</option>
          <option>Russia</option>
          <option>Ukraine</option>
        </select>
      </label>
      <label className="form_field" htmlFor="agree">
        I agree with the processing of my data
        <input name="agree" type="checkbox" ref={this.agree} />
      </label>
      <label className="form_field" htmlFor="gender">
        Gender:
        <input name="gender" type="radio" ref={this.gender} value="Male" />
        <input name="gender" type="radio" ref={this.gender} value="Female" />
      </label>
      <label className="form_field" htmlFor="file">
        Profile image:
        <input name="file" type="file" accept="image/*" ref={this.file} />
      </label>
      <label className="form_button" htmlFor="submit">
        <input name="submit" type="submit" />
      </label>
    </form>
  );
}
