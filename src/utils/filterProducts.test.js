import { describe, expect, it } from 'vitest'
import { filterProducts } from './filterProducts'
// importar o mock da lista de produtos
import { productsMock } from '../tests/mocks/products'

describe('filterProducts', () => {
    describe('Quando houver termo de busca', () => {
        it('deve retornar somente os produtos correspondentes', () => {
            // chamando a função com a lista "mockada" e o termo de busca
            const result = filterProducts(productsMock, 'Notebook')
            const result2 = filterProducts(productsMock, 'notebook')
            // esperando que o resultado tenha 1 produto
            expect(result).toHaveLength(1)
            // esperando que esse produto filtrado seja o Notebook (pelo titulo)
            expect(result[0].title).toBe('Notebook')
            expect(result2[0].title).toBe('Notebook')
        })

        it('deve aceitar pesquisa parcial', () => {
            const result = filterProducts(productsMock, 'mous')
            expect(result).toHaveLength(1)
            expect(result[0].title).toBe('Mouse Gamer')
        })
    })

    describe('Quando NÃO houver termo de busca', () => {
        it('Deve retornar a lista original', () => {
            // deve retornar a lista original, sem filtros
            // ou seja, ser igual (toEqual) a lista "mockada"
            expect(filterProducts(productsMock, '')).toEqual(productsMock)
        })

        it('deve desconsiderar espaços em branco', () => {
            // espaços em branco
            expect(filterProducts(productsMock, '   ')).toEqual(productsMock)
        })
    })
})