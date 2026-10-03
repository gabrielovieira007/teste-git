import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductCard from './ProductCard'

const product = {
  id: 1,
  title: 'Smartphone Teste',
  description: 'Descrição do produto',
  price: 1999.9,
  thumbnail: 'https://example.com/produto.jpg',
}

describe('ProductCard', () => {
  describe('Renderização', () => {
    it('deve renderizar os dados do produto', () => {
      render(<ProductCard product={product} onSelect={vi.fn()} />)

      expect(screen.getByRole('heading', { level: 2, name: product.title })).toBeInTheDocument()
      expect(screen.getByText(product.description)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Ver produto' })).toBeInTheDocument()
    })

    it('deve renderizar a imagem com src e texto alternativo corretos', () => {
      render(<ProductCard product={product} onSelect={vi.fn()} />)

      const image = screen.getByRole('img', { name: product.title })
      expect(image).toHaveAttribute('src', product.thumbnail)
      expect(image).toHaveAttribute('alt', product.title)
    })
  })

  describe('Interações', () => {
    it('deve chamar onSelect com o produto ao clicar em Ver produto', async () => {
      const user = userEvent.setup()
      const onSelect = vi.fn()
      render(<ProductCard product={product} onSelect={onSelect} />)

      await user.click(screen.getByRole('button', { name: 'Ver produto' }))

      expect(onSelect).toHaveBeenCalledTimes(1)
      expect(onSelect).toHaveBeenCalledWith(product)
    })
  })

  describe('Estrutura', () => {
    it('deve renderizar um article com a classe product-card', () => {
      const { container } = render(<ProductCard product={product} onSelect={vi.fn()} />)
      const article = container.querySelector('article')
      expect(article).toBeInTheDocument()
      expect(article).toHaveClass('product-card')
    })

    it('deve possuir botão do tipo button', () => {
      render(<ProductCard product={product} onSelect={vi.fn()} />)
      expect(screen.getByRole('button', { name: 'Ver produto' })).toHaveAttribute('type', 'button')
    })
  })
})
