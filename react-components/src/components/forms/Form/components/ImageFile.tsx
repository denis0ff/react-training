import { Component } from 'react';
import { IFormInputProps } from '../../../../utils/types/types';

class ImageFile extends Component<IFormInputProps> {
  handleInput = () => {
    this.props.setErrors((prev) => {
      const { errors } = prev;
      delete errors.image;
      return { ...prev, errors, submitIsDisabled: Object.keys(errors).length !== 0 };
    });
  };
  render = () => (
    <div>
      <label className="form_field image-label">
        Download image
        <input
          className="form_image"
          name="file"
          type="file"
          accept="image/*"
          onInput={this.handleInput}
        />
      </label>
      <span className="form_error">{this.props.message}</span>
    </div>
  );
}

export default ImageFile;
