import { Component } from 'react';
import NavBar from '../NavBar';
import './Header.css';

class Header extends Component {
  render = () => (
    <header className="header">
      <NavBar />
    </header>
  );
}

export default Header;
