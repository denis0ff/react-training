import { Component } from 'react';
import { IFormInputProps } from '../../../../utils/types/types';

class Agree extends Component<IFormInputProps> {
  handleInput = () => {
    this.props.setErrors((prev) => {
      const { errors } = prev;
      delete errors.agree;
      return { ...prev, errors, submitIsDisabled: Object.keys(errors).length !== 0 };
    });
  };

  render = () => (
    <div>
      <label className="form_agree-container">
        I agree with the processing of my data
        <input className="form_agree" name="agree" type="checkbox" onInput={this.handleInput} />
        <span className="form_agree-checkmark"></span>
      </label>
      <span className="form_error">{this.props.message}</span>
    </div>
  );
}

export default Agree;
