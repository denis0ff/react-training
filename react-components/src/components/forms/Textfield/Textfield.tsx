import { FormInputProps } from '../../../utils/types/types';

const Textfield = ({ data, register, error, clearErrors, setValue }: FormInputProps) => {
  if (setValue) setValue();
  return (
    <label className={`form_field field-${data.name}`}>
      {data.label}
      <input
        className={`form_${data.name}`}
        type="text"
        {...register(data.name, { ...data.register })}
        onInput={clearErrors}
      />
      <span className="form_error">{error}</span>
    </label>
  );
};

export default Textfield;
