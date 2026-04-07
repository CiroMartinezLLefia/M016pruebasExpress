import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api, buildUrl } from '../lib/api';

export default function ProductDetailPage() {
  const { tipo, id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const endpoint = tipo === 'vino' ? `/api/vinos/${id}` : `/api/chelas/${id}`;
        const data = await api(endpoint);
        setProducto(data);
      } catch (err) {
        setError(err.status === 404 ? 'Producte no trobat' : err.message);
      }
    })();
  }, [tipo, id]);

  if (error) return <p>{error}</p>;
  if (!producto) return <p>Carregant producte...</p>;

  return (
    <article className="panel detail">
      <h2>{producto.name || producto.nombre}</h2>
      {producto.imagen && <img src={buildUrl(producto.imagen)} alt={producto.name || producto.nombre} />}
      <p>{producto.descripcion || 'Sense descripcio'}</p>
      <p>Tipus: {producto.tipo || 'n/d'}</p>
      <p>Graduacio: {producto.graduacion || 0}%</p>
      <strong>{producto.price} EUR</strong>
    </article>
  );
}
