import './App.css'
import Layout from './components/Layout/Layout'
import Toggle from './components/Toggle/Toggle'
import SearchBar from './components/SearchBar/SearchBar'
import CurrentWeather from './components/CurrentWeather/CurrentWeather'
import Forecast from './components/Forecast/Forecast'
import { useEffect } from 'react'
import { useWeather } from './context/WeatherContext'

function App() {
  const { loadLastCity } = useWeather()
  useEffect(() => {
    loadLastCity()
  }, [])

  return (
    <Layout headerRight={<Toggle />}>
      <SearchBar />
      <CurrentWeather />
      <Forecast />
    </Layout>
  )
}

export default App
