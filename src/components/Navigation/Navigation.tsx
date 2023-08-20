import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_ROUTES } from '../../data/nav-routes';
import { useAuth } from '../../context/authProvider';
import { RouterPaths } from '../../router/router-paths';
import { Box, NavLink } from '@mantine/core';

export const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout(() => {
      navigate(RouterPaths.LOGIN, {
        state: {
          from: location.pathname,
          search: location.search,
        },
      });
    });
  };

  return (
    <Box
      component="nav"
      w={240}
      my={2}
      mx="auto"
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
      })}>
      {NAV_ROUTES.map(({ to, id, name }) => (
        <NavLink
          variant="filled"
          h={40}
          active={location.pathname === `/${to}`}
          component="a"
          c="white"
          onClick={() => navigate(to)}
          key={id}
          label={name.toLocaleUpperCase()}
          bg="#1113"
          sx={(_) => ({
            '&:hover': {
              backgroundColor: '#1118',
            },
          })}
        />
      ))}
      {user && (
        <NavLink
          sx={(_) => ({
            '&:hover': {
              backgroundColor: '#1118',
            },
          })}
          c="white"
          onClick={handleLogout}
          label="LOGOUT"
          bg="#1113"
        />
      )}
    </Box>
  );
};
