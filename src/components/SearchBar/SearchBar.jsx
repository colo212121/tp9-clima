import { useState } from 'react'
import './SearchBar.css'
import { useWeather } from '../../context/WeatherContext'

export default function SearchBar() {
  const { searchCity, loading } = useWeather()
  const [query, setQuery] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    if (!query.trim()) return
    searchCity(query.trim())
  }

  return (
    <form className="search" onSubmit={onSubmit}>
      <input
        className="search__input"
        placeholder="Buscar ciudad..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search__btn" disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
    </form>
  )
}


