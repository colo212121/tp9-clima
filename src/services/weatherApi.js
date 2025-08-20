const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

function buildUrl(path, params) {
  const url = new URL(`https://api.openweathermap.org/data/2.5/${path}`)
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value))
  url.searchParams.set('appid', API_KEY || '')
  return url.toString()
}

export async function fetchCurrentWeather(query, units = 'metric') {
  const url = buildUrl('weather', { q: query, units })
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Ciudad no encontrada')
  }
  return res.json()
}

export async function fetchForecast(query, units = 'metric') {
  const url = buildUrl('forecast', { q: query, units })
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('No se pudo obtener el pronóstico')
  }
  return res.json()
}


