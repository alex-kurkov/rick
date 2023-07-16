import { NavLink } from 'react-router-dom';
import { NAV_ROUTES } from '../../data/nav-routes';
import './navigation.css';

export const Navigation = () => {
  return (
    <nav className="navigation">
      {NAV_ROUTES.map(({ to, id, name }) => (
        <NavLink to={to} key={id} className="navigation__link">
          {name.toLocaleUpperCase()}
        </NavLink>
      ))}
    </nav>
  );
};
