import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductList from './ProductList'

const products = [
  { id: 1, title: 'Produto 1', description: 'Descrição 1', price: 10, thumbnail: 'produto1.jpg' },
  { id: 2, title: 'Produto 2', description: 'Descrição 2', price: 20, thumbnail: 'produto2.jpg' },
]

describe('ProductList', () => {
  describe('Lista vazia', () => {
    it('deve exibir mensagem quando não houver produtos', () => {
      render(<ProductList products={[]} onSelect={vi.fn()} />)
      expect(screen.getByText('Nenhum produto encontrado.')).toBeInTheDocument()
    })

    it('não deve renderizar a seção de produtos quando a lista estiver vazia', () => {
      render(<ProductList products={[]} onSelect={vi.fn()} />)
      expect(screen.queryByRole('region', { name: 'Lista de produtos' })).not.toBeInTheDocument()
    })
  })

  describe('Lista preenchida', () => {
    it('deve renderizar a seção de produtos', () => {
      render(<ProductList products={products} onSelect={vi.fn()} />)
      expect(screen.getByRole('region', { name: 'Lista de produtos' })).toBeInTheDocument()
    })

    it('deve renderizar todos os produtos recebidos', () => {
      render(<ProductList products={products} onSelect={vi.fn()} />)
      expect(screen.getByText('Produto 1')).toBeInTheDocument()
      expect(screen.getByText('Produto 2')).toBeInTheDocument()
      expect(screen.getAllByRole('button', { name: 'Ver produto' })).toHaveLength(2)
    })

    it('não deve exibir mensagem de lista vazia', () => {
      render(<ProductList products={products} onSelect={vi.fn()} />)
      expect(screen.queryByText('Nenhum produto encontrado.')).not.toBeInTheDocument()
    })
  })

  describe('Interações', () => {
    it('deve repassar onSelect aos cards', async () => {
      const user = userEvent.setup()
      const onSelect = vi.fn()
      render(<ProductList products={products} onSelect={onSelect} />)

      await user.click(screen.getAllByRole('button', { name: 'Ver produto' })[1])

      expect(onSelect).toHaveBeenCalledTimes(1)
      expect(onSelect).toHaveBeenCalledWith(products[1])
    })
  })

  describe('Estrutura', () => {
    it('deve possuir a classe product-grid', () => {
      render(<ProductList products={products} onSelect={vi.fn()} />)
      expect(screen.getByRole('region', { name: 'Lista de produtos' })).toHaveClass('product-grid')
    })
  })
})
