import ProductCard from './ProductCard'

export default function ProductList({ products, onSelect }) {
  if (products.length === 0) {
    return <p className="message">Nenhum produto encontrado.</p>
  }

  return (
    <section aria-label="Lista de produtos" className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelect}
        />
      ))}
    </section>
  )
}
