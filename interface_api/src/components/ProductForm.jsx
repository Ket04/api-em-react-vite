import { useState } from 'react';

export default function ProductForm({ categories, onAdd, loading }) {
  const [form, setForm] = useState({ nome: '', preco: '', categoriaId: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.preco || !form.categoriaId) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }
    const preco = parseFloat(form.preco.replace(',', '.'));
    if (isNaN(preco) || preco < 0) {
      setError('Preço inválido.');
      return;
    }
    try {
      await onAdd({ nome: form.nome.trim(), preco, categoriaId: Number(form.categoriaId) });
      setForm({ nome: '', preco: '', categoriaId: '' });
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao cadastrar produto.');
    }
  };

  return (
    <div className="card-glass rounded-2xl p-6">
      <h2 className="font-display text-lg text-white mb-5 flex items-center gap-2">
        <svg className="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 4v16m8-8H4" />
        </svg>
        Novo Produto
      </h2>

      {error && (
        <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/25 rounded-lg px-4 py-2.5">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-slate-400 mb-1.5">
              Nome do Produto <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Ex: Teclado Mecânico"
              className="input-dark w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">
              Preço (R$) <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="preco"
              value={form.preco}
              onChange={handleChange}
              placeholder="0,00"
              className="input-dark w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">
              Categoria <span className="text-red-400">*</span>
            </label>
            <select
              name="categoriaId"
              value={form.categoriaId}
              onChange={handleChange}
              className="input-dark w-full"
            >
              <option value="">Selecione…</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome || cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center gap-2"
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
            Cadastrar Produto
          </button>
        </div>
      </form>
    </div>
  );
}
