import { FormInputProps } from '../../../utils/types/types';

const Select = ({ data, register, error, clearErrors }: FormInputProps) => (
  <label className="form_field">
    {data.label}
    <select
      className="form_country"
      defaultValue={data.options ? data.options[0] : ''}
      {...register(data.name, { ...data.register })}
      onInput={clearErrors}
    >
      {data.options?.map((item, idx) => (
        <option key={idx} disabled={idx === 0}>
          {item}
        </option>
      ))}
    </select>
    <span className="form_error">{error}</span>
  </label>
);

export default Select;
