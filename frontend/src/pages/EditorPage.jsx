import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../state/auth';

export default function EditorPage() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  async function load() {
    const [vinos, chelas] = await Promise.all([api('/api/vinos'), api('/api/chelas')]);
    setItems([
      ...vinos.map((v) => ({ ...v, tipoApi: 'vino' })),
      ...chelas.map((c) => ({ ...c, tipoApi: 'chela' }))
    ]);
  }

  useEffect(() => {
    load().catch((err) => setError(err.message));
  }, []);

  async function eliminar(item) {
    const endpoint = item.tipoApi === 'vino' ? `/api/vinos/${item._id}` : `/api/chelas/${item._id}`;
    try {
      await api(endpoint, { method: 'DELETE' }, token);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function crear(e) {
    e.preventDefault();
    setError('');
    const form = new FormData(e.currentTarget);
    const tipo = form.get('apiTipo');
    const endpoint = tipo === 'vino' ? '/api/vinos' : '/api/chelas';
    const payload = new FormData();

    payload.append('descripcion', form.get('descripcion'));
    payload.append('tipo', form.get('tipoProducto'));
    payload.append('graduacion', form.get('graduacion'));
    payload.append('price', form.get('price'));

    if (tipo === 'vino') {
      payload.append('name', form.get('nombreProducto'));
    } else {
      payload.append('nombre', form.get('nombreProducto'));
    }

    const imagen = form.get('imagen');
    if (imagen && imagen.size > 0) {
      payload.append('imagen', imagen);
    }

    try {
      await api(endpoint, {
        method: 'POST',
        body: payload
      }, token);
      e.currentTarget.reset();
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="grid-two">
      <form className="panel form" onSubmit={crear}>
        <h2>Crear producte</h2>
        <select name="apiTipo">
          <option value="vino">Vino</option>
          <option value="chela">Chela</option>
        </select>
        <input name="nombreProducto" placeholder="Nom" required />
        <input name="descripcion" placeholder="Descripcio" required />
        <input name="tipoProducto" placeholder="Tipus" required />
        <input name="graduacion" type="number" min="0" max="100" placeholder="Graduacio" required />
        <input name="price" type="number" min="0" step="0.01" placeholder="Preu" required />
        <input name="imagen" type="file" accept="image/*" />
        <button>Afegir</button>
        {error && <p className="error">{error}</p>}
      </form>
      <div className="panel">
        <h2>Catalog administrable</h2>
        <ul className="simple-list">
          {items.map((item) => (
            <li key={`${item.tipoApi}-${item._id}`}>
              <span>{item.tipoApi}: {item.name || item.nombre}</span>
              <button onClick={() => eliminar(item)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
