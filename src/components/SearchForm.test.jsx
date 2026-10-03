import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchForm from './SearchForm'

describe('SearchForm', () => {
  describe('Renderização', () => {
    it('deve renderizar campo, label e botões', () => {
      render(<SearchForm onSearch={vi.fn()} />)

      expect(screen.getByLabelText('Pesquisar produto')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Pesquisar' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Limpar' })).toBeInTheDocument()
    })

    it('deve iniciar com o campo vazio', () => {
      render(<SearchForm onSearch={vi.fn()} />)
      expect(screen.getByRole('textbox', { name: 'Pesquisar produto' })).toHaveValue('')
    })

    it('deve possuir o placeholder esperado', () => {
      render(<SearchForm onSearch={vi.fn()} />)
      expect(screen.getByPlaceholderText('Ex.: phone')).toBeInTheDocument()
    })
  })

  describe('Digitação', () => {
    it('deve atualizar o valor do campo ao digitar', async () => {
      const user = userEvent.setup()
      render(<SearchForm onSearch={vi.fn()} />)
      const input = screen.getByRole('textbox', { name: 'Pesquisar produto' })

      await user.type(input, 'phone')

      expect(input).toHaveValue('phone')
    })
  })

  describe('Pesquisa', () => {
    it('deve chamar onSearch com o texto informado ao enviar o formulário', async () => {
      const user = userEvent.setup()
      const onSearch = vi.fn()
      render(<SearchForm onSearch={onSearch} />)

      await user.type(screen.getByRole('textbox', { name: 'Pesquisar produto' }), 'notebook')
      await user.click(screen.getByRole('button', { name: 'Pesquisar' }))

      expect(onSearch).toHaveBeenCalledTimes(1)
      expect(onSearch).toHaveBeenCalledWith('notebook')
    })

    it('deve permitir pesquisar uma string vazia', async () => {
      const user = userEvent.setup()
      const onSearch = vi.fn()
      render(<SearchForm onSearch={onSearch} />)

      await user.click(screen.getByRole('button', { name: 'Pesquisar' }))

      expect(onSearch).toHaveBeenCalledWith('')
    })

    it('deve enviar o formulário ao pressionar Enter no campo', async () => {
      const user = userEvent.setup()
      const onSearch = vi.fn()
      render(<SearchForm onSearch={onSearch} />)

      const input = screen.getByRole('textbox', { name: 'Pesquisar produto' })
      await user.type(input, 'tablet{enter}')

      expect(onSearch).toHaveBeenCalledTimes(1)
      expect(onSearch).toHaveBeenCalledWith('tablet')
    })
  })

  describe('Limpeza', () => {
    it('deve limpar o campo ao clicar em Limpar', async () => {
      const user = userEvent.setup()
      render(<SearchForm onSearch={vi.fn()} />)
      const input = screen.getByRole('textbox', { name: 'Pesquisar produto' })

      await user.type(input, 'phone')
      await user.click(screen.getByRole('button', { name: 'Limpar' }))

      expect(input).toHaveValue('')
    })

    it('deve chamar onSearch com string vazia ao limpar', async () => {
      const user = userEvent.setup()
      const onSearch = vi.fn()
      render(<SearchForm onSearch={onSearch} />)

      await user.type(screen.getByRole('textbox', { name: 'Pesquisar produto' }), 'phone')
      await user.click(screen.getByRole('button', { name: 'Limpar' }))

      expect(onSearch).toHaveBeenCalledTimes(1)
      expect(onSearch).toHaveBeenCalledWith('')
    })
  })

  describe('Estrutura', () => {
    it('deve configurar corretamente os tipos dos botões', () => {
      render(<SearchForm onSearch={vi.fn()} />)
      expect(screen.getByRole('button', { name: 'Pesquisar' })).toHaveAttribute('type', 'submit')
      expect(screen.getByRole('button', { name: 'Limpar' })).toHaveAttribute('type', 'button')
    })

    it('deve aplicar a classe secondary ao botão Limpar', () => {
      render(<SearchForm onSearch={vi.fn()} />)
      expect(screen.getByRole('button', { name: 'Limpar' })).toHaveClass('secondary')
    })
  })
})
