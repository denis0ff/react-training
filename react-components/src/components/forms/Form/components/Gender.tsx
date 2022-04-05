import { Component } from 'react';
import { IFormInputProps } from '../../../../utils/types/types';

class Gender extends Component<IFormInputProps> {
  handleInput = () => {
    this.props.setErrors((prev) => {
      const { errors } = prev;
      delete errors.gender;
      return { ...prev, errors, submitIsDisabled: Object.keys(errors).length !== 0 };
    });
  };
  render = () => (
    <div className="form_radiogroup">
      <input
        className="form_gender"
        id="Male"
        name="gender"
        type="radio"
        value="Male"
        onInput={this.handleInput}
      />
      <label className="form_field" htmlFor="Male">
        Male
      </label>
      <input
        className="form_gender"
        id="Female"
        name="gender"
        type="radio"
        value="Female"
        onInput={this.handleInput}
      />
      <label className="form_field" htmlFor="Female">
        Female
      </label>
      <span className="form_error">{this.props.message}</span>
    </div>
  );
}

export default Gender;
