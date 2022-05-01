import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { mainCardsSlice } from '../../../store/reducers/MainCardsSlice';
import { createPageArray } from '../../../utils/helpers/pagination';

import './Pagination.css';

const totalOptions = [1, 2, 4, 5, 10, 20];

const Pagination = () => {
  const { info } = useAppSelector((state) => state.mainCardsReducer);
  const { setTotal, setCurrent } = mainCardsSlice.actions;
  const dispatch = useAppDispatch();

  const handleTotalResults = (total: number) => dispatch(setTotal(total));
  const handlePageNumber = (current: number) => dispatch(setCurrent(current));

  return (
    <div className="pagination">
      <div className="pagination_container">
        <label className="current-page">
          Page
          <select
            className="current-page_input"
            value={info.current}
            onChange={({ target }) => handlePageNumber(+target.value)}
          >
            {createPageArray(info.newPages).map((item) => (
              <option key={'page_' + item}>{item}</option>
            ))}
          </select>
        </label>
        from
        <span className="pagination_total">{info.newPages}</span>
      </div>
      <div className="pagination_container">
        <label className="total-result">
          Total results:
          <select
            className="total-result_input"
            defaultValue={info.total}
            onChange={({ target }) => handleTotalResults(+target.value)}
          >
            {totalOptions.map((item) => (
              <option key={'total_' + item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default Pagination;
