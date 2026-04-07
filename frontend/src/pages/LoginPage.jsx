import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../state/auth';

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      nav('/');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="auth-layout">
      <div className="panel auth-visual" aria-hidden="true" />
      <form className="panel form" onSubmit={onSubmit}>
        <p className="eyebrow">Acces</p>
        <h2>Login</h2>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" required />
        {error && <p className="error">{error}</p>}
        <button>Entrar</button>
      </form>
    </section>
  );
}
