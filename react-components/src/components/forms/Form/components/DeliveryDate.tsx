import { Component } from 'react';
import { IFormInputProps } from '../../../../utils/types/types';

class DeliveryDate extends Component<IFormInputProps> {
  handleInput = () => {
    this.props.setErrors((prev) => {
      const { errors } = prev;
      delete errors.date;
      return { ...prev, errors, submitIsDisabled: Object.keys(errors).length !== 0 };
    });
  };
  render = () => (
    <label className="form_field">
      Delivery date
      <input className="form_date" name="date" type="date" onInput={this.handleInput} />
      <span className="form_error">{this.props.message}</span>
    </label>
  );
}

export default DeliveryDate;
