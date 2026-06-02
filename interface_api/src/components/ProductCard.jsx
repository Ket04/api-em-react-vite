export default function ProductCard({ product, onDelete }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price ?? 0);

  const categoryName =
    product.categoria?.nome ||
    product.nomeCategoria ||
    product.categoryName ||
    '—';

  return (
    <div className="card-glass rounded-xl p-5 flex flex-col gap-3 hover:border-brand-500/25 transition-all duration-200 group">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-white text-base leading-snug line-clamp-2 group-hover:text-brand-300 transition-colors">
          {product.nome || product.name || 'Produto sem nome'}
        </h3>
        <span className="tag shrink-0">{categoryName}</span>
      </div>

      {product.descricao && (
        <p className="text-slate-500 text-sm line-clamp-2">{product.descricao}</p>
      )}

      <div className="mt-auto flex items-center justify-between pt-2 border-t border-slate-800">
        <span className="font-mono font-semibold text-brand-400 text-lg">
          {formatPrice(product.preco ?? product.price)}
        </span>
        <button
          onClick={() => onDelete(product.id)}
          className="btn-danger flex items-center gap-1.5"
          title="Excluir produto"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-1-3H10a1 1 0 00-1 1v1h6V5a1 1 0 00-1-1z" />
          </svg>
          Excluir
        </button>
      </div>
    </div>
  );
}
