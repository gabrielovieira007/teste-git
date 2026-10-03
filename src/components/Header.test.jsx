import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  describe('Renderização', () => {
    it('deve renderizar o título principal', () => {
      render(<Header />)
      expect(screen.getByRole('heading', { level: 1, name: 'Catálogo de Produtos' })).toBeInTheDocument()
    })

    it('deve renderizar a descrição do projeto', () => {
      render(<Header />)
      expect(screen.getByText('Projeto didático para testes unitários com React e Vitest')).toBeInTheDocument()
    })
  })

  describe('Estrutura', () => {
    it('deve renderizar o título dentro do header', () => {
      const { container } = render(<Header />)
      const header = container.querySelector('header')
      expect(header).toHaveClass('header')
      expect(header).toContainElement(screen.getByRole('heading', { level: 1 }))
    })

    it('deve possuir um container interno', () => {
      const { container } = render(<Header />)
      expect(container.querySelector('.container')).toBeInTheDocument()
    })
  })
})
