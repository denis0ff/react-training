import { useContext } from 'react';
import { createPageArray } from '../../../utils/helpers/pagination';
import { Actions } from '../../../utils/reducers/appReducer';
import { AppContext } from '../../contexts/AppContext';
import './Pagination.css';

const totalOptions = [1, 2, 4, 5, 10, 20];

const Pagination = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleTotalResults = (total: number) => {
    dispatch({
      type: Actions.SET_MAIN_PAGE_TOTAL,
      payload: { total },
    });
  };

  const handlePageNumber = (current: number) => {
    dispatch({
      type: Actions.SET_MAIN_PAGE_CURRENT,
      payload: { current },
    });
  };

  return (
    <div className="pagination">
      <div className="pagination_container">
        <label className="current-page">
          Page
          <select
            className="current-page_input"
            value={state.mainPageInfo.current}
            onChange={({ target }) => handlePageNumber(+target.value)}
          >
            {createPageArray(state.mainPageInfo.newPages).map((item) => (
              <option key={'page_' + item}>{item}</option>
            ))}
          </select>
        </label>
        from
        <span className="pagination_total">{state.mainPageInfo.newPages}</span>
      </div>
      <div className="pagination_container">
        <label className="total-result">
          Total results:
          <select
            className="total-result_input"
            defaultValue={state.mainPageInfo.total}
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
