import React, { createContext, useContext } from 'react';
import { useLocaStorage } from '../utils/useLocalStorage';

type User = string | null;
type Cb = () => void;

interface IAuthContext {
  user: User;
  login: (user: User, cb?: Cb) => void;
  logout: (cb?: Cb) => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocaStorage<User>('user', null);
  
  const login = (newUser: User, cb?: Cb) => {
    setUser(newUser);
    if (typeof cb === 'function') cb();
  };
  const logout = (cb?: Cb) => {
    setUser(null);
    if (typeof cb === 'function') cb();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
