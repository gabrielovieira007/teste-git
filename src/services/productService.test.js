import { afterEach, describe, expect, it, vi } from 'vitest'
import { getProducts } from './productService'

describe('productService', () => {

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getProducts', () => {

    it('deve buscar os produtos na API', async () => {
      const products = [
        {
          id: 1,
          title: 'Produto 1',
          price: 100
        }
      ]

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({
          products
        })
      })

      await getProducts()

      expect(fetch).toHaveBeenCalledTimes(1)

      expect(fetch).toHaveBeenCalledWith(
        'https://dummyjson.com/products'
      )
    })

    it('deve retornar a lista de produtos', async () => {
      const products = [
        {
          id: 1,
          title: 'Produto 1',
          price: 100
        },
        {
          id: 2,
          title: 'Produto 2',
          price: 200
        }
      ]

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({
          products
        })
      })

      const result = await getProducts()

      expect(result).toEqual(products)
    })

    it('deve retornar uma lista vazia quando a API retornar products vazio', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({
          products: []
        })
      })

      const result = await getProducts()

      expect(result).toEqual([])
    })

    it('deve chamar o método json da resposta', async () => {
      const jsonMock = vi.fn().mockResolvedValue({
        products: []
      })

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: jsonMock
      })

      await getProducts()

      expect(jsonMock).toHaveBeenCalledTimes(1)
    })

    it('deve lançar erro quando a resposta da API não for bem-sucedida', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false
      })

      await expect(
        getProducts()
      ).rejects.toThrow('Erro ao carregar produtos')
    })

    it('não deve chamar response.json quando a resposta possuir erro', async () => {
      const jsonMock = vi.fn()

      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        json: jsonMock
      })

      await expect(
        getProducts()
      ).rejects.toThrow('Erro ao carregar produtos')

      expect(jsonMock).not.toHaveBeenCalled()
    })

    it('deve propagar erro quando o fetch falhar', async () => {
      global.fetch = vi.fn().mockRejectedValue(
        new Error('Erro de conexão')
      )

      await expect(
        getProducts()
      ).rejects.toThrow('Erro de conexão')
    })

    it('deve propagar erro quando a conversão para JSON falhar', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockRejectedValue(
          new Error('JSON inválido')
        )
      })

      await expect(
        getProducts()
      ).rejects.toThrow('JSON inválido')
    })

  })

})