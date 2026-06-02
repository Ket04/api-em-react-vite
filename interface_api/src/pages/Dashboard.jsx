import { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import CategoryForm from '../components/CategoryForm';
import api from '../api/axios';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCat, setFilterCat] = useState('');
  const [search, setSearch] = useState('');
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [addingProduct, setAddingProduct] = useState(false);
  const [addingCategory, setAddingCategory] = useState(false);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchData = useCallback(async () => {
    setLoadingProducts(true);
    setError('');
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get('/produtos'),
        api.get('/categorias'),
      ]);
      setProducts(Array.isArray(prodRes.data) ? prodRes.data : prodRes.data?.content ?? []);
      setCategories(Array.isArray(catRes.data) ? catRes.data : catRes.data?.content ?? []);
    } catch (err) {
      setError('Não foi possível carregar os dados. Verifique se a API está rodando.');
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleAdd = async (newProduct) => {
    setAddingProduct(true);
    try {
      await api.post('/produtos', newProduct);
      await fetchData();
    } finally {
      setAddingProduct(false);
    }
  };

  const handleAddCategory = async (newCategory) => {
    setAddingCategory(true);
    try {
      await api.post('/categorias', newCategory);
      await fetchData();
    } finally {
      setAddingCategory(false);
    }
  };

  const confirmDelete = (id) => setDeleteConfirm(id);

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await api.delete(`/produtos/${deleteConfirm}`);
      setProducts((prev) => prev.filter((p) => p.id !== deleteConfirm));
    } catch {
      setError('Erro ao excluir o produto.');
    } finally {
      setDeleteConfirm(null);
    }
  };

  const filtered = products.filter((p) => {
    const catId = p.categoria?.id ?? p.categoriaId;
    const matchCat = !filterCat || String(catId) === String(filterCat);
    const matchSearch = !search || (p.nome || '').toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <StatCard label="Total de Produtos" value={products.length} icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          } />
          <StatCard label="Categorias" value={categories.length} icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
            </svg>
          } />
          <StatCard label="Exibindo" value={filtered.length} icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
          } />
        </div>

        {/* Formulário de cadastro */}
        <CategoryForm onAdd={handleAddCategory} loading={addingCategory} />
        <ProductForm categories={categories} onAdd={handleAdd} loading={addingProduct} />

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar produto…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-dark w-full pl-10"
            />
          </div>
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="input-dark sm:w-56"
          >
            <option value="">Todas as categorias</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nome || cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Error banner */}
        {error && (
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/25 text-red-400 rounded-lg px-5 py-3 text-sm">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
            <button onClick={fetchData} className="ml-auto underline hover:no-underline">Tentar novamente</button>
          </div>
        )}

        {/* Product grid */}
        {loadingProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card-glass rounded-xl h-40 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-600">
            <svg className="w-12 h-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="text-lg font-medium">Nenhum produto encontrado</p>
            <p className="text-sm mt-1">
              {search || filterCat ? 'Tente ajustar os filtros.' : 'Cadastre o primeiro produto acima.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onDelete={confirmDelete} />
            ))}
          </div>
        )}
      </main>

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="card-glass rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/15 border border-red-500/30 mx-auto mb-4">
              <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <h3 className="text-center font-display text-lg text-white mb-1">Excluir Produto</h3>
            <p className="text-center text-slate-400 text-sm mb-6">
              Esta ação é permanente e não pode ser desfeita.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg py-2.5 text-sm font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 hover:bg-red-400 text-white rounded-lg py-2.5 text-sm font-medium transition-colors"
              >
                Sim, excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="card-glass rounded-xl px-5 py-4 flex items-center gap-4">
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-500/15 text-brand-400 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-white">{value}</p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  );
}
