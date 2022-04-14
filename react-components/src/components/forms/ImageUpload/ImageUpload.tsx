import { Component } from 'react';
import { IFormInputProps } from '../../../utils/types/types';

class ImageUpload extends Component<IFormInputProps> {
  handleInput = () => this.props.setError('image');

  render = () => (
    <div>
      <label className="form_field image-label">
        Upload image
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

export default ImageUpload;
