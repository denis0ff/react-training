import { Link, Outlet } from 'react-router-dom';
import { ICharacter } from '../../../../api/rickAndMorty/types';
import { Paths } from '../../../../utils/types/types';
import './Card.css';

type Props = {
  data: ICharacter;
};

const Card = ({ data }: Props) => (
  <>
    <Link to={`${Paths.MAIN}${data.id}`} key={data.id}>
      <li className="card" data-testid="card">
        <img className="card_image" src={data.image}></img>
        <h3 className="card_title">{data.name}</h3>
      </li>
    </Link>
    <Outlet />
  </>
);

export default Card;
