import { FormInputProps } from '../../../utils/types/types';

const ImageUpload = ({ data, register, error, clearErrors }: FormInputProps) => (
  <div>
    <label className="form_field image-label">
      {data.label}
      <input
        className="form_image"
        type="file"
        accept="image/*"
        {...register(data.name, { ...data.register })}
        onInput={clearErrors}
      />
    </label>
    <span className="form_error">{error}</span>
  </div>
);

export default ImageUpload;
