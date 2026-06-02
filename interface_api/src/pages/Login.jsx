import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', senha: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.senha) {
      setError('Preencha todos os campos.');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email: form.email, senha: form.senha });
      const { token, ...userData } = res.data;
      login(userData, token);
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || '';
      setError(msg || 'Usuário ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo / header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-500/20 border border-brand-500/40 mb-4">
            <svg className="w-7 h-7 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h1 className="font-display text-3xl text-white tracking-tight">InvenTech</h1>
          <p className="text-slate-500 mt-1 text-sm">Sistema de Gerenciamento de Inventário</p>
        </div>

        {/* Card */}
        <div className="card-glass rounded-2xl p-8">
          <h2 className="font-display text-xl text-white mb-6">Entrar na plataforma</h2>

          {error && (
            <div className="mb-4 flex items-start gap-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm">
              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@fatec.sp.gov.br"
                  className="input-dark w-full"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">
                  Senha
                </label>
                <input
                  type="password"
                  name="senha"
                  value={form.senha}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-dark w-full"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                  </svg>
                  Entrando…
                </>
              ) : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
