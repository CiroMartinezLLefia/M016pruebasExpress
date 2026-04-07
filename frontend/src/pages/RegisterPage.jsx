import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../state/auth';

export default function RegisterPage() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget);

    try {
      await register(formData);
      nav('/');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="auth-layout">
      <div className="panel auth-visual register" aria-hidden="true" />
      <form className="panel form" onSubmit={onSubmit}>
        <p className="eyebrow">Nou Compte</p>
        <h2>Registre amb foto</h2>
        <input name="nombre" type="text" placeholder="Nom" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Contrasenya" required />
        <input name="foto" type="file" accept="image/*" required />
        {error && <p className="error">{error}</p>}
        <button>Crear compte</button>
      </form>
    </section>
  );
}
