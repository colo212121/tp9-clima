import { createContext, useContext, useMemo, useState } from 'react'
import { fetchCurrentWeather, fetchForecast } from '../services/weatherApi'
import { useUI } from './UIContext'

const WeatherContext = createContext(null)

export function WeatherProvider({ children }) {
  const { units } = useUI()
  const [state, setState] = useState({
    city: '',
    current: null,
    forecast: null,
    loading: false,
    error: '',
    dataUnits: 'metric',
  })

  async function searchCity(city) {
    if (!city) return
    setState((prev) => ({ ...prev, loading: true, error: '' }))
    try {
      const [current, forecast] = await Promise.all([
        fetchCurrentWeather(city, units),
        fetchForecast(city, units),
      ])
      setState({ city, current, forecast, loading: false, error: '', dataUnits: units })
      localStorage.setItem('lastCity', city)
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false, error: error.message || 'Error al obtener el clima' }))
    }
  }

  async function loadLastCity() {
    const last = localStorage.getItem('lastCity')
    if (last) {
      await searchCity(last)
    }
  }

  const value = useMemo(
    () => ({ ...state, searchCity, loadLastCity }),
    [state]
  )

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
}

export function useWeather() {
  const ctx = useContext(WeatherContext)
  if (!ctx) throw new Error('useWeather must be used within WeatherProvider')
  return ctx
}


