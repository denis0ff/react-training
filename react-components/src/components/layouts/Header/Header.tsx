import { Component } from 'react';
import { NavBar } from '../NavBar/NavBar';
import './Header.css';

export class Header extends Component {
  render = () => (
    <header className="header">
      <NavBar />
    </header>
  );
}
