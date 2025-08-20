import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const UIContext = createContext(null)

export function UIProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [units, setUnits] = useState(() => localStorage.getItem('units') || 'metric')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('units', units)
  }, [units])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  const toggleUnits = () => setUnits((prev) => (prev === 'metric' ? 'imperial' : 'metric'))

  const value = useMemo(() => ({ theme, units, toggleTheme, toggleUnits }), [theme, units])

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used within UIProvider')
  return ctx
}


