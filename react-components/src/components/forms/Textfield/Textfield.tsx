import { Component } from 'react';
import { IFormInputProps } from '../../../utils/types/types';

class Textfield extends Component<IFormInputProps> {
  handleInput = () => this.props.setError('fullName');

  render = () => (
    <label className="form_field">
      Your Name
      <input className="form_name" name="fullName" type="text" onInput={this.handleInput} />
      <span className="form_error">{this.props.message}</span>
    </label>
  );
}

export default Textfield;
