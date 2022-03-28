import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Paths } from '../utils/types';

export class Header extends Component {
  render = () => (
    <header className="header">
      <nav className="header_nav">
        <NavLink to={Paths.MAIN}>Главная</NavLink>
        <NavLink to={Paths.ABOUT_US}>О нас</NavLink>
      </nav>
    </header>
  );
}
