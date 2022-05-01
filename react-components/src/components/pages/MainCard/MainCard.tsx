import { useCallback, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import { Paths } from '../../../utils/types/types';
import ModalCard from '../../layouts/ModalCard';
import './MainCard.css';

const MainCard = () => {
  const { cardId } = useParams();
  const { cards } = useAppSelector((state) => state.mainCardsReducer);

  const navigate = useNavigate();
  const [data] = cards.filter(({ id }) => id === Number(cardId));
  const shouldRedirect = useRef(false);
  const navigateMain = useCallback(() => navigate(Paths.MAIN), [navigate]);

  useEffect(() => {
    shouldRedirect.current = !data;
  }, [data]);

  useEffect(() => {
    if (shouldRedirect.current) navigateMain();
  });

  return (
    <div className="main-card">
      <button className="main-card_back" onClick={navigateMain}>
        Back
      </button>
      <ModalCard data={data} />
    </div>
  );
};

export default MainCard;
