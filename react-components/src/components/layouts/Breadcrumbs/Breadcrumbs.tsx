import { NavLink } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import './Breadcrumbs.css';

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <nav className="breadcrumb">
      <ul className="breadcrumb_list">
        {breadcrumbs.map(({ match, breadcrumb }) => (
          <li key={match.pathname} className="breadcrumb_item">
            <NavLink
              className={({ isActive }) => `breadcrumb_link ${isActive ? 'active_link' : ''}`}
              to={match.pathname}
            >
              {breadcrumb}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
