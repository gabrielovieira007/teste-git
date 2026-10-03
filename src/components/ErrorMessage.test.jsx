import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import ErrorMessage from './ErrorMessage'

describe('ErrorMessage', () => {

  describe('Renderização', () => {

    it('deve renderizar o componente', () => {
      render(<ErrorMessage message="Ocorreu um erro" />)

      const element = screen.getByRole('alert')

      expect(element).toBeInTheDocument()
    })

    it('deve renderizar a mensagem recebida', () => {
      render(<ErrorMessage message="Campo obrigatório" />)

      expect(screen.getByText('Campo obrigatório')).toBeInTheDocument()
    })

    it('deve renderizar mensagens diferentes', () => {
      render(<ErrorMessage message="E-mail inválido" />)

      expect(screen.getByText('E-mail inválido')).toBeInTheDocument()
    })

  })

  describe('Estrutura HTML', () => {

    it('deve renderizar a mensagem dentro de um parágrafo', () => {
      render(<ErrorMessage message="Erro" />)

      const element = screen.getByRole('alert')

      expect(element.tagName).toBe('P')
    })

    it('deve possuir a classe message', () => {
      render(<ErrorMessage message="Erro" />)

      expect(screen.getByRole('alert')).toHaveClass('message')
    })

    it('deve possuir a classe error', () => {
      render(<ErrorMessage message="Erro" />)

      expect(screen.getByRole('alert')).toHaveClass('error')
    })

    it('deve possuir as classes message e error', () => {
      render(<ErrorMessage message="Erro" />)

      expect(screen.getByRole('alert')).toHaveClass(
        'message',
        'error'
      )
    })

  })

  describe('Acessibilidade', () => {

    it('deve possuir role alert', () => {
      render(<ErrorMessage message="Erro importante" />)

      const alert = screen.getByRole('alert')

      expect(alert).toBeInTheDocument()
    })

    it('deve disponibilizar a mensagem através do alert', () => {
      render(<ErrorMessage message="Falha ao salvar" />)

      const alert = screen.getByRole('alert')

      expect(alert).toHaveTextContent('Falha ao salvar')
    })

  })

  describe('Casos especiais', () => {

    it('deve permitir mensagem vazia', () => {
      render(<ErrorMessage message="" />)

      const alert = screen.getByRole('alert')

      expect(alert).toBeEmptyDOMElement()
    })

    it('deve renderizar mesmo sem a propriedade message', () => {
      render(<ErrorMessage />)

      const alert = screen.getByRole('alert')

      expect(alert).toBeInTheDocument()
      expect(alert).toBeEmptyDOMElement()
    })

    it('deve renderizar caracteres especiais', () => {
      render(
        <ErrorMessage message="Erro: campo inválido! @#$%" />
      )

      expect(
        screen.getByText('Erro: campo inválido! @#$%')
      ).toBeInTheDocument()
    })

    it('deve renderizar valores numéricos', () => {
      render(<ErrorMessage message={404} />)

      expect(screen.getByText('404')).toBeInTheDocument()
    })

  })

})