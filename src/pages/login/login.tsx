import React, { FormEventHandler } from 'react';
import { useAuth } from '../../context/authProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import { RouterPaths } from '../../router/router-paths';
import './login.css';

const INPUT_NAME = 'username';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const userName = formData.get(INPUT_NAME) as string | null;

    if (!userName || userName.length === 0) return;

    login(userName, () => {
      const toPathname = location.state?.from + location.state.search || RouterPaths.MAIN;
      navigate(toPathname, { replace: true });
    });
  };

  return (
    <div className="login">
      <h2 className="login__title">LOGIN PAGE</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <label className="login__label">
          ENTER NON-EMPTY PHRAZE TO LOGIN
          <input className="login__input" type="text" name={INPUT_NAME} />
        </label>
        <button className="login__button" type="submit">
          LOG IN
        </button>
      </form>
    </div>
  );
};
