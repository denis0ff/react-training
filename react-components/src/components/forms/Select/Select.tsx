import { FormInputProps } from '../../../utils/types/types';

const Select = ({ data, register, error, clearErrors, setValue }: FormInputProps) => {
  if (setValue) setValue();

  return (
    <label className={`form_field field-${data.name}`}>
      {data.label}
      <select
        className={`form_${data.name}`}
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
};

export default Select;
