import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { getProductImage } from '../lib/media';

export default function CatalogPage() {
  const [vinos, setVinos] = useState([]);
  const [chelas, setChelas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [v, c] = await Promise.all([
          api('/api/vinos'),
          api('/api/chelas')
        ]);
        setVinos(v);
        setChelas(c);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Carregant cataleg...</p>;
  if (error) return <p>Error carregant cataleg: {error}</p>;

  return (
    <section className="catalog-wrap">
      <section className="hero panel">
        <p className="eyebrow">Seleccio Curada</p>
        <h1>Vins i cerveses amb personalitat</h1>
        <p>
          Descobreix referencies especials, etiqueta artesanal i novetats de temporada.
          El cataleg manté tota la funcionalitat, ara amb una experiència visual molt més viva.
        </p>
      </section>

      <section className="grid-catalog">
        <div className="panel">
        <h2>Vins</h2>
        <ul className="cards">
          {vinos.map((vino) => (
            <li key={vino._id}>
              <img src={getProductImage(vino, 'vino')} alt={vino.name} loading="lazy" />
              <h3>{vino.name}</h3>
              <p>{vino.descripcion || 'Sense descripcio'}</p>
              <strong>{vino.price} EUR</strong>
              <Link to={`/producto/vino/${vino._id}`}>Veure detall</Link>
            </li>
          ))}
        </ul>
        </div>
        <div className="panel">
        <h2>Cerveses</h2>
        <ul className="cards">
          {chelas.map((chela) => (
            <li key={chela._id}>
              <img src={getProductImage(chela, 'chela')} alt={chela.nombre} loading="lazy" />
              <h3>{chela.nombre}</h3>
              <p>{chela.descripcion || 'Sense descripcio'}</p>
              <strong>{chela.price} EUR</strong>
              <Link to={`/producto/chela/${chela._id}`}>Veure detall</Link>
            </li>
          ))}
        </ul>
        </div>
      </section>
    </section>
  );
}
