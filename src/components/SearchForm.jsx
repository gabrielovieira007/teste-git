import { useState } from 'react'

export default function SearchForm({ onSearch }) {
  const [search, setSearch] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onSearch(search)
  }

  function handleClear() {
    setSearch('')
    onSearch('')
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label htmlFor="search">Pesquisar produto</label>

      <div className="search-row">
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Ex.: phone"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <button type="submit">Pesquisar</button>

        <button type="button" className="secondary" onClick={handleClear}>
          Limpar
        </button>
      </div>
    </form>
  )
}
