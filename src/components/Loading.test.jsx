import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Loading from './Loading'

describe('Loading', () => {
  describe('Renderização', () => {
    it('deve renderizar a mensagem de carregamento', () => {
      render(<Loading />)
      expect(screen.getByText('Carregando produtos...')).toBeInTheDocument()
    })
  })

  describe('Acessibilidade', () => {
    it('deve possuir role status', () => {
      render(<Loading />)
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('deve disponibilizar a mensagem através do status', () => {
      render(<Loading />)
      expect(screen.getByRole('status')).toHaveTextContent('Carregando produtos...')
    })
  })

  describe('Estrutura', () => {
    it('deve ser um parágrafo com a classe message', () => {
      render(<Loading />)
      const status = screen.getByRole('status')
      expect(status.tagName).toBe('P')
      expect(status).toHaveClass('message')
    })
  })
})
