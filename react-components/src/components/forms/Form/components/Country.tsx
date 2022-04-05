import { Component } from 'react';
import { IFormInputProps } from '../../../../utils/types/types';

class Country extends Component<IFormInputProps> {
  handleInput = () => {
    this.props.setErrors((prev) => {
      const { errors } = prev;
      delete errors.country;
      return { ...prev, errors, submitIsDisabled: Object.keys(errors).length !== 0 };
    });
  };
  render = () => (
    <label className="form_field">
      Country
      <select className="form_country" name="country" defaultValue={''} onInput={this.handleInput}>
        <option disabled></option>
        <option>Belarus</option>
        <option>Russia</option>
        <option>Ukraine</option>
      </select>
      <span className="form_error">{this.props.message}</span>
    </label>
  );
}

export default Country;
