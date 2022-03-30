import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Paths } from '../../utils/types';
import './Header.css';

export class Header extends Component {
  render = () => (
    <header className="header horizontal">
      <nav className="header_nav">
        <NavLink className="header_link" to={Paths.MAIN}>
          Main
        </NavLink>
        <NavLink className="header_link" to={Paths.ABOUT_US}>
          About Us
        </NavLink>
      </nav>
    </header>
  );
}
