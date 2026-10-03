export function filterProducts(products, search) {
  const term = search.trim().toLowerCase()

  if (!term) {
    return products
  }

  return products.filter((product) =>
    product.title.toLowerCase().includes(term)
  )
}
