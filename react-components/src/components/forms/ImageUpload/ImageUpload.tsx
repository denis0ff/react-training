import { useState } from 'react';
import { FormInputProps } from '../../../utils/types/types';

const ImageUpload = ({ data, register, error, clearErrors }: FormInputProps) => {
  const [file, setFile] = useState('');
  const handleChange = (files: FileList | null) => {
    files ? setFile(files[0].name) : setFile('');
  };
  return (
    <div>
      <label className="form_field image-label">
        {data.label}
        <input
          className="form_image"
          type="file"
          accept="image/*"
          {...register(data.name, { ...data.register })}
          onInput={clearErrors}
          onChange={({ target }) => handleChange(target.files)}
        />
      </label>
      <span className="upload-file">{file}</span>
      <span className="form_error">{error}</span>
    </div>
  );
};

export default ImageUpload;
