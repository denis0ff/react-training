import { Component } from 'react';
import { IFormInputProps } from '../../../../utils/types/types';

class FullName extends Component<IFormInputProps> {
  handleInput = () => {
    this.props.setErrors((prev) => {
      const { errors } = prev;
      delete errors.fullName;
      return { ...prev, errors, submitIsDisabled: Object.keys(errors).length !== 0 };
    });
  };

  render = () => (
    <label className="form_field">
      Your Name
      <input className="form_name" name="fullName" type="text" onInput={this.handleInput} />
      <span className="form_error">{this.props.message}</span>
    </label>
  );
}

export default FullName;
