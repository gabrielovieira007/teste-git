import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import SearchForm from './components/SearchForm'
import ProductList from './components/ProductList'
import Loading from './components/Loading'
import ErrorMessage from './components/ErrorMessage'
import { getProducts } from './services/productService'
import { filterProducts } from './utils/filterProducts'

export default function App() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        setError('')
        const data = await getProducts()
        setProducts(data)
      } catch {
        setError('Não foi possível carregar os produtos.')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const filteredProducts = useMemo(
    () => filterProducts(products, search),
    [products, search]
  )

  return (
    <>
      <Header />

      <main className="container">
        <SearchForm onSearch={setSearch} />

        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && (
          <ProductList
            products={filteredProducts}
            onSelect={setSelectedProduct}
          />
        )}

        {selectedProduct && (
          <aside className="selected-product" aria-label="Produto selecionado">
            Produto selecionado: <strong>{selectedProduct.title}</strong>
          </aside>
        )}
      </main>
    </>
  )
}
