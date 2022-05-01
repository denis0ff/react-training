import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { filterMainCardsSlice } from '../../store/reducers/FilterMainCardsSlice';
import cardFilter from '../../utils/data/cardFilter';
import { FilterValues } from '../../utils/types/types';
import Select from '../forms/Select';
import Textfield from '../forms/Textfield';
import './CardFilter.css';

const CardFilter = () => {
  const { filters } = useAppSelector((state) => state.filterMainCardsReducer);
  const { setFilters } = filterMainCardsSlice.actions;
  const dispatch = useAppDispatch();
  const { register, handleSubmit, setValue } = useForm<FilterValues>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<FilterValues> = ({ gender, species, status }) => {
    dispatch(setFilters({ gender, species, status }));
  };

  const onKeyPress = (e: React.KeyboardEvent) => e.key === 'Enter' && e.preventDefault();

  return (
    <form className="card-filter" onChange={handleSubmit(onSubmit)} onKeyPress={onKeyPress}>
      <div className="form_container">
        <Select
          data={cardFilter.status}
          register={register}
          setValue={() => setValue(cardFilter.status.name, filters.status)}
        />
        <Select
          data={cardFilter.gender}
          register={register}
          setValue={() => setValue(cardFilter.gender.name, filters.gender)}
        />
        <Textfield
          data={cardFilter.species}
          register={register}
          setValue={() => setValue(cardFilter.species.name, filters.species)}
        />
      </div>
    </form>
  );
};

export default CardFilter;
