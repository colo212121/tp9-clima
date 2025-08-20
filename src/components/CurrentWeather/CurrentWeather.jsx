import './CurrentWeather.css'
import { useWeather } from '../../context/WeatherContext'
import { useUI } from '../../context/UIContext'
import { convertTemperature, convertSpeed } from '../../utils/units'

export default function CurrentWeather() {
  const { current, city, error, dataUnits } = useWeather()
  const { units } = useUI()

  if (error) return <div className="alert">{error}</div>
  if (!current) return <div className="placeholder">Busca una ciudad para ver el clima</div>

  const tempUnit = units === 'metric' ? '°C' : '°F'
  const displayTemp = Math.round(convertTemperature(current.main.temp, dataUnits || units, units))
  const displayWind = Math.round(convertSpeed(current.wind.speed, dataUnits || units, units))

  return (
    <section className="current">
      <div className="current__main">
        <span className="current__badge">hoy</span>
        <div className="current__temp">{displayTemp}{tempUnit}</div>
        <div className="current__city">{city} • {current.weather?.[0]?.description}</div>
      </div>
      <div className="current__meta">
        <span>Humedad: {current.main.humidity}%</span>
        <span>Viento: {displayWind} {units === 'metric' ? 'm/s' : 'mph'}</span>
      </div>
    </section>
  )
}


