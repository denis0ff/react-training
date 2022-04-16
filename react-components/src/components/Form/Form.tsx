import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formFields } from '../../utils/data/formFields';
import { FormValues, ICardGen } from '../../utils/types/types';
import Checkbox from '../forms/Checkbox';
import DatePicker from '../forms/DatePicker';
import ImageUpload from '../forms/ImageUpload';
import Select from '../forms/Select';
import Submit from '../forms/Submit';
import Switcher from '../forms/Switcher';
import Textfield from '../forms/Textfield';
import './Form.css';

interface Props {
  setCards: Dispatch<SetStateAction<ICardGen[]>>;
}

const Form = ({ setCards }: Props) => {
  const { register, formState, handleSubmit, reset, clearErrors } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });
  const { isDirty, isSubmitSuccessful, errors } = formState;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setCards((prev) => [
      ...prev,
      {
        country: data.country,
        date: data.date,
        fullName: data.fullName,
        gender: data.gender,
        image: URL.createObjectURL(data.image[0] as Blob),
      },
    ]);
    reset();
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <Textfield
        data={formFields.fullName}
        error={errors[formFields.fullName.name]?.message}
        register={register}
        clearErrors={() => clearErrors(formFields.fullName.name)}
      />
      <div className="form_container">
        <DatePicker
          data={formFields.date}
          error={errors[formFields.date.name]?.message}
          register={register}
          clearErrors={() => clearErrors(formFields.date.name)}
        />
        <Select
          data={formFields.country}
          error={errors[formFields.country.name]?.message}
          register={register}
          clearErrors={() => clearErrors(formFields.country.name)}
        />
      </div>
      <Checkbox
        data={formFields.agree}
        error={errors[formFields.agree.name]?.message}
        register={register}
        clearErrors={() => clearErrors(formFields.agree.name)}
      />
      <div className="form_container">
        <Switcher
          data={formFields.gender}
          error={errors[formFields.gender.name]?.message}
          register={register}
          clearErrors={() => clearErrors(formFields.gender.name)}
        />
        <ImageUpload
          data={formFields.image}
          error={errors[formFields.image.name]?.message}
          register={register}
          clearErrors={() => clearErrors(formFields.image.name)}
        />
      </div>
      <Submit isSaved={isSubmitSuccessful} isDisabled={!(isDirty && !Object.keys(errors).length)} />
    </form>
  );
};

export default Form;
