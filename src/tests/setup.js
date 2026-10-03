// importando as bibliotecas de teste:
// testes em tempo real
import '@testing-library/jest-dom/vitest'
// biblioteca principal de testes, executando a cada teste
import { afterEach } from 'vitest'
// limpeza de cada teste após a execução
import { cleanup } from '@testing-library/react'

// limpeza de cada teste após cada execução
afterEach(() => {
  cleanup()
})
