import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'
import * as productService from './services/productService'
import { productsMock } from './tests/mocks/products'

vi.mock('./services/productService', () => ({
  getProducts: vi.fn()
}))

describe('App', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Layout', () => {

    it('Deve renderizar o cabeçalho e o form de pesquisa', async () => {
      productService.getProducts.mockResolvedValue(productsMock)

      render(<App />)

      expect(
        screen.getByRole('heading', {
          name: 'Catálogo de Produtos'
        })
      ).toBeInTheDocument()

      expect(
        screen.getByRole('textbox', {
          name: /pesquisar produto/i
        })
      ).toBeInTheDocument()
    })

  })

  describe('Carregamento', () => {

    it('Deve exibir mensagem enquanto os produtos estão carregando', () => {
      productService.getProducts.mockReturnValue(
        new Promise(() => {})
      )

      render(<App />)

      expect(
        screen.getByRole('status')
      ).toHaveTextContent('Carregando produtos...')
    })

    it('Deve remover o loading após carregar os produtos', async () => {
      productService.getProducts.mockResolvedValue(productsMock)

      render(<App />)

      expect(
        screen.getByRole('status')
      ).toBeInTheDocument()

      await waitFor(() => {
        expect(
          screen.queryByRole('status')
        ).not.toBeInTheDocument()
      })
    })

  })

  describe('Produtos', () => {

    it('Deve chamar o serviço de produtos', async () => {
      productService.getProducts.mockResolvedValue(productsMock)

      render(<App />)

      await waitFor(() => {
        expect(
          productService.getProducts
        ).toHaveBeenCalledTimes(1)
      })
    })

    it('Deve exibir os produtos retornados pelo serviço', async () => {
      productService.getProducts.mockResolvedValue(productsMock)

      render(<App />)

      expect(
        await screen.findByText(productsMock[0].title)
      ).toBeInTheDocument()
    })

    it('Deve exibir mensagem quando não existirem produtos', async () => {
      productService.getProducts.mockResolvedValue([])

      render(<App />)

      expect(
        await screen.findByText('Nenhum produto encontrado.')
      ).toBeInTheDocument()
    })

  })

  describe('Erro', () => {

    it('Deve exibir mensagem quando ocorrer erro ao carregar produtos', async () => {
      productService.getProducts.mockRejectedValue(
        new Error('Erro na API')
      )

      render(<App />)

      expect(
        await screen.findByRole('alert')
      ).toHaveTextContent(
        'Não foi possível carregar os produtos.'
      )
    })

    it('Não deve exibir a lista de produtos quando ocorrer erro', async () => {
      productService.getProducts.mockRejectedValue(
        new Error('Erro na API')
      )

      render(<App />)

      await screen.findByRole('alert')

      expect(
        screen.queryByRole('region', {
          name: /lista de produtos/i
        })
      ).not.toBeInTheDocument()
    })

  })

  describe('Pesquisa', () => {

    it('Deve pesquisar produtos', async () => {
      const user = userEvent.setup()

      productService.getProducts.mockResolvedValue(productsMock)

      render(<App />)

      await screen.findByText(productsMock[0].title)

      const input = screen.getByRole('textbox', {
        name: /pesquisar produto/i
      })

      await user.type(input, productsMock[0].title)

      await user.click(
        screen.getByRole('button', {
          name: /pesquisar/i
        })
      )

      expect(
        screen.getByText(productsMock[0].title)
      ).toBeInTheDocument()
    })

    it('Deve exibir mensagem quando pesquisa não encontrar produtos', async () => {
      const user = userEvent.setup()

      productService.getProducts.mockResolvedValue(productsMock)

      render(<App />)

      await screen.findByText(productsMock[0].title)

      const input = screen.getByRole('textbox', {
        name: /pesquisar produto/i
      })

      await user.type(
        input,
        'produto que certamente nao existe'
      )

      await user.click(
        screen.getByRole('button', {
          name: /pesquisar/i
        })
      )

      expect(
        screen.getByText('Nenhum produto encontrado.')
      ).toBeInTheDocument()
    })

    it('Deve limpar a pesquisa e voltar a exibir os produtos', async () => {
      const user = userEvent.setup()

      productService.getProducts.mockResolvedValue(productsMock)

      render(<App />)

      await screen.findByText(productsMock[0].title)

      const input = screen.getByRole('textbox', {
        name: /pesquisar produto/i
      })

      await user.type(
        input,
        'produto que certamente nao existe'
      )

      await user.click(
        screen.getByRole('button', {
          name: /pesquisar/i
        })
      )

      expect(
        screen.getByText('Nenhum produto encontrado.')
      ).toBeInTheDocument()

      await user.click(
        screen.getByRole('button', {
          name: /limpar/i
        })
      )

      expect(input).toHaveValue('')

      expect(
        screen.getByText(productsMock[0].title)
      ).toBeInTheDocument()
    })

  })

  describe('Seleção de produto', () => {

    it('Deve exibir o produto selecionado', async () => {
      const user = userEvent.setup()

      productService.getProducts.mockResolvedValue(productsMock)

      render(<App />)

      await screen.findByText(productsMock[0].title)

      const buttons = screen.getAllByRole('button', {
        name: /ver produto/i
      })

      await user.click(buttons[0])

      const selectedProduct = screen.getByRole(
        'complementary',
        {
          name: /produto selecionado/i
        }
      )

      expect(selectedProduct).toBeInTheDocument()

      expect(selectedProduct).toHaveTextContent(
        `Produto selecionado: ${productsMock[0].title}`
      )
    })

  })

})