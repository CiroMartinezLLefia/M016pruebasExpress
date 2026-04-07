import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../state/auth';
import { getUserAvatar } from '../lib/media';

export default function Layout({ children }) {
  const { isLogged, isEditor, isAdmin, logout, user } = useAuth();
  const avatar = getUserAvatar(user);

  return (
    <div className="shell">
      <div className="ambient ambient-top" aria-hidden="true" />
      <div className="ambient ambient-bottom" aria-hidden="true" />
      <header className="topbar">
        <Link to="/" className="brand">Vinacoteca Atelier</Link>
        <nav>
          <NavLink to="/">Cataleg</NavLink>
          {isLogged && <NavLink to="/pedidos">Comandes</NavLink>}
          {isEditor && <NavLink to="/editor">Editor</NavLink>}
          {isAdmin && <NavLink to="/admin">Admin</NavLink>}
        </nav>
        <div className="auth-zone">
          {!isLogged ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Registre</Link>
            </>
          ) : (
            <>
              <img className="avatar" src={avatar} alt={user?.nombre || 'Perfil'} />
              <div className="user-meta">
                <span>{user?.nombre || 'Usuari'}</span>
                <small>{user?.email}</small>
              </div>
              <button onClick={logout}>Sortir</button>
            </>
          )}
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
