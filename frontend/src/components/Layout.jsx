import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../state/auth';

export default function Layout({ children }) {
  const { isLogged, isEditor, isAdmin, logout, user } = useAuth();

  return (
    <div className="shell">
      <header className="topbar">
        <Link to="/" className="brand">Vinacoteca</Link>
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
              <span>{user?.email}</span>
              <button onClick={logout}>Sortir</button>
            </>
          )}
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
