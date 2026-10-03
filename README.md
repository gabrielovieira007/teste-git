# React + Vitest — Projeto para aula de testes unitários

Projeto didático para uma aula de aproximadamente **8 horas** sobre testes em aplicações React.

## Objetivos

Ao final da aula, o aluno deverá conseguir:

- compreender o que é um teste unitário;
- entender por que testes automatizados são importantes;
- utilizar `describe`, `it` e `expect`;
- testar funções JavaScript;
- testar componentes React;
- testar props e renderização condicional;
- testar formulários;
- simular interações do usuário;
- utilizar mocks e spies;
- testar código assíncrono;
- testar serviços que usam `fetch`;
- testar estados de loading e erro;
- executar relatório de coverage.

## Tecnologias

- React
- Vite
- Vitest
- React Testing Library
- Testing Library User Event
- jsdom
- Coverage V8

## Instalação

```bash
npm install
```

## Executar aplicação

```bash
npm run dev
```

## Executar testes em watch mode

```bash
npm test
```

## Executar testes uma única vez

```bash
npm run test:run
```

## Coverage

```bash
npm run coverage
```

O relatório HTML será gerado na pasta `coverage`.

---

# Roteiro sugerido — 8 horas

## Bloco 1 — Fundamentos — 1h

### O que são testes?

Apresente a diferença conceitual entre:

- testes unitários;
- testes de integração;
- testes end-to-end.

Uma unidade pode ser uma função ou um componente.

### Por que utilizar testes?

Discuta:

- prevenção de regressões;
- confiança para refatorar;
- documentação do comportamento esperado;
- feedback rápido durante desenvolvimento;
- manutenção do projeto.

### Estrutura básica

```js
describe('somar', () => {
  it('deve somar dois números', () => {
    expect(somar(2, 3)).toBe(5)
  })
})
```

Introduza também:

**Arrange → Act → Assert**

---

## Bloco 2 — Vitest — 1h

Apresente:

```js
describe()
it()
test()
expect()
```

Matchers iniciais:

```js
toBe()
toEqual()
toBeTruthy()
toBeFalsy()
toContain()
toHaveLength()
toThrow()
```

Arquivos indicados:

- `src/utils/formatCurrency.js`
- `src/utils/formatCurrency.test.js`

---

## Bloco 3 — Funções JavaScript — 1h

Arquivos:

- `src/utils/filterProducts.js`
- `src/utils/filterProducts.test.js`

Conceitos:

- entrada;
- saída;
- casos comuns;
- casos extremos;
- pesquisa parcial;
- strings vazias;
- organização por `describe`.

Exemplo:

```js
describe('filterProducts', () => {
  describe('quando existe pesquisa', () => {
    // testes
  })

  describe('quando não existe pesquisa', () => {
    // testes
  })
})
```

---

## Bloco 4 — Componentes React — 1h30

Comece por:

- `Header.test.jsx`
- `Loading.test.jsx`
- `ErrorMessage.test.jsx`

Depois:

- `ProductCard.test.jsx`
- `ProductList.test.jsx`

Apresente:

```js
render()
screen.getByRole()
screen.getByText()
screen.queryByText()
```

Discuta a preferência por consultas semânticas.

Exemplo:

```js
screen.getByRole('button', {
  name: 'Ver produto'
})
```

---

## Bloco 5 — Eventos e formulários — 1h

Arquivo:

`SearchForm.test.jsx`

Apresente:

```js
const user = userEvent.setup()

await user.type(input, 'Notebook')
await user.click(button)
```

Introduza mocks:

```js
const onSearch = vi.fn()
```

E assertions:

```js
expect(onSearch).toHaveBeenCalled()
expect(onSearch).toHaveBeenCalledTimes(1)
expect(onSearch).toHaveBeenCalledWith('Notebook')
```

---

## Bloco 6 — Requests e mocks — 1h

Arquivo:

`src/services/productService.test.js`

Conceitos:

- Promise;
- async/await;
- dependências externas;
- por que evitar chamar APIs reais;
- mock;
- spy.

Exemplo:

```js
vi.spyOn(globalThis, 'fetch').mockResolvedValue({
  ok: true,
  json: async () => ({
    products: []
  })
})
```

Teste também respostas de erro.

---

## Bloco 7 — Testando a aplicação — 45min

Arquivo:

`src/App.test.jsx`

Neste ponto são combinados vários conceitos:

- mock de módulo;
- carregamento;
- estados assíncronos;
- formulário;
- filtro;
- seleção;
- erro.

Exemplo:

```js
vi.mock('./services/productService', () => ({
  getProducts: vi.fn()
}))
```

---

## Bloco 8 — Coverage e exercício final — 45min

Execute:

```bash
npm run coverage
```

Explique:

- Statements
- Branches
- Functions
- Lines

Evite ensinar que o objetivo é simplesmente obter 100%.

A pergunta mais importante é:

> Os comportamentos importantes da aplicação estão protegidos por testes?

---

# Exercícios para os alunos

## Exercício 1

Crie uma função:

```js
calculateDiscount(price, percentage)
```

Escreva testes para:

- desconto comum;
- desconto de 0%;
- desconto de 100%.

## Exercício 2

Crie um componente:

```jsx
<ProductPrice />
```

O componente deve receber um preço e exibi-lo formatado.

Crie os testes correspondentes.

## Exercício 3

Altere `ProductCard` para exibir:

```text
Produto indisponível
```

quando uma propriedade `available` for `false`.

Crie dois `describe`:

```js
describe('quando disponível')
describe('quando indisponível')
```

## Exercício 4

Adicione um botão "Favoritar".

Teste se a callback recebida por props foi chamada corretamente.

## Exercício 5

Adicione tratamento para lista vazia retornada pela API.

Teste o novo comportamento.

## Exercício final

Implemente uma categoria nos produtos e adicione um filtro por categoria.

Os alunos deverão criar testes para:

1. renderização do filtro;
2. seleção;
3. filtragem;
4. categoria sem produtos;
5. combinação de categoria + pesquisa.

---

# Estratégia didática

Uma possibilidade interessante é não apresentar todos os arquivos de teste completos imediatamente.

Por exemplo, apresente primeiro:

```js
describe('ProductCard', () => {
})
```

e construa os casos junto com os alunos.

Depois compare a implementação criada em sala com os testes completos presentes neste projeto.

Isso permite utilizar o mesmo projeto tanto como **material de aula** quanto como **gabarito**.
