import { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import cardFilter from '../../utils/data/cardFilter';
import { Actions } from '../../utils/reducers/appReducer';
import { FilterValues } from '../../utils/types/types';
import { AppContext } from '../contexts/AppContext';
import Select from '../forms/Select';
import Textfield from '../forms/Textfield';
import './CardFilter.css';

const CardFilter = () => {
  const { state, dispatch } = useContext(AppContext);
  const { register, handleSubmit, setValue } = useForm<FilterValues>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<FilterValues> = ({ gender, species, status }) => {
    dispatch({
      type: Actions.SET_FILTER_CARD,
      payload: { gender, species, status },
    });
  };

  const onKeyPress = (e: React.KeyboardEvent) => e.key === 'Enter' && e.preventDefault();

  return (
    <form className="card-filter" onChange={handleSubmit(onSubmit)} onKeyPress={onKeyPress}>
      <div className="form_container">
        <Select
          data={cardFilter.status}
          register={register}
          setValue={() => setValue(cardFilter.status.name, state.filterCards.status)}
        />
        <Select
          data={cardFilter.gender}
          register={register}
          setValue={() => setValue(cardFilter.gender.name, state.filterCards.gender)}
        />
        <Textfield
          data={cardFilter.species}
          register={register}
          setValue={() => setValue(cardFilter.species.name, state.filterCards.species)}
        />
      </div>
    </form>
  );
};

export default CardFilter;
