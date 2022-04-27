import Breadcrumbs from '../Breadcrumbs';
import NavBar from '../NavBar';
import './Header.css';

const Header = () => (
  <header className="header">
    <NavBar />
    <Breadcrumbs />
  </header>
);

export default Header;
