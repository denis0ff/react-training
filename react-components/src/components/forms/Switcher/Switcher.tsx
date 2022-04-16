import { FormInputProps } from '../../../utils/types/types';

const Switcher = ({ data, register, error, clearErrors }: FormInputProps) => (
  <div className="form_radiogroup">
    <input
      className="form_gender"
      type="radio"
      id={data.options ? data.options[0] : ''}
      value={data.options ? data.options[0] : ''}
      {...register(data.name, { ...data.register })}
      onInput={clearErrors}
    />
    <label className="form_field" htmlFor={data.options ? data.options[0] : ''}>
      {data.options ? data.options[0] : ''}
    </label>
    <input
      className="form_gender"
      type="radio"
      id={data.options ? data.options[1] : ''}
      value={data.options ? data.options[1] : ''}
      {...register(data.name, { ...data.register })}
      onInput={clearErrors}
    />
    <label className="form_field" htmlFor={data.options ? data.options[1] : ''}>
      {data.options ? data.options[1] : ''}
    </label>
    <span className="form_error">{error}</span>
  </div>
);

export default Switcher;
