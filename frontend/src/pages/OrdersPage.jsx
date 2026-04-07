import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../state/auth';

export default function OrdersPage() {
  const { token } = useAuth();
  const [vinos, setVinos] = useState([]);
  const [chelas, setChelas] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState('vino');
  const [error, setError] = useState('');

  async function cargarDatos() {
    const [v, c, p] = await Promise.all([
      api('/api/vinos'),
      api('/api/chelas'),
      api('/api/pedidos/me', {}, token)
    ]);
    setVinos(v);
    setChelas(c);
    setPedidos(p);
  }

  useEffect(() => {
    cargarDatos().catch((err) => setError(err.message));
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');

    const form = new FormData(e.currentTarget);
    const tipusProducte = form.get('tipusProducte');
    const producteId = form.get('producteId');
    const cantidad = Number(form.get('cantidad'));

    try {
      await api('/api/pedidos', {
        method: 'POST',
        body: JSON.stringify({
          items: [{ tipusProducte, producteId, cantidad }]
        })
      }, token);
      e.currentTarget.reset();
      await cargarDatos();
    } catch (err) {
      setError(err.message);
    }
  }

  const options = tipoSeleccionado === 'vino'
    ? vinos.map((v) => ({ id: v._id, label: `Vino: ${v.name}` }))
    : chelas.map((c) => ({ id: c._id, label: `Chela: ${c.nombre}` }));

  return (
    <section className="grid-two">
      <form className="panel form" onSubmit={onSubmit}>
        <h2>Nova comanda</h2>
        <select name="tipusProducte" required value={tipoSeleccionado} onChange={(e) => setTipoSeleccionado(e.target.value)}>
          <option value="vino">Vino</option>
          <option value="chela">Chela</option>
        </select>
        <select name="producteId" required>
          {options.map((o) => <option value={o.id} key={o.id}>{o.label}</option>)}
        </select>
        <input name="cantidad" type="number" min="1" defaultValue="1" required />
        {error && <p className="error">{error}</p>}
        <button>Crear comanda</button>
      </form>

      <div className="panel">
        <h2>Les meves comandes</h2>
        <ul className="simple-list">
          {pedidos.map((p) => (
            <li key={p._id}>#{p._id.slice(-6)} - {p.total} EUR - {new Date(p.createdAt).toLocaleString()}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
