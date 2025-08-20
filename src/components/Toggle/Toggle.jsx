import './Toggle.css'
import { useUI } from '../../context/UIContext'

export default function Toggle() {
  const { theme, toggleTheme, units, toggleUnits } = useUI()
  return (
    <div className="toggle">
      <button className="toggle__btn" onClick={toggleTheme}>
        {theme === 'dark' ? 'Oscuro' : 'Claro'}
      </button>
      <button className="toggle__btn" onClick={toggleUnits}>
        {units === 'metric' ? '°C' : '°F'}
      </button>
    </div>
  )
}


