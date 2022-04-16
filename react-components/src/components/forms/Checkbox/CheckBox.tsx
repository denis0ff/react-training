import { FormInputProps } from '../../../utils/types/types';

const Checkbox = ({ data, register, error, clearErrors }: FormInputProps) => (
  <div>
    <label className="form_agree-container">
      {data.label}
      <input
        className="form_agree"
        type="checkbox"
        {...register(data.name, { ...data.register })}
        onInput={clearErrors}
      />
      <span className="form_agree-checkmark"></span>
    </label>
    <span className="form_error">{error}</span>
  </div>
);

export default Checkbox;
