import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UIProvider } from './context/UIContext'
import { WeatherProvider } from './context/WeatherContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UIProvider>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </UIProvider>
  </StrictMode>,
)
