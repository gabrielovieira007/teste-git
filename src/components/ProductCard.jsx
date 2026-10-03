import { formatCurrency } from '../utils/formatCurrency'

export default function ProductCard({ product, onSelect }) {
  return (
    <article className="product-card">
      <img src={product.thumbnail} alt={product.title} />

      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <strong>{formatCurrency(product.price)}</strong>
      </div>

      <button type="button" onClick={() => onSelect(product)}>
        Ver produto
      </button>
    </article>
  )
}
