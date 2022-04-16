import { FormInputProps } from '../../../utils/types/types';

const Textfield = ({ data, register, error, clearErrors }: FormInputProps) => (
  <label className="form_field">
    {data.label}
    <input
      className="form_name"
      type="text"
      {...register(data.name, { ...data.register })}
      onInput={clearErrors}
    />
    <span className="form_error">{error}</span>
  </label>
);

export default Textfield;
