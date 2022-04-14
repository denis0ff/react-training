import { Component } from 'react';
import { IFormInputProps } from '../../../utils/types/types';

class DatePicker extends Component<IFormInputProps> {
  handleInput = () => this.props.setError('date');

  render = () => (
    <label className="form_field">
      Delivery date
      <input className="form_date" name="date" type="date" onInput={this.handleInput} />
      <span className="form_error">{this.props.message}</span>
    </label>
  );
}

export default DatePicker;
