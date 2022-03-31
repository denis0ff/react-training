import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Paths } from '../../../utils/types';
import './NavBar.css';

export class NavBar extends Component {
  render = () => (
    <nav className="header_nav">
      <NavLink
        className={({ isActive }) => `header_link ${isActive ? 'active_link' : ''}`}
        to={Paths.MAIN}
      >
        Main
      </NavLink>
      <NavLink
        className={({ isActive }) => `header_link ${isActive ? 'active_link' : ''}`}
        to={Paths.ABOUT_US}
      >
        About Us
      </NavLink>
    </nav>
  );
}
