import { ICardGen } from '../../utils/types/types';
import './CardGen.css';

const CardGen = ({ image, fullName, date, country, gender }: ICardGen) => (
  <li className="card-gen_item">
    <img className="card-gen_image" src={image} />
    <p className="card-gen_field">
      Name: <span>{fullName}</span>
    </p>
    <p className="card-gen_field">
      Delivery date: <span>{date}</span>
    </p>
    <p className="card-gen_field">
      Country: <span>{country}</span>
    </p>
    <p className="card-gen_field">
      Gender: <span>{gender}</span>
    </p>
  </li>
);

export default CardGen;
