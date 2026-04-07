import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const value = useMemo(() => ({
    token,
    user,
    isLogged: Boolean(token),
    isEditor: user?.rol === 'editor' || user?.rol === 'admin',
    isAdmin: user?.rol === 'admin',
    async login(email, password) {
      const data = await api('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      setToken(data.token);
      setUser(data.usuari);
      return data;
    },
    async register(formData) {
      const data = await api('/api/auth/registro', {
        method: 'POST',
        body: formData
      });
      setToken(data.token);
      setUser(data.usuari);
      return data;
    },
    async refreshProfile() {
      if (!token) return null;
      const data = await api('/api/auth/perfil', {}, token);
      setUser(data);
      return data;
    },
    logout() {
      setToken('');
      setUser(null);
    }
  }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
