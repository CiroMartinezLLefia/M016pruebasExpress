import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../state/auth';
import { getUserAvatar } from '../lib/media';

export default function AdminPage() {
  const { token } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');

  async function load() {
    const data = await api('/api/usuarios', {}, token);
    setUsuarios(data);
  }

  useEffect(() => {
    load().catch((err) => setError(err.message));
  }, []);

  async function cambiarRol(id, rol) {
    try {
      await api(`/api/usuarios/${id}/rol`, {
        method: 'PATCH',
        body: JSON.stringify({ rol })
      }, token);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="panel">
      <h2>Gestio usuaris i rols</h2>
      {error && <p className="error">{error}</p>}
      <ul className="simple-list">
        {usuarios.map((u) => (
          <li key={u._id}>
            <span className="list-item-rich">
              <img src={getUserAvatar(u)} alt={u.nombre || u.email} />
              <span>{u.email} ({u.rol})</span>
            </span>
            <select value={u.rol} onChange={(e) => cambiarRol(u._id, e.target.value)}>
              <option value="usuari">usuari</option>
              <option value="editor">editor</option>
              <option value="admin">admin</option>
            </select>
          </li>
        ))}
      </ul>
    </section>
  );
}
