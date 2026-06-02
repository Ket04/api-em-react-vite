import { useState } from 'react';

export default function CategoryForm({ onAdd, loading }) {
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = nome.trim();
    if (!trimmedName) {
      setError('Informe o nome da categoria.');
      return;
    }

    try {
      await onAdd({ nome: trimmedName });
      setNome('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao cadastrar categoria.');
    }
  };

  return (
    <div className="card-glass rounded-2xl p-6">
      <h2 className="font-display text-lg text-white mb-5 flex items-center gap-2">
        <svg className="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
        </svg>
        Nova Categoria
      </h2>

      {error && (
        <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/25 rounded-lg px-4 py-2.5">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-400 mb-1.5">
            Nome da Categoria <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
              setError('');
            }}
            placeholder="Ex: Eletronicos"
            className="input-dark w-full"
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
          >
            {loading ? (
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            )}
            Cadastrar Categoria
          </button>
        </div>
      </form>
    </div>
  );
}
