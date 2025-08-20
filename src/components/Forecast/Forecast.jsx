import './Forecast.css'
import { useWeather } from '../../context/WeatherContext'
import { useUI } from '../../context/UIContext'
import { convertTemperature } from '../../utils/units'

export default function Forecast() {
  const { forecast, dataUnits } = useWeather()
  const { units } = useUI()
  if (!forecast) return null

  const tempUnit = units === 'metric' ? '°C' : '°F'

  const daily = groupByDay(forecast.list).slice(0, 5).map((d) => ({
    ...d,
    avgTemp: convertTemperature(d.avgTemp, dataUnits || units, units)
  }))

  return (
    <section className="forecast">
      {daily.map((day) => (
        <div key={day.date} className="forecast__item">
          <div className="forecast__date">{formatDay(day.date)}</div>
          <div className="forecast__temp">{Math.round(day.avgTemp)}{tempUnit}</div>
          <div className="forecast__desc">{day.desc}</div>
        </div>
      ))}
    </section>
  )
}

function groupByDay(list) {
  const map = new Map()
  list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0]
    const val = map.get(date) || { temps: [], descs: [] }
    val.temps.push(item.main.temp)
    val.descs.push(item.weather?.[0]?.description || '')
    map.set(date, val)
  })
  return Array.from(map.entries()).map(([date, { temps, descs }]) => ({
    date,
    avgTemp: temps.reduce((a, b) => a + b, 0) / temps.length,
    desc: mode(descs),
  }))
}

function mode(arr) {
  const counts = {}
  arr.forEach((x) => (counts[x] = (counts[x] || 0) + 1))
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
}

function formatDay(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString(undefined, { weekday: 'short', day: '2-digit', month: 'short' })
}


