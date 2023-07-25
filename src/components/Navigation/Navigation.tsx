import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { NAV_ROUTES } from '../../data/nav-routes';
import { useAuth } from '../../context/authProvider';
import { RouterPaths } from '../../router/router-paths';
import './Navigation.css';

export const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout(() => {
      navigate(RouterPaths.LOGIN, {
        state: {
          from: location.pathname,
          search: location.search
      }})
    })
  }

  return (
    <>
      <nav className="navigation">
        {NAV_ROUTES.map(({ to, id, name }) => (
          <NavLink to={to} key={id} className="navigation__link">
            {name.toLocaleUpperCase()}
          </NavLink>
        ))}
        {user && (
          <button onClick={handleLogout} className="navigation__logout">
            LOG OUT
          </button>
        )}
      </nav>
    </>
  );
};
